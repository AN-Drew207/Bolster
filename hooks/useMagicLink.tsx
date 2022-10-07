import React, { useState } from 'react';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import Web3 from 'web3';
import BottleCollectionABI from '../contracts/BottleCollection.json';
import ERC20ABI from '../contracts/ERC20.json';
import BottleExchangeABI from '../contracts/BottleExchange.json';
import bottlesTestnet from 'bottles_mumbai.json';
import bottlesMainnet from 'bottles_polygon.json';
import { updateBalance, updateState, updateTokensOfUser } from 'redux/actions';
import toast from 'react-hot-toast';
import { multiply } from 'components/common/multiply';
import { updateDataExchanged } from 'components/common/Layouts';

const bottles =
	process.env.NEXT_PUBLIC_NETWORK_NAME == 'mumbai'
		? bottlesTestnet
		: bottlesMainnet;

export default function useMagicLink() {
	const [account, setAccount] = useState<any>(null);
	const [loading, setLoading] = useState<any>(null);
	const [web3, setWeb3] = useState<any>(null);
	const [magic, setMagic] = useState<any>(null);

	if (
		typeof window !== 'undefined' &&
		magic == null &&
		process.env.NEXT_PUBLIC_MAGIC_KEY
	) {
		// Client-side-only code
		const key = process.env.NEXT_PUBLIC_MAGIC_KEY
			? process.env.NEXT_PUBLIC_MAGIC_KEY
			: '';
		const chainId = process.env.NEXT_PUBLIC_POLYGON_ID
			? process.env.NEXT_PUBLIC_POLYGON_ID
			: '';
		const rpcUrl = process.env.NEXT_PUBLIC_SECONDARY_RPC
			? process.env.NEXT_PUBLIC_SECONDARY_RPC
			: '';
		console.log(chainId, rpcUrl);
		const magic = new Magic(key, {
			network: {
				rpcUrl: rpcUrl,
				chainId: parseInt(chainId),
			},
			locale: 'en_US',
			extensions: [new ConnectExtension()],
		});
		setMagic(magic);
		setWeb3(new Web3(magic.rpcProvider));
	}

	const sendTransaction = async () => {
		const publicAddress = (await web3.eth.getAccounts())[0];
		const txnParams = {
			from: publicAddress,
			to: publicAddress,
			value: web3.utils.toWei('0.01', 'ether'),
			gasPrice: web3.utils.toWei('30', 'gwei'),
		};
		web3.eth
			.sendTransaction(txnParams as any)
			.on('transactionHash', (hash: any) => {
				console.log('the txn hash that was returned to the sdk:', hash);
			})
			.then((receipt: any) => {
				console.log('the txn receipt that was returned to the sdk:', receipt);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const transfer = async (
		setBottle: any,
		bottleContract: string,
		id: number,
		address: string,
		setExchanged: any,
		hide: any
	) => {
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);

			const gas = await BottleCollectionContract.methods
				.transferFrom(publicAddress, address, id)
				.estimateGas({
					from: publicAddress,
				});
			const gasPrice = await web3.eth.getGasPrice();
			const priceGas = Math.floor(parseInt(gasPrice) / 20000000);

			await BottleCollectionContract.methods
				.transferFrom(publicAddress, address, id)
				.send({
					from: publicAddress,
					gas: gas * priceGas,
				});
			// getNFTsOneBottleMagic(bottleContract, setBottle, setExchanged);
			bottles.map(async (item) => {
				console.log(item, (bottleContract as string).toLowerCase(), 'compare');
				if (
					item.address.toLowerCase() == (bottleContract as string).toLowerCase()
				) {
					let bottle = new web3.eth.Contract(BottleCollectionABI, item.address);
					const tokensOfUser = await bottle.methods
						.getOwnerTokens(publicAddress)
						.call();

					const supply = await bottle.methods.supply().call();
					const arraySupply = new Array(parseInt(supply))
						.fill(false)
						.map((xd, index) => index);
					const tokensMetadata = arraySupply.map((token: any) => {
						return item.metadata[token];
					});
					setBottle({
						...item,
						tokensOfUser: tokensOfUser,
						NFTs: tokensMetadata.map((t: any, index: any) => {
							return { ...(t as Object), id: (index + 1).toString() };
						}),
					});
					setExchanged(false);
				}
			});

			toast.success('Your NFT has been successfully transferred');
		} catch (error) {
			console.log(error, 'q weba');
		}
		hide();
		setLoading(false);
	};

	const mint = async (
		bottleContract: any,
		quantity: number,
		address: string,
		dispatch: any,
		setMessage: any,
		hideBuy: any,
		show: any,
		setQuantity: any,
		setMaxSupply: any
	) => {
		setLoading(true);

		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			if (address == process.env.NEXT_PUBLIC_WMATIC_ADDRESS) {
				const price = await BottleCollectionContract.methods
					.getPrice(quantity)
					.call();

				await BottleCollectionContract.methods
					.safeMint(quantity, address)
					.send({
						from: publicAddress,
						value: price,
						gas: 8000000,
					});
			} else {
				await BottleCollectionContract.methods
					.safeMint(quantity, address)
					.send({
						from: publicAddress,
						gas: 8000000,
					});
			}
			hideBuy();
			setMessage('');
			show();
			const currentSupply = await BottleCollectionContract.methods
				.supply()
				.call();
			const maxSupply = await BottleCollectionContract.methods
				.maxSupply()
				.call();
			setQuantity(currentSupply);
			setMaxSupply(maxSupply);
			updateDataExchanged(
				dispatch,
				process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
					? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
					: ''
			);
			toast.success('Your NFT has been successfully minted');
		} catch (error) {
			console.log(error);
			toast.error(
				'An error occurred while minting, please reload and again later.'
			);
			hideBuy();
		}
		setLoading(false);
	};

	const approveBottle = async (
		dispatch: any,
		bottleContract: any,
		address: string
	) => {
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const Erc20Instance = new (web3 as any).eth.Contract(ERC20ABI, address);
			await Erc20Instance.methods
				.increaseAllowance(
					bottleContract,
					'1000000000000000000000000000000000000000000000000'
				)
				.send({
					from: publicAddress,
					gas: 1000000,
				});
			const bottle = new web3.eth.Contract(BottleCollectionABI, bottleContract);
			const balance = await bottle.methods.balanceOf(publicAddress).call();

			const balanceUSDC = await bottle.methods
				.balanceUserOfferTokens(publicAddress)
				.call();
			let index;
			for (let i = 0; i < bottles.length; i++) {
				if (bottles[i].address == bottleContract) {
					index = i;
				}
			}
			toast.success('You have approved us to receive USDC, now you can mint', {
				duration: 6000,
			});
			dispatch(
				updateBalance({
					allowance: '1000000000000000000000000000000000000000000000000',
					balanceOfUser: balance,
					index: index,
					balanceUSDCInContract: parseInt(balanceUSDC) / 10 ** 6,
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	const login = async (dispatch: any) => {
		console.log('login');
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			const offersReceived = [];
			const offersDone = [];
			let bottle: any;
			const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS
				? process.env.NEXT_PUBLIC_USDC_ADDRESS
				: '';
			const usdc = new web3.eth.Contract(ERC20ABI, usdcAddress);
			for (let i = 0; i < bottles.length; i++) {
				bottle = new web3.eth.Contract(BottleCollectionABI, bottles[i].address);
				const balance = await bottle.methods.balanceOf(publicAddress).call();
				const offer = await bottle.methods.lastOffer().call();
				const approved = await usdc.methods
					.allowance(publicAddress, bottles[i].address)
					.call();
				const balanceUSDC = await bottle.methods
					.balanceUserOfferTokens(publicAddress)
					.call();
				const now = new Date().getTime();
				const expirationLastOffer = new Date(
					offer.expirationDate * 1000
				).getTime();
				dispatch(
					updateBalance({
						allowance: approved,
						balanceOfUser: balance,
						index: i,
						balanceUSDCInContract: parseInt(balanceUSDC) / 10 ** 6,
					})
				);
				if (
					balance > 0 &&
					offer.active &&
					offer.bidder.toLowerCase() != publicAddress.toLowerCase() &&
					expirationLastOffer >= now
				) {
					offersReceived.push({
						title: `You have an offer for your tokens of ${bottles[i].name} Collection`,
						offer: offer,
						address: bottles[i].address,
						externalLink: `/bottle/${bottles[i].address}?offer=true`,
						icon: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="#fff"
							>
								<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
							</svg>
						),
					});
				} else if (
					balance > 0 &&
					offer.active &&
					offer.bidder.toLowerCase() == publicAddress.toLowerCase() &&
					expirationLastOffer >= now
				) {
					offersDone.push({
						title: `You have done an offer for all the tokens of ${bottles[i].name} Collection`,
						address: bottles[i].address,
						offer: offer,
						externalLink: `/bottle/${bottles[i].address}`,
						icon: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="#fff"
							>
								<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
							</svg>
						),
					});
				}
			}
			dispatch(
				updateState({
					address: publicAddress,
					typeOfWallet: 'magic',
					offersActiveReceived: offersReceived,
					offersActiveMade: offersDone,
				})
			);
		} catch (error) {
			console.log(error, 'aqui');
		}
		setLoading(false);
	};

	const loginBuy = async (updateData: any, showBuy: any) => {
		console.log('login');
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			updateData(publicAddress);
			showBuy();
			setLoading(false);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3 or accounts. Try to connect metamask again.`);
			console.error(error);
			setLoading(false);
		}

		setLoading(false);
	};

	const loginUpdateDataOffer = async (updateData: any, showOptions: any) => {
		console.log('login data offer');
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			// Use web3 to get the user's accounts.
			setAccount(publicAddress);
			updateData(publicAddress);
			showOptions();
			setLoading(false);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3 or accounts. Try to connect metamask again.`);
			console.error(error);
			setLoading(false);
			throw new Error(
				`Failed to load web3 or accounts. Try to connect metamask again.`
			);
		}

		setLoading(false);
	};

	const getNFTsOneBottleMagic = async (
		bottleContract: any,
		setBottle: any,
		setExchanged: any
	) => {
		setLoading(true);
		const accounts = await web3.eth.getAccounts();
		let bottle: any;
		const exchangeAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			: '';
		let exchange = new web3.eth.Contract(
			BottleExchangeABI as any,
			exchangeAddress
		);

		// console.log(tokensMetadata, 'metadata');
		bottles.map(async (item) => {
			console.log(item, (bottleContract as string).toLowerCase(), 'compare');
			if (
				item.address.toLowerCase() == (bottleContract as string).toLowerCase()
			) {
				const collection = await exchange.methods
					.collections(item.address)
					.call();
				console.log(collection, 'collection');
				if (collection.exchanged == false) {
					bottle = new web3.eth.Contract(BottleCollectionABI, item.address);
					const tokensOfUser = await bottle.methods
						.getOwnerTokens(accounts[0])
						.call();

					const supply = await bottle.methods.supply().call();
					const arraySupply = new Array(parseInt(supply))
						.fill(false)
						.map((xd, index) => index);
					const tokensMetadata = arraySupply.map((token: any) => {
						return item.metadata[token];
					});
					console.log(tokensMetadata, 'response');
					setBottle({
						...item,
						tokensOfUser: tokensOfUser,
						NFTs: tokensMetadata.map((t: any, index: any) => {
							return { ...(t as Object), id: (index + 1).toString() };
						}),
					});
					setExchanged(false);
				} else {
					console.log('true');
					const tokenExchangedURI = await exchange.methods
						.tokenURI(collection.collectionId)
						.call();
					const promiseMetadata = await Promise.resolve(
						await (await fetch(tokenExchangedURI)).json()
					);
					setBottle({
						...item,
						finalToken: promiseMetadata,
					});
					setExchanged(true);
				}
			}
		});
		setLoading(false);
	};

	const getNFTsMagic = async (
		dispatch: any,
		setIsLoading: any,
		setHaveNFTs: any,
		setExchangedBottles: any
	) => {
		setIsLoading(true);
		const accounts = await web3.eth.getAccounts();
		const exchangeAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			: '';
		let bottle: any;
		let exchange = new web3.eth.Contract(
			BottleExchangeABI as any,
			exchangeAddress
		);
		const bottlesExchanged = [];
		let counter = 0;

		for (let i = 0; i < bottles.length; i++) {
			let noHaveNFT = false;
			const collection = await exchange.methods
				.collections(bottles[i].address)
				.call();
			const tokenExchangedURI = await exchange.methods
				.tokenURI(collection.collectionId)
				.call();

			if (collection.exchanged == false) {
				bottle = new web3.eth.Contract(BottleCollectionABI, bottles[i].address);
				const tokensOfUser = await bottle.methods
					.getOwnerTokens(accounts[0])
					.call();

				const tokensMetadata = tokensOfUser.map((token: any) => {
					return bottles[i].metadata[parseInt(token) - 1];
				});
				if (tokensOfUser.length == 0) {
					noHaveNFT = true;
				}
				dispatch(
					updateTokensOfUser({ tokensOfUser: tokensMetadata, index: i })
				);
			} else {
				if (
					(
						await exchange.methods.ownerOf(collection.collectionId).call()
					).toLowerCase() == accounts[0].toLowerCase()
				) {
					const promiseMetadata = await Promise.resolve(
						await (await fetch(tokenExchangedURI)).json()
					);
					bottlesExchanged.push({
						...promiseMetadata,
						id: i,
						name: bottles[i].name,
						address: bottles[i].address,
					});
				} else {
					noHaveNFT = true;
				}
				dispatch(updateTokensOfUser({ tokensOfUser: [], index: i }));
			}
			if (noHaveNFT) {
				counter++;
			}
		}
		if (counter === bottles.length) {
			setHaveNFTs(false);
		} else {
			setHaveNFTs(true);
		}
		console.log(bottlesExchanged, 'exchanged');
		setExchangedBottles(bottlesExchanged);
		setIsLoading(false);
	};

	const signMessage = async () => {
		const publicAddress = (await web3.eth.getAccounts())[0];
		const signedMessage = await web3.eth.personal
			.sign('My Message', publicAddress, '')
			.catch((e: any) => console.log(e));
		console.log(signedMessage);
	};

	const showWallet = () => {
		console.log('Show Wallet');
		magic.connect.showWallet().catch((e: any) => {
			console.log(e);
		});
	};

	const disconnect = async (dispatch: any) => {
		setLoading(true);
		await magic.connect.disconnect().catch((e: any) => {
			console.log(e);
		});
		setAccount(null);
		dispatch(
			updateState({
				address: '',
				typeOfWallet: '',
				offersActiveReceived: [],
				offersActiveMade: [],
			})
		);
		setLoading(false);
	};

	const acceptAnOfferMagic = async (
		accept: boolean,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,

		dispatch: any,
		network: any,
		networkName: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			if (accept == true) {
				setMessage('Accepting the offer...');
			} else {
				setMessage('Denying the offer...');
			}
			await BottleCollectionContract.methods
				.respondAnOffer(accept)
				.send({ from: publicAddress });
			toast.success('Your respond to the offer was made successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const cancelAnOfferMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		dispatch: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Canceling your offer...');

			await BottleCollectionContract.methods
				.cancelLastOffer()
				.send({ from: publicAddress });
			toast.success('Your offer has been cancelled successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const exchangeCollectionMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		dispatch: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		setMessage('Redeeming your collection...');
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleExchangeContract = new (web3 as any).eth.Contract(
				BottleExchangeABI,
				'0x9Cf0C4bB20d6a2565b695B7610dD5DDf19542a50'
			);
			await BottleExchangeContract.methods
				.exchangeCollection(bottleContract)
				.send({ from: publicAddress });
			toast.success('You have exchanged the collection successfully!', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the exchange, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const increaseAllowanceMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const Erc20Instance = new (web3 as any).eth.Contract(
				ERC20ABI,
				process.env.NEXT_PUBLIC_USDC_ADDRESS
			);
			setMessage('Allowing us to accept USDC...');
			await Erc20Instance.methods
				.increaseAllowance(
					bottleContract,
					'1000000000000000000000000000000000000000000000000'
				)
				.send({ from: publicAddress });
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const makeAnOfferMagic = async (
		price: string,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);

			await BottleCollectionContract.methods
				.makeAnOfferForAll(multiply(price, '1000000'))
				.send({ from: publicAddress });
			toast.success('Your offer was made successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const getAmountBackMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		hideOptions: any
	) => {
		setIsLoading(true);

		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Transfering your amount to your address...');
			await BottleCollectionContract.methods
				.getOfferAmountBack()
				.send({ from: publicAddress });
			toast.success(
				'Your balance in the smart contract was transfered to your address successfully.',
				{
					duration: 7000,
				}
			);
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the transaction, please look at the console to more information.',
				{
					duration: 7000,
				}
			);

			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	return {
		loading,
		login,
		loginBuy,
		loginUpdateDataOffer,
		signMessage,
		disconnect,
		showWallet,
		sendTransaction,
		account,
		approveBottle,
		mint,
		getNFTsMagic,
		getNFTsOneBottleMagic,
		transfer,
		acceptAnOfferMagic,
		exchangeCollectionMagic,
		cancelAnOfferMagic,
		increaseAllowanceMagic,
		makeAnOfferMagic,
		getAmountBackMagic,
	};
}
