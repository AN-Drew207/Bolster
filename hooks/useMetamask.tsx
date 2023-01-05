import getWeb3 from 'components/getWeb3';
import { updateBalance, updateState } from 'redux/actions';
import BottleCollectionABI from '../contracts/MezcalCollection.json';
import ERC20ABI from '../contracts/ERC20.json';
import BottleExchangeABI from '../contracts/BottleExchange.json';
import bottlesTestnet from 'bottles_mumbai.json';
import bottlesMainnet from 'bottles_polygon.json';
import toast from 'react-hot-toast';
import { multiply } from 'components/common/multiply';
import { ProfileApiService } from 'api';

const bottles =
	process.env.NEXT_PUBLIC_NETWORK_NAME == 'mumbai'
		? bottlesTestnet
		: bottlesMainnet;

export const useMetamask = () => {
	const connectWallet = async ({
		setIsLoading,
		network,
		setWeb3,
		setAccounts,
		updateData,
		showBuy,
	}: any) => {
		setIsLoading(true);
		try {
			// Use web3 to get the user's accounts.

			const web3 = await getWeb3();
			const networkId = await (web3 as any).eth.net.getId();
			if (networkId != network) {
				setIsLoading(false);
				return alert('Please, Change the network to Mumbai Testnet');
			}
			const accounts = await (web3 as any).eth.getAccounts();

			// Update State
			setWeb3(web3);
			accounts.push(accounts[0]);
			accounts[0] = (window as any).ethereum.selectedAddress;
			setAccounts(accounts);
			updateData(accounts[0]);
			showBuy();
			setIsLoading(false);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3 or accounts. Try to connect metamask again.`);
			console.error(error);
			setIsLoading(false);
		}
	};

	const connectWalletOffer = async ({
		setIsLoading,
		network,
		setWeb3,
		setAccounts,
		updateData,
		showOptions,
	}: any) => {
		setIsLoading(true);
		try {
			// Use web3 to get the user's accounts.
			const web3 = await getWeb3();
			const networkId = await (web3 as any).eth.net.getId();
			if (networkId != network) {
				setIsLoading(false);
				return alert('Please, Change the network to Mumbai Testnet');
			}
			const accounts = await (web3 as any).eth.getAccounts();

			// Update State
			setWeb3(web3);
			accounts.push(accounts[0]);
			accounts[0] = (window as any).ethereum.selectedAddress;
			setAccounts(accounts);
			updateData(accounts[0]);
			showOptions();
			setIsLoading(false);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3 or accounts. Try to connect metamask again.`);
			console.error(error);
			setIsLoading(false);
			throw new Error(
				`Failed to load web3 or accounts. Try to connect metamask again.`
			);
		}
	};

	const connectWalletUpdateData = async (
		dispatch: any,
		network: string,
		networkName: string
	) => {
		// setIsLoading(true);
		try {
			// Use web3 to get the user's accounts.
			const web3: any = await getWeb3();
			const accounts = await web3.eth.getAccounts();
			await (window as any).ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [
					{
						chainId: '0x' + parseInt(network).toString(16),
					},
				],
			});
			const networkId = await web3.eth.net.getId();

			if (networkId != network) {
				return alert(
					`You are not on the ${networkName} network, set network to ${network}`
				);
			}

			// Update State
			let bottle: any;

			const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS
				? process.env.NEXT_PUBLIC_USDC_ADDRESS
				: '';
			const usdc = new web3.eth.Contract(ERC20ABI, usdcAddress);
			for (let i = 0; i < bottles.length; i++) {
				bottle = new web3.eth.Contract(BottleCollectionABI, bottles[i].address);
				const balance = await bottle.methods.balanceOf(accounts[0]).call();

				const approved = await usdc.methods
					.allowance(accounts[0], bottles[i].address)
					.call();

				const tokensOfUser = await bottle.methods
					.getOwnerTokens(accounts[0])
					.call();
				console.log(tokensOfUser);
				dispatch(
					updateBalance({
						allowance: approved,
						balanceOfUser: balance,
						index: i,
					})
				);
			}
			dispatch(
				updateState({
					address: accounts[0],
					typeOfWallet: 'metamask',
				})
			);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details or check Metamask.`
			);
			console.error(error);
		}
	};

	const transferMeta = async (
		setBottle: any,
		bottleContract: string,
		id: number,
		address: string,
		// setExchanged: any,
		hide: any,
		setIsLoading: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const publicAddress = (await (web3 as any).eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);

			const gas = await BottleCollectionContract.methods
				.transferFrom(publicAddress, address, id)
				.estimateGas({
					from: publicAddress,
				});
			const gasPrice = await (web3 as any).eth.getGasPrice();
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
					let bottle = new (web3 as any).eth.Contract(
						BottleCollectionABI,
						item.address
					);
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
					// setExchanged(false);
				}
			});

			toast.success('Your NFT has been successfully transferred');
		} catch (error) {
			console.log(error);
		}
		hide();
		setIsLoading(false);
	};

	const Mint = async (
		nfts: any,
		address: string,
		setIsLoading: any,
		bottleContract: any,
		setMessage: any,
		// accounts: any,
		dispatch: any,
		network: any,
		networkName: any,
		hideBuy: any,
		show: any,
		setMinted: any,
		data: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const accounts = await (web3 as any).eth.getAccounts();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			console.log('yei', address, process.env.NEXT_PUBLIC_WMATIC_ADDRESS);
			let txnid;
			if (address == process.env.NEXT_PUBLIC_WMATIC_ADDRESS) {
				setMessage('Minting your tokens... 1 of 1 transaction');
				console.log('xd');
				const price = await BottleCollectionContract.methods
					.getPrice(nfts.length)
					.call();
				console.log(price);
				const tx = await BottleCollectionContract.methods
					.safeMint(nfts, address)
					.send({
						from: accounts[0],
						value: price,
						gasPrice: 25000000000,
						maxFeePerGas: 25000000000,
						maxPriorityFeePerGas: 25000000000,
					});
				txnid = tx.transactionHash;
			} else {
				setMessage('Allowing us to receive USDC... 1 of 2 transactions');
				console.log('xd');
				const Erc20Instance = new (web3 as any).eth.Contract(ERC20ABI, address);
				const allowance = await Erc20Instance.methods
					.allowance(accounts[0], bottleContract)
					.call();
				const price = await BottleCollectionContract.methods
					.priceTokens(address)
					.call();
				if (allowance < price) {
					await Erc20Instance.methods
						.increaseAllowance(
							bottleContract,
							'1000000000000000000000000000000000000000000000000'
						)
						.send({
							from: accounts[0],
							gasPrice: 25000000000,
							maxFeePerGas: 25000000000,
							maxPriorityFeePerGas: 25000000000,
						});
				}
				setMessage('Minting your tokens... 2 of 2 transactions');
				const tx = await BottleCollectionContract.methods
					.safeMint(nfts, address)
					.send({
						from: accounts[0],
					});
				txnid = tx.transactionHash;
			}
			setMinted((prev: any) => !prev);
			connectWalletUpdateData(dispatch, network, networkName);
			// txnid = '';
			console.log({ ...data }, 'input');
			ProfileApiService.postUser({ ...data, txnid }).then((res) => {
				console.log(res, 'res');
				toast.success('Your NFT has been successfully minted');
			});
			hideBuy();
			setMessage('');
			show();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const acceptAnOffer = async (
		accept: boolean,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		accounts: any,
		dispatch: any,
		network: any,
		networkName: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
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
				.send({ from: accounts[0] });

			connectWalletUpdateData(dispatch, network, networkName);
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

	const cancelAnOffer = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		accounts: any,
		dispatch: any,
		network: any,
		networkName: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Canceling your offer...');

			await BottleCollectionContract.methods
				.cancelLastOffer()
				.send({ from: accounts[0] });
			connectWalletUpdateData(dispatch, network, networkName);

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

	const exchangeCollection = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		accounts: any,
		dispatch: any,
		network: any,
		networkName: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		setMessage('Redeeming your collection...');

		try {
			const web3 = await getWeb3();
			const BottleExchangeContract = new (web3 as any).eth.Contract(
				BottleExchangeABI,
				'0x9Cf0C4bB20d6a2565b695B7610dD5DDf19542a50'
			);

			await BottleExchangeContract.methods
				.exchangeCollection(bottleContract)
				.send({ from: accounts[0] });
			connectWalletUpdateData(dispatch, network, networkName);
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

	const makeAnOffer = async (
		price: string,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		accounts: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			const Erc20Instance = new (web3 as any).eth.Contract(
				ERC20ABI,
				process.env.NEXT_PUBLIC_USDC_ADDRESS
			);
			const allowance = await Erc20Instance.methods
				.allowance(accounts[0], bottleContract)
				.call();

			if (allowance < multiply(price, '1000000')) {
				setMessage('Allowing us to Receive USDC... Transaction 1 of 2');
				await Erc20Instance.methods
					.increaseAllowance(
						bottleContract,
						'1000000000000000000000000000000000000000000000000'
					)
					.send({ from: accounts[0] });
				setMessage('Making your offer... Transaction 2 of 2');
			} else {
				setMessage('Making your offer...');
			}

			await BottleCollectionContract.methods
				.makeAnOfferForAll(multiply(price, '1000000'))
				.send({ from: accounts[0] });
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

	const getAmountBack = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		accounts: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Transfering your amount to your address...');
			await BottleCollectionContract.methods
				.getOfferAmountBack()
				.send({ from: accounts[0] });
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
		connectWallet,
		connectWalletOffer,
		connectWalletUpdateData,
		Mint,
		transferMeta,
		exchangeCollection,
		acceptAnOffer,
		cancelAnOffer,
		makeAnOffer,
		getAmountBack,
	};
};
