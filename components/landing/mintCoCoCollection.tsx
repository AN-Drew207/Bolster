/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import CoCoCollectionABI from '../../contracts/CoCoCollection.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from './MintComponents';
import { Loading } from './loadingComponent';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';

export const MintCoCoCollection = () => {
	const [web3, setWeb3] = React.useState<any>(null);
	const [accounts, setAccounts] = React.useState<any>(null);
	const [contract, setContract] = React.useState<any>(null);
	// const [contractManager, setContractManager] = React.useState<any>(null);
	const [isWhitelisted, setIsWhitelisted] = React.useState<any>(null);
	const [quantity, setQuantity] = React.useState<any>(0);
	const [maxSupply, setMaxSupply] = React.useState<any>(1000);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isExecuted, setIsExecuted] = React.useState(false);
	const { Modal, show, isShow, hide } = useModal();

	const mainContract = process.env.NEXT_PUBLIC_MAIN_CONTRACT;

	const connectWallet = async () => {
		setIsLoading(true);
		try {
			// Use web3 to get the user's accounts.

			const web3 = await getWeb3();
			const networkId = await (web3 as any).eth.net.getId();
			if (networkId != 4) {
				setIsLoading(false);
				return alert('Please, Change the network to Rinkeby Testnet');
			}
			const accounts = await (web3 as any).eth.getAccounts();

			// Update State
			setWeb3(web3);
			accounts.push(accounts[0]);
			accounts[0] = (window as any).ethereum.selectedAddress;
			// getAccountBalance(accounts[0]);
			setAccounts(accounts);
			const contractInstance = new (web3 as any).eth.Contract(
				CoCoCollectionABI,
				mainContract
			);

			const quantityMinted = await contractInstance.methods
				.tokenIdCounter()
				.call();

			setQuantity(quantityMinted);

			const maxSupply = await contractInstance.methods.mintLimit().call();

			setMaxSupply(maxSupply);
			const whitelisted = await contractInstance.methods
				.getWhitelist(accounts[0])
				.call();
			setIsWhitelisted(whitelisted);
			setIsLoading(false);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3 or accounts. Try to connect metamask again.`);
			console.error(error);
			setIsLoading(false);
		}
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	const accountChangedHandler = async (newAccount: any) => {
		setIsLoading(true);
		if (newAccount.length === 0) {
			setWeb3(null);
			setAccounts(null);
			setIsWhitelisted(false);
			setIsLoading(false);
			return false;
		}
		console.log(newAccount, 'new accounts');
		const web3 = await getWeb3();
		const accounts = await (web3 as any).eth.getAccounts();
		setWeb3(web3);
		accounts.push(newAccount[0]);
		accounts[0] = (window as any).ethereum.selectedAddress;
		console.log(accounts, 'account assing');
		setAccounts(accounts);
		// getAccountBalance(newAccount.toString());
		const contractInstance = new (web3 as any).eth.Contract(
			CoCoCollectionABI,
			mainContract
		);
		const whitelisted = await contractInstance.methods
			.getWhitelist(accounts[0])
			.call();
		console.log(whitelisted, 'whitelisted');

		setIsWhitelisted(whitelisted);
		setContract(contractInstance);
		setIsLoading(false);
	};

	React.useEffect(() => {
		updateData();
		connectWallet();
	}, []);

	const updateData = async () => {
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_MAIN_PROVIDER
				? process.env.NEXT_PUBLIC_MAIN_PROVIDER
				: 'localhost:8545'
		);
		console.log('provider instance');
		const web3 = new Web3(provider);
		const contractInstance = new (web3 as any).eth.Contract(
			CoCoCollectionABI,
			mainContract
		);
		console.log('contract instance');
		const quantityMinted = await contractInstance.methods
			.tokenIdCounter()
			.call();
		setQuantity(quantityMinted);
		const maxSupply = await contractInstance.methods.mintLimit().call();
		setMaxSupply(maxSupply);
		console.log('listeners');
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
	};

	// if (typeof window !== 'undefined' && !isExecuted) {
	// 	// Client-side-only code

	// 	setIsExecuted(true);
	// }

	const Mint = async (quantity: any) => {
		/* 	console.log(dataMintedTokens); */
		// await getPhase();

		// console.log(price);
		setIsLoading(true);

		try {
			const web3 = await getWeb3();
			const contractInstance = new (web3 as any).eth.Contract(
				CoCoCollectionABI,
				mainContract
			);
			const price = await contractInstance.methods.price().call();
			await contractInstance.methods.normalMint(quantity).send({
				from: accounts[0],
				value: price * quantity,
			});
			const quantityMinted = await contractInstance.methods
				.tokenIdCounter()
				.call();
			setQuantity(quantityMinted);
			const maxSupply = await contractInstance.methods.maxTokenSupply().call();
			setMaxSupply(maxSupply);
			show();
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	return (
		<>
			<Modal isShow={isShow}>
				<div
					className={clsx(
						'flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10 relative md:mt-20'
					)}
				>
					<div className="flex w-full items-center justify-center">
						<div className="flex sm:w-2/3 w-full md:mb-0 mb-10 text-xl text-white">
							<Button
								onClick={() => {
									hide();
								}}
								className="font-bold"
							>
								Back
							</Button>
						</div>
					</div>
					<h1 className="text-3xl textMain font-bold text-center mb-2">
						Congratulations!
					</h1>
					<h1 className="text-3xl textMain font-bold text-center mb-14">
						Welcome to:
					</h1>
					<img
						src="/logos/Combined_Gold.png"
						className="sm:w-2/3 w-full mb-14"
						alt=""
					/>
					<h2 className="text-xl text-white text-center font-bold mb-14">
						Keep yourself up to date by following us on{' '}
						<a
							className="text-primary"
							target="_blank"
							href="https://twitter.com/CoCoBottleClub?s=09"
						>
							Twitter
						</a>{' '}
						and joining our{' '}
						<a
							className="text-primary"
							target="_blank"
							href="https://discord.gg/jx79rnJX8t"
						>
							Discord
						</a>{' '}
						or{' '}
						<a
							className="text-primary"
							target="_blank"
							href="https://t.me/+TsL_34k_1C81MjI0"
						>
							Telegram group
						</a>
						.
					</h2>
				</div>
			</Modal>
			<div
				className={clsx(
					'min-h-screen flex flex-col items-center pt-0 w-full bg-gray-900',
					'justify-center relative'
				)}
			>
				<img
					src="/img/banner_bg_1_mobile.jpg"
					className="fixed md:hidden block h-full w-full top-0 left-0"
					alt=""
				/>
				<img
					src="/img/bgMint.png"
					className="fixed md:block hidden h-full left-0"
					alt=""
				/>
				<img
					src="/img/bgMint_1.png"
					className="fixed md:block hidden h-full right-0"
					alt=""
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 8"
					preserveAspectRatio="none"
					width="100%"
					height="15%"
					className="fixed bottom-0 md:block hidden"
				>
					<path fill="#000" d="M64 8 L64 0 Q32 15.8 0 0 L0 8 Z"></path>
				</svg>
				{!isShow &&
					(!isLoading ? (
						<div className="flex justify-center items-center w-full">
							<div className="min-h-screen flex flex-col items-center py-28 md:w-1/2 sm:w-2/3 w-full sm:px-0 px-4  justify-center relative">
								<MintComponent
									quantity={quantity}
									maxSupply={maxSupply}
									isWhitelisted={isWhitelisted}
									accounts={accounts}
									isLoading={isLoading}
								></MintComponent>
								<ButtonMint
									connectWallet={connectWallet}
									isLoading={isLoading}
									accounts={accounts}
									Mint={Mint}
									isWhitelisted={isWhitelisted}
								></ButtonMint>
							</div>
						</div>
					) : (
						<Loading />
					))}
			</div>
		</>
	);
};
