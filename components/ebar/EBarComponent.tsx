import clsx from 'clsx';
import { Button } from 'components/common/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateTokensOfUser } from 'redux/actions';
import getWeb3 from 'components/getWeb3';
import BottleCollectionABI from '../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../contracts/BottleExchange.json';
import { Loading } from 'components/landing/loadingComponent';
import { Zoom, Navigation } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useMagicLink from 'hooks/useMagicLink';
import { useModal } from 'hooks/modal';
import { useMetamask } from 'hooks/useMetamask';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import { MakeAnOfferModal } from 'components/collection/Modals/MakeAnOfferModal';
import { AcceptAnOfferModal } from 'components/collection/Modals/AcceptAnOfferModal';
import { CancelAnOfferModal } from 'components/collection/Modals/CancelAnOfferModal';
import { ExchangeCollection } from 'components/collection/Modals/ExchangeCollectionModal';
import { GetAmountBackModal } from 'components/collection/Modals/getAmountBackModal';
import Web3 from 'web3';
import toast from 'react-hot-toast';
import { useConnectWalletModal } from 'hooks/useModalConnect';

export const EBarComponent: React.FC<any> = () => {
	const { bottles, address, networkName, network, typeOfWallet } = useSelector(
		(state: { state: State }) => state.state
	);
	const dispatch = useDispatch();
	const [exchangedBottles, setExchangedBottles] = React.useState<any>([]);
	const [haveNFTs, setHaveNFTs] = React.useState<any>(false);
	const [isLoading, setIsLoading] = React.useState<any>(false);
	const { getNFTsMagic } = useMagicLink();

	const getNFTs = async () => {
		setIsLoading(true);
		console.log('nfts');
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
	React.useEffect(() => {
		console.log(typeOfWallet, address, 'wallet');
		if (address && typeOfWallet !== 'magic') {
			getNFTs();
		} else if (typeOfWallet == 'magic') {
			getNFTsMagic(dispatch, setIsLoading, setHaveNFTs, setExchangedBottles);
		}
	}, [address]);

	return (
		<div className="flex flex-col bg-overlay sm:px-16 px-4 pt-36 w-full min-h-screen relative">
			{/* <img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/>{' '} */}
			<div className="relative flex flex-col w-full">
				<div className="md:absolute hidden left-0 top-0 font-bold text-xl text-secondary cursor-pointer">
					<Link href="/collections">Go To Collections</Link>
				</div>
				<h2 className="text-white font-bold mb-10 text-5xl w-full text-center">
					My NFTs
				</h2>
				<div className="flex flex-col gap-10 items-center justify-center w-full pb-10">
					{!isLoading ||
					(bottles.length > 0 &&
						(bottles[0]?.tokensOfUser?.length > 0 ||
							exchangedBottles.length > 0)) ? (
						<>
							{haveNFTs ? (
								<>
									<h2 className="text-4xl text-white font-bold w-full text-left">
										Bottle NFT Fractions
									</h2>
									{bottles?.map((bottle) => {
										const {
											id,
											address: addressBottle,
											name,
											image,
											tokensOfUser,
										} = bottle;
										return (
											tokensOfUser?.length > 0 && (
												<BottleNFTs
													id={id}
													addressUser={address}
													address={addressBottle}
													name={name}
													video={image}
													tokensOfUser={tokensOfUser}
													bottle={bottle}
													networkName={networkName}
													network={network}
													setExchanged={(value: boolean) => {
														console.log(value);
													}}
												/>
											)
										);
									})}
								</>
							) : (
								<div className="flex flex-col items-center justify-center h-[60vh] text-3xl font-bold text-secondary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-20 h-20"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
										/>
									</svg>

									<h2 className="	p-8 rounded-xl bg-overlay">
										You don't have Bolster NFTs
									</h2>
								</div>
							)}
							{exchangedBottles.length > 0 && (
								<h2 className="text-4xl text-secondary font-bold w-full text-left ">
									Bottles Redeemed NFTs
								</h2>
							)}
							{exchangedBottles?.map((bottle: any) => {
								return (
									<BottleFinalNFT
										id={bottle.id}
										address={bottle.address}
										name={bottle.name}
										image={bottle.image}
									/>
								);
							})}
						</>
					) : !address ? (
						<div className="text-center text-2xl text-secondary font-bold h-[60vh] flex items-center justify-center">
							<div className="bg-overlay rounded-xl p-6">
								Please Connect Your Wallet To See this Section
							</div>
						</div>
					) : (
						<div className="h-[60vh] flex items-center justify-center">
							<Loading />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const BottleFinalNFT = ({ address, id, name, image }: any) => {
	return (
		<div className="flex flex-col w-full shadow-xl">
			<div className="flex flex-col rounded-xl bg-overlay border-2 border-yellow-400 text-xl text-center font-bold text-secondary md:p-10 sm:p-8 p-4">
				<h3 className="text-2xl text-center font-bold text-yellow-400 pb-4 w-full">
					{name} Final Art
				</h3>
				<div className="px-6 w-full flex items-center justify-center py-4">
					<img src={image} className="w-96" alt="" />
				</div>

				<div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full">
					<Link href={`/collections/${id}`}>
						<Button
							className={clsx(
								'z-10 border border-yellow-400 font-bold p-2 text-secondary transition ease-in-out delay-150 hover:-translate-y-1  hover:scale-110 duration-300'
								// Styles.button
							)}
						>
							View Bottle Info
						</Button>
					</Link>
					<Link href={`/profile/collection/${address}`}>
						<Button
							className={clsx(
								'z-10 border border-yellow-400 font-bold p-2 text-secondary transition ease-in-out delay-150 hover:-translate-y-1  hover:scale-110 duration-300'
								// Styles.button
							)}
						>
							View NFT Detailed
						</Button>
					</Link>{' '}
				</div>
			</div>
		</div>
	);
};

export const BottleNFTs = ({
	address,
	name,
	video,
	tokensOfUser,
	bottle,
	typeOfWallet,
	network,
	networkName,
	addressUser,
}: // setExchanged,
any) => {
	const videoRef = React.useRef<any>(null);

	const handleVideo = () => {
		videoRef?.current?.play();
	};

	const styleArrows: any = {
		'--swiper-navigation-color': '#fff',
		'--swiper-pagination-color': '#fff',
	};

	React.useEffect(() => {
		handleVideo();
	}, [video]);

	const [quantity, setQuantity] = React.useState<any>(0);
	const [decimalsUSD, setDecimalsUSD] = React.useState<any>(0);
	const [maxSupply, setMaxSupply] = React.useState<any>(-1);
	const [priceUSD, setPriceUSD] = React.useState<any>(0);
	const [balanceUSDC, setBalanceUSDC] = React.useState<any>(0);
	const [balance, setBalance] = React.useState<any>(0);
	const [message, setMessage] = React.useState('');

	const { Modal, show, isShow, hide } = useModal();
	const {
		Modal: ModalOptions,
		show: showOptions,
		isShow: isShowOptions,
		hide: hideOptions,
	} = useModal();
	const { transfer } = useMagicLink();
	const { transferMeta } = useMetamask();
	const { handleSubmit } = useForm();
	const [addressSent, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tokens, setTokens] = useState({ tokensOfUser });
	const [offersActiveMade, setOffersActiveMade] = useState<any>([]);
	const [offersActiveReceived, setOffersActiveReceived] = useState<any>([]);
	const [token, setToken] = useState({ id: 0, image: '', name: '' });
	const [options, setOptions] = React.useState('menu');
	const [percentageExtraToPayPerToken, setPercentageExtraToPayPerToken] =
		React.useState<any>(0);
	const [percentageToMakeAnOffer, setPercentageToMakeAnOffer] =
		React.useState<any>(0);

	const dispatch = useDispatch();

	const { modal, show: showConnect } = useConnectWalletModal();

	const { acceptAnOffer, cancelAnOffer, exchangeCollection, makeAnOffer } =
		useMetamask();

	const {
		acceptAnOfferMagic,
		cancelAnOfferMagic,
		exchangeCollectionMagic,
		makeAnOfferMagic,
	} = useMagicLink();

	React.useEffect(() => {
		setTokens({ tokensOfUser });
	}, [tokensOfUser]);

	React.useEffect(() => {
		if (bottle.address) {
			updateData(addressUser);
		}
	}, [bottle.address]);

	const getAmountBack = async () => {
		setIsLoading(true);
		try {
			const web3 = await getWeb3();
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottle.address
			);
			setMessage('Transfering your amount to your address...');
			await BottleCollectionContract.methods
				.getOfferAmountBack()
				.send({ from: addressUser });
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

	const updateData = async (address: string) => {
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				: 'localhost:8545'
		);
		const web3 = new Web3(provider);
		const contractInstance = new (web3 as any).eth.Contract(
			BottleCollectionABI,
			bottle.address
		);
		const currentSupply = await contractInstance.methods.supply().call();
		if (address) {
			const balance = await contractInstance.methods.balanceOf(address).call();
			setBalance(balance);
			const balanceUSDC = await contractInstance.methods
				.balanceUserOfferTokens(address)
				.call();
			setBalanceUSDC(balanceUSDC / 10 ** 6);
		}
		const offer = await contractInstance.methods.lastOffer().call();
		const now = new Date().getTime();
		const expirationLastOffer = new Date(offer.expirationDate * 1000).getTime();

		const maxSupply = await contractInstance.methods.maxSupply().call();
		const priceUSD = await contractInstance.methods.usdPrice().call();
		const decimalsUSD = await contractInstance.methods.decimalsUSD().call();
		const percentageOffer = await contractInstance.methods
			.percentageExtraToPayPerToken()
			.call();
		const minimumPercentageToOffer = await contractInstance.methods
			.minimumPercentageToOffer()
			.call();

		setPercentageExtraToPayPerToken(percentageOffer);
		setPercentageToMakeAnOffer(minimumPercentageToOffer);
		setPriceUSD(priceUSD / 10 ** decimalsUSD);
		setQuantity(currentSupply);
		setMaxSupply(maxSupply);
		setDecimalsUSD(decimalsUSD);

		const offersReceived = [];
		const offersDone = [];
		if (
			balance > 0 &&
			offer.active &&
			offer.bidder.toLowerCase() != addressUser.toLowerCase() &&
			expirationLastOffer >= now
		) {
			offersReceived.push({
				title: `You have an offer for your tokens of ${bottle.name} Collection`,
				offer: offer,
				address: bottle.address,
				externalLink: `/bottle/${bottle.address}?offer=true`,
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
			offer.bidder.toLowerCase() == addressUser.toLowerCase() &&
			expirationLastOffer >= now
		) {
			offersDone.push({
				title: `You have done an offer for all the tokens of ${bottle.name} Collection`,
				address: bottle.address,
				offer: offer,
				externalLink: `/bottle/${bottle.address}`,
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

		setOffersActiveMade(offersDone);
		setOffersActiveReceived(offersReceived);
	};

	return (
		<>
			{modal}
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
								'flex flex-col w-full h-full p-10 relative gap-6 bg-gray-900 rounded-xl border border-white relative'
							)}
						>
							<div className="absolute top-4 left-4 text-xl text-white">
								<Button
									onClick={() => {
										hideOptions();
									}}
									className="font-bold"
								>
									x
								</Button>
							</div>
							<h2 className="text-2xl w-full text-center font-bold text-white">
								Collection Options
							</h2>
							{maxSupply == balance && (
								<Button
									className={clsx(
										'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
										'!rounded-full hover:text-secondary ml-4'
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
									(offer: any) => offer.address === bottle.address
								).length == 0 &&
								balance !== maxSupply && (
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'!rounded-full hover:text-secondary ml-4'
										)}
										onClick={() => {
											setOptions('make offer');
										}}
									>
										MAKE AN OFFER FOR ALL THE COLLECTION
									</Button>
								)}

							{offersActiveReceived.filter(
								(offer: any) => offer.address === bottle.address
							).length > 0 && (
								<Button
									className={clsx(
										'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
										'!rounded-full hover:text-secondary ml-4'
									)}
									onClick={() => {
										setOptions('accept-deny offer');
									}}
								>
									ACCEPT / DENY CURRENT OFFER
								</Button>
							)}
							{offersActiveMade.filter(
								(offer: any) => offer.address === bottle.address
							).length > 0 && (
								<Button
									className={clsx(
										'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
										'!rounded-full hover:text-secondary ml-4'
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
									'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
									'!rounded-full hover:text-secondary ml-4'
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
											bottle.address,
											setIsLoading,
											setMessage,
											dispatch,
											hideOptions
										);
									} else {
										makeAnOfferMagic(
											price,
											bottle.address,
											setIsLoading,
											setMessage,
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
											bottle.address,
											setIsLoading,
											setMessage,
											[addressUser],
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										acceptAnOfferMagic(
											accept,
											bottle.address,
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
									(offer: any) => offer.address === bottle.address
								).length > 0 &&
								offersActiveReceived.find((offer: any) => {
									return offer.address === bottle.address;
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
											bottle.address,
											setIsLoading,
											setMessage,
											[addressUser],
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										cancelAnOfferMagic(
											bottle.address,
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
											bottle.address,
											setIsLoading,
											setMessage,
											[addressUser],
											dispatch,
											network,
											networkName,
											hideOptions
										);
									} else {
										exchangeCollectionMagic(
											bottle.address,
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
			<Modal isShow={isShow} hasBg>
				<div className="min-h-[100vh] flex flex-col items-center justify-center w-full">
					<div className="min-h-[50vh] bg-primary rounded-md p-6 2xl:min-w-[40vw] w-[500px]">
						<div className="flex justify-between mb-4">
							<div
								className="text-white font-bold cursor-pointer"
								onClick={hide}
							>
								Back
							</div>
							<a
								href={`https://${
									network != '137' ? 'testnets.' : ''
								}opensea.io/assets/${networkName}/${bottle.address}/${
									token.id
								}`}
								target="_blank"
								className="text-secondary font-bold flex items-center gap-2 p-2"
							>
								View in{' '}
								<img src="/icons/opensea.svg" className="h-4 w-4" alt="" />
							</a>
						</div>
						<div className="flex flex-col gap-8 h-full items-center justify-center">
							<img
								src={token.image}
								className="w-96 shrink-0 rounded-xl border border-white"
								alt=""
							/>
							<form
								onSubmit={handleSubmit(() => {
									if (typeOfWallet == 'magic') {
										transfer(
											setTokens,
											bottle.address,
											token.id,
											addressSent,
											// setExchanged,
											hide
										);
									} else {
										transferMeta(
											setTokens,
											bottle.address,
											token.id,
											addressSent,
											// setExchanged,
											hide,
											setIsLoading
										);
									}
								})}
								className="sm:w-[450px] w-[250px] flex flex-col items-center justify-center gap-4"
							>
								<h2 className="text-secondary text-center font-bold text-lg">
									Transfer <span className="text-white"> {token.name}</span>
								</h2>

								<input
									type="text"
									name="address"
									placeholder="Wallet Address to transfer"
									className="rounded-xl w-full"
									value={addressSent}
									onChange={(e) => setAddress(e.target.value)}
								/>
								<Button
									className={clsx(
										'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
										'!rounded-full hover:text-secondary ml-4'
									)}
									type="submit"
								>
									Send
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Modal>
			<div className={clsx('flex flex-col w-full shadow-xl')}>
				<div
					className={clsx(
						{ ['items-center justify-center']: isLoading },
						'flex flex-col rounded-xl bg-overlay border border-secondary text-xl text-center font-bold text-white md:p-10 sm:p-8 p-4'
					)}
				>
					{isLoading ? (
						<div className="p-4 flex items-center justify-center text-white text-5xl">
							<LoadingOutlined></LoadingOutlined>
						</div>
					) : (
						<>
							<div className="flex xl:flex-row flex-col gap-10 justify-between items-center pb-10">
								<h3 className="text-2xl text-left font-bold text-white pb-4 w-full">
									{name}
								</h3>{' '}
								<Button
									className={clsx(
										'z-10 border border-secondary bg-secondary whitespace-nowrap RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
										'!rounded-full hover:text-secondary ml-4'
									)}
									onClick={() => showOptions()}
								>
									Collection Options
								</Button>
							</div>
							<div className="sm:px-6 pb-10">
								<Swiper
									style={styleArrows}
									slidesPerView={5}
									onSlideChange={() => console.log('slide change')}
									onSwiper={(swiper) => console.log(swiper)}
									zoom={true}
									scrollbar={true}
									navigation={true}
									modules={[Zoom, Navigation]}
									className="mySwiper"
									breakpoints={{
										1650: {
											slidesPerView: 5,
										},
										1100: {
											slidesPerView: 3,
										},
										700: {
											slidesPerView: 2,
										},
										100: {
											slidesPerView: 1,
										},
									}}
								>
									{tokens?.tokensOfUser?.map((token: any) => {
										return (
											<SwiperSlide>
												<Link
													href={
														'/collections/' +
														bottle.address +
														'/token/' +
														token.id
													}
												>
													<div
														className="h-52 relative w-52 w-[50%] flex flex-col rounded-md overflow-hidden items-center lg:ml-[20%] sm:ml-[20%] ml-[25%] 2xl:ml-[25%] xl:ml-[30%] cursor-pointer rounded-md "
														onClick={(e) => {
															e.preventDefault();
															setToken({
																id: token.id,
																name: token.name,
																image: token.image,
															});
															show();
														}}
													>
														<img
															src={token.image}
															className="w-52 h-52"
															alt=""
														/>
														<div className="p-4 absolute bottom-0 flex flex-col text-white items-center justify-center z-10">
															{token.name}
														</div>
														<div className="absolute w-full h-full bg-primary opacity-[0.6] z-0"></div>
													</div>
												</Link>
											</SwiperSlide>
										);
									})}
								</Swiper>
							</div>

							<div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full">
								<Link href={`/collections/${address}`}>
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary Raleway font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'hover:text-secondary'
										)}
									>
										View Bottle Info
									</Button>
								</Link>
								<Link href={`/profile/collection/${address}`}>
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary Raleway font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'hover:text-secondary'
										)}
									>
										View All NFTs
									</Button>
								</Link>{' '}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};
