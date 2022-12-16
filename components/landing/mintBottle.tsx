/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import BottleCollectionABI from '../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../contracts/BottleExchange.json';
import ERC20ABI from '../../contracts/ERC20.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from './MintComponents';
import { Loading } from './loadingComponent';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';
import { MintComponentBottle } from './MintComponents/MintComponentBottle';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { MakeAnOfferModal } from './Modals/MakeAnOfferModal';
import { MintModal } from './Modals/MintModal';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './styles.module.scss';
import { State } from 'redux/actions';
import { AcceptAnOfferModal } from './Modals/AcceptAnOfferModal';
import { CancelAnOfferModal } from './Modals/CancelAnOfferModal';
// import bottles from 'bottles.json';
import { ExchangeCollection } from './Modals/ExchangeCollectionModal';
import { GetAmountBackModal } from './Modals/getAmountBackModal';
import { GameRulesModal } from './Modals/GameRulesModal';
import { useMetamask } from 'hooks/useMetamask';
import useMagicLink from 'hooks/useMagicLink';
import { useConnectWalletModal } from 'hooks/useModalConnect';

export const MintBottle: React.FC<any> = ({ id: xd }) => {
	const [web3, setWeb3] = React.useState<any>(null);
	const [accounts, setAccounts] = React.useState<any>(null);
	const [isWhitelisted, setIsWhitelisted] = React.useState<any>(true);
	const [quantity, setQuantity] = React.useState<any>(0);
	const [percentageExtraToPayPerToken, setPercentageExtraToPayPerToken] =
		React.useState<any>(0);
	const [percentageToMakeAnOffer, setPercentageToMakeAnOffer] =
		React.useState<any>(0);
	const [timesUntilTransfer, setTimesUntilTransfer] = React.useState<any>(0);
	const [timeUntilExpireOffer, setTimeUntilExpireOffer] =
		React.useState<any>(0);
	const [decimalsUSD, setDecimalsUSD] = React.useState<any>(0);
	const [maxSupply, setMaxSupply] = React.useState<any>(-1);
	const [priceUSD, setPriceUSD] = React.useState<any>(0);
	const [balanceUSDC, setBalanceUSDC] = React.useState<any>(0);
	const [balance, setBalance] = React.useState<any>(0);
	const [priceMATIC, setPriceMATIC] = React.useState<any>(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [options, setOptions] = React.useState('menu');
	const [bottle, setBottle] = React.useState<any>({});

	const {
		connectWalletUpdateData,
		connectWallet,
		connectWalletOffer,
		Mint,
		acceptAnOffer,
		cancelAnOffer,
		exchangeCollection,
		makeAnOffer,
	} = useMetamask();

	const {
		approveBottle,
		mint,
		loginUpdateDataOffer,
		loginBuy,
		acceptAnOfferMagic,
		cancelAnOfferMagic,
		exchangeCollectionMagic,
		makeAnOfferMagic,
	} = useMagicLink();

	const { modal, show: showConnect } = useConnectWalletModal();

	const { Modal, show, isShow, hide } = useModal();
	const {
		Modal: ModalBuy,
		show: showBuy,
		isShow: isShowBuy,
		hide: hideBuy,
	} = useModal();

	const {
		Modal: ModalOptions,
		show: showOptions,
		isShow: isShowOptions,
		hide: hideOptions,
	} = useModal();

	const {
		Modal: ModalRules,
		show: showRules,
		isShow: isShowRules,
		hide: hideRules,
	} = useModal();

	const dispatch = useDispatch();

	const {
		id: bottleContract,
		modal: modalShow,
		offer: offerShow,
	} = useRouter().query;

	const {
		network,
		address,
		offersActiveReceived,
		offersActiveMade,
		networkName,
		bottles,
		typeOfWallet,
	} = useSelector((state: { state: State }) => state.state);

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	const accountChangedHandler = async (newAccount: any) => {
		setIsLoading(true);
		if (newAccount.length === 0) {
			setWeb3(null);
			setAccounts(null);
			// setIsWhitelisted(false);
			setIsLoading(false);
			window.location.reload();
			return false;
		}
		const web3 = await getWeb3();
		const accounts = await (web3 as any).eth.getAccounts();
		setWeb3(web3);
		accounts.push(newAccount[0]);
		accounts[0] = (window as any).ethereum.selectedAddress;
		setAccounts(accounts);
		updateData(accounts[0]);
		setIsLoading(false);
	};

	const updateData = async (address: string) => {
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				: 'localhost:8545'
		);
		const web3 = new Web3(provider);
		console.log(bottleContract);
		const contractInstance = new (web3 as any).eth.Contract(
			BottleCollectionABI,
			bottleContract
		);
		const currentSupply = await contractInstance.methods.supply().call();
		if (address) {
			const balance = await contractInstance.methods.balanceOf(address).call();
			setBalance(balance);
		}
		const priceMATIC = await contractInstance.methods.getPrice(1).call();
		setQuantity(currentSupply);
		setPriceMATIC(Web3.utils.fromWei(priceMATIC, 'ether').substring(0, 8));
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
	};

	const getAmountBack = async () => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Transfering your amount to your address...');
			const xt = await BottleCollectionContract.methods
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

	React.useEffect(() => {
		if (bottleContract !== undefined) {
			updateData('');
			bottles.map((item, index) => {
				console.log(item, bottleContract as string, 'compare');
				if (item.address == bottleContract) {
					setBottle(item);
				}
			});
		}
	}, [bottleContract, bottles]);

	React.useEffect(() => {
		if (modalShow && typeOfWallet == 'metamask') {
			connectWallet({
				setIsLoading,
				network,
				setWeb3,
				setAccounts,
				updateData,
				showBuy,
			});
		} else if (modalShow && typeOfWallet == 'magic') {
			showBuy();
		} else if (modalShow) {
			toast.error('Please connect your wallet before minting', {
				duration: 3000,
			});
			showConnect();
		}
	}, [modalShow]);

	React.useEffect(() => {
		if (
			offerShow &&
			offersActiveReceived?.filter(
				(offer: any) => offer.address === bottleContract
			).length > 0
		) {
			try {
				// connectWalletOffer();
				setOptions('accept-deny offer');
			} catch (error) {
				console.log(error);
			}
		}
	}, [offerShow]);

	return (
		<>
			{modal}
			<Modal isShow={isShow}>
				<div
					className={clsx(
						'flex flex-col items-center justify-center w-full h-screen sm:px-10 px-4 pb-10 relative md:pt-24'
					)}
				>
					<div className="flex w-full md:mb-0 mb-10 text-xl text-white absolute top-32 left-16">
						<Button
							onClick={() => {
								hide();
							}}
							className="font-bold"
						>
							Back
						</Button>
					</div>
					<div className="flex flex-col items-center justify-center relative">
						<h1 className="text-3xl textMain font-bold text-center mb-2">
							Congratulations!
						</h1>

						<h2 className="text-xl text-white text-center font-bold mb-14">
							<span className="text-2xl">
								{' '}
								Now you own a fraction(s) of {bottle.short_name}!
							</span>{' '}
							<br />
							<br />
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
				</div>
			</Modal>
			<ModalRules hasBg isShow={isShowRules}>
				<GameRulesModal hide={hideRules} />
			</ModalRules>
			<ModalBuy isShow={isShowBuy} hasBg>
				<div
					className={clsx(
						'flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10 relative mt-24'
					)}
				>
					<MintModal
						priceusd={priceUSD}
						priceMATIC={priceMATIC}
						allowance={bottle.allowance}
						hide={hideBuy}
						approve={(address: any) => {
							if (typeOfWallet !== 'metamask') {
								approveBottle(dispatch, bottleContract, address);
							}
						}}
						typeOfWallet={typeOfWallet}
						Mint={(data: any, address: any) => {
							console.log(data);
							// if (typeOfWallet == 'metamask') {
							// 	console.log('meta');
							// 	Mint(
							// 		quantity,
							// 		address,
							// 		setIsLoading,
							// 		bottleContract,
							// 		setMessage,
							// 		// accounts,
							// 		dispatch,
							// 		network,
							// 		networkName,
							// 		hideBuy,
							// 		show,
							// 		setQuantity
							// 		// setMaxSupply
							// 	);
							// } else {
							// 	console.log('magic');
							// 	mint(
							// 		bottleContract,
							// 		quantity,
							// 		address,
							// 		dispatch,
							// 		setMessage,
							// 		hideBuy,
							// 		show,
							// 		setQuantity
							// 		// setMaxSupply
							// 	);
							// }
						}}
						currencies={[
							{ name: 'USDC', value: process.env.NEXT_PUBLIC_USDC_ADDRESS },
							{ name: 'MATIC', value: process.env.NEXT_PUBLIC_WMATIC_ADDRESS },
						]}
						quantityMinted={quantity}
						maxSupply={maxSupply}
						isWhitelisted={isWhitelisted}
						accounts={accounts}
						isLoading={isLoading}
						show={showBuy}
						connectWallet={connectWallet}
						message={message}
					/>
				</div>
			</ModalBuy>
			<ModalOptions
				isShow={isShowOptions}
				hasBg
				onClose={() => setOptions('menu')}
			>
				<div
					className={clsx(
						'flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10 relative mt-24'
					)}
				>
					{options === 'menu' ? (
						<div
							className={clsx(
								'flex flex-col w-full h-full px-16 py-10 relative mt-24 bg-gray-900 rounded-xl border border-white relative'
							)}
						>
							<div className="flex w-full mb-4 text-xl text-white">
								<Button
									onClick={() => {
										hideOptions();
									}}
									className="font-bold"
								>
									x
								</Button>
							</div>
							<h2 className="text-2xl w-full text-center font-bold textMain">
								Collection Options
							</h2>
							{maxSupply == balance && (
								<Button
									className={clsx(
										'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
										Styles.button
									)}
									onClick={() => {
										setOptions('exchange');
									}}
								>
									REDEEM COLLECTION
								</Button>
							)}
							{(balance * 100) / maxSupply >= percentageToMakeAnOffer &&
								offersActiveMade.filter(
									(offer: any) => offer.address === bottleContract
								).length == 0 &&
								balance !== maxSupply && (
									<Button
										className={clsx(
											'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
											Styles.button
										)}
										onClick={() => {
											setOptions('make offer');
										}}
									>
										MAKE AN OFFER FOR ALL THE COLLECTION
									</Button>
								)}

							{offersActiveReceived.filter(
								(offer: any) => offer.address === bottleContract
							).length > 0 && (
								<Button
									className={clsx(
										'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
										Styles.button
									)}
									onClick={() => {
										setOptions('accept-deny offer');
									}}
								>
									ACCEPT / DENY CURRENT OFFER
								</Button>
							)}
							{offersActiveMade.filter(
								(offer: any) => offer.address === bottleContract
							).length > 0 && (
								<Button
									className={clsx(
										'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
										Styles.button
									)}
									onClick={() => {
										setOptions('cancel offer');
									}}
								>
									CANCEL YOUR CURRENT OFFER
								</Button>
							)}

							<Button
								className={clsx(
									'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
									Styles.button
								)}
								onClick={() => {
									setOptions('get amount');
								}}
							>
								GET BACK USDC FROM PREVIOUS OFFERS MADE BY YOU
							</Button>
						</div>
					) : options === 'make offer' ? (
						<MakeAnOfferModal
							minimumPrice={priceUSD}
							setOptions={setOptions}
							quantityLeft={balance}
							quantityMinted={quantity}
							maxSupply={maxSupply}
							message={message}
							makeAnOffer={(price: any) => {
								if (address) {
									if (typeOfWallet == 'metamask') {
										makeAnOffer(
											price,
											bottleContract,
											setIsLoading,
											setMessage,
											dispatch,
											hideOptions
										);
									} else {
										cancelAnOfferMagic(
											bottleContract,
											setIsLoading,
											setMessage,
											dispatch,
											hideOptions
										);
									}
								} else {
									toast.error(
										'Please connect your wallet before accessing options',
										{
											duration: 3000,
										}
									);
									showConnect();
								}
							}}
							isLoading={isLoading}
							percentage={percentageExtraToPayPerToken}
						/>
					) : options === 'accept-deny offer' ? (
						<AcceptAnOfferModal
							setOptions={setOptions}
							acceptAnOffer={(accept: boolean) => {
								if (address) {
									if (typeOfWallet == 'metamask') {
										acceptAnOffer(
											accept,
											bottleContract,
											setIsLoading,
											setMessage,
											accounts,
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										acceptAnOfferMagic(
											accept,
											bottleContract,
											setIsLoading,
											setMessage,
											dispatch,
											network,
											networkName,
											hideOptions
										);
									}
								} else {
									toast.error(
										'Please connect your wallet before accessing options',
										{
											duration: 3000,
										}
									);
									showConnect();
								}
							}}
							balance={balance}
							message={message}
							isLoading={isLoading}
							decimalsUSD={decimalsUSD}
							offer={
								offersActiveReceived.filter(
									(offer: any) => offer.address === bottleContract
								).length > 0 &&
								offersActiveReceived.find((offer: any) => {
									return offer.address === bottleContract;
								})
							}
						/>
					) : options === 'cancel offer' ? (
						<CancelAnOfferModal
							setOptions={setOptions}
							message={message}
							isLoading={isLoading}
							cancelAnOffer={() => {
								if (address) {
									if (typeOfWallet == 'metamask') {
										cancelAnOffer(
											bottleContract,
											setIsLoading,
											setMessage,
											accounts,
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										cancelAnOfferMagic(
											bottleContract,
											setIsLoading,
											setMessage,
											dispatch,
											hideOptions
										);
									}
								} else {
									toast.error(
										'Please connect your wallet before accessing options',
										{
											duration: 3000,
										}
									);
									showConnect();
								}
							}}
						/>
					) : options === 'exchange' ? (
						<ExchangeCollection
							setOptions={setOptions}
							isLoading={isLoading}
							address={address}
							name={bottle.short_name}
							exchangeCollection={() => {
								if (address) {
									if (typeOfWallet == 'metamask') {
										exchangeCollection(
											bottleContract,
											setIsLoading,
											setMessage,
											accounts,
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										exchangeCollectionMagic(
											bottleContract,
											setIsLoading,
											setMessage,
											dispatch,
											hideOptions
										);
									}
								} else {
									toast.error(
										'Please connect your wallet before accessing options',
										{
											duration: 3000,
										}
									);
									showConnect();
								}
							}}
						/>
					) : (
						<GetAmountBackModal
							setOptions={setOptions}
							isLoading={isLoading}
							message={message}
							getAmountBack={getAmountBack}
							balance={balanceUSDC}
						/>
					)}
				</div>
			</ModalOptions>
			<div
				className={clsx(
					'min-h-screen flex flex-col items-center pt-0 w-full bg-gray-900',
					'relative',
					isLoading || !bottle.short_name ? 'justify-center' : 'justify-start'
				)}
			>
				{/* <img
					src="/img/bg_membership.jpg"
					className="fixed h-full w-full"
					alt=""
				/> */}
				{!isShow &&
					(!isLoading && bottle && bottle.address ? (
						<div className="flex justify-center items-start w-full">
							<div className="min-h-screen flex flex-col items-center py-32 xl:w-4/5 w-full mr-10 xl:px-0 px-8 justify-start relative">
								<Link href="/?bottles=true">
									<div className="font-bold md:text-xl text-md w-full mb-4 text-white cursor-pointer">
										Back to Bottles
									</div>
								</Link>
								<MintComponentBottle
									quantity={quantity}
									maxSupply={maxSupply}
									litepaper={bottle.litepaper}
									isWhitelisted={isWhitelisted}
									accounts={accounts}
									isLoading={isLoading}
									show={showBuy}
									exchanged={bottle.exchanged}
									bottleName={bottle.short_name}
									videoDemo={bottle.videoDemo}
									content={bottle.content}
									address={bottle.address}
									artist={bottle.artist}
									connectWallet={() => {
										console.log(address);
										if (address) {
											if (typeOfWallet == 'metamask') {
												connectWallet({
													setIsLoading,
													network,
													setWeb3,
													setAccounts,
													updateData,
													showBuy,
												});
											} else {
												showBuy();
											}
										} else {
											toast.error('Please connect your wallet before minting', {
												duration: 3000,
											});
											showConnect();
										}
									}}
									connectWalletOffer={() => {
										if (address) {
											if (typeOfWallet == 'metamask') {
												connectWalletOffer({
													setIsLoading,
													network,
													setWeb3,
													setAccounts,
													updateData,
													showBuy,
												});
											} else {
												loginUpdateDataOffer(updateData, showOptions);
											}
										} else {
											toast.error(
												'Please connect your wallet before accessing options',
												{
													duration: 3000,
												}
											);
											showConnect();
										}
									}}
								></MintComponentBottle>
							</div>
							<Button
								className={clsx(
									'py-2 px-8 transition border border-primary rounded-xl bg-overlay uppercase font-bold hover:shadow-button hover:scale-110 duration-300 rotate-[270deg] fixed right-[-58px] top-[50%] text-white'
								)}
								onClick={() => showRules()}
							>
								Game Rules
							</Button>
						</div>
					) : (
						<Loading />
					))}
				<Toaster />
			</div>
		</>
	);
};
