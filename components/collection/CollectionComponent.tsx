/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import BottleCollectionABI from '../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../contracts/BottleExchange.json';
import ERC20ABI from '../../contracts/ERC20.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from './MintComponents';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Styles from '../landing/styles.module.scss';
import { State, updateState, updateTokensOfUser } from 'redux/actions';
import { multiply } from 'components/common/multiply';
import { Loading } from 'components/landing/loadingComponent';
import useMagicLink from 'hooks/useMagicLink';
import { useForm } from 'react-hook-form';
import { useMetamask } from 'hooks/useMetamask';
import { CheckIcon } from '@heroicons/react/outline';
import { MintModal } from 'components/collection/Modals/MintModal';
import { useConnectWalletModal } from 'hooks/useModalConnect';
import { ProfileApiService } from 'api';
import moment from 'moment';
import { Autoplay, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

export const CollectionComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [minted, setMinted] = React.useState(false);
	const [bottle, setBottle] = React.useState<any>({});
	const [selected, setSelected] = React.useState<any>([]);
	const [web3, setWeb3] = React.useState<any>(null);
	const [accounts, setAccounts] = React.useState<any>(null);
	const [quantity, setQuantity] = React.useState<any>(0);
	const [maxSupply, setMaxSupply] = React.useState<any>(-1);
	const [priceUSD, setPriceUSD] = React.useState<any>(0);
	const [balance, setBalance] = React.useState<any>(0);
	const [priceMATIC, setPriceMATIC] = React.useState<any>(0);
	const [message, setMessage] = React.useState('');
	const [screen, setScreen] = React.useState('menu');

	const { connectWallet, Mint } = useMetamask();

	const { approveBottle, mint } = useMagicLink();

	const { modal, show: showConnect } = useConnectWalletModal();

	const dispatch = useDispatch();

	const {
		id: bottleContract,
		modal: modalShow,
		offer: offerShow,
	} = useRouter().query;
	const { network, address, networkName, bottles, typeOfWallet } = useSelector(
		(state: { state: State }) => state.state
	);

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

		const priceUSD = await contractInstance.methods.usdPrice().call();
		const decimalsUSD = await contractInstance.methods.decimalsUSD().call();
		const priceMATIC = await contractInstance.methods.getPrice(1).call();
		setPriceUSD(priceUSD / 10 ** decimalsUSD);
		setQuantity(currentSupply);
		setPriceMATIC(Web3.utils.fromWei(priceMATIC, 'ether').substring(0, 8));
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
	};

	React.useEffect(() => {
		if (bottleContract !== undefined) {
			updateData('');

			bottles.map(async (item, index) => {
				console.log(item, bottleContract as string, 'compare');
				if (item.address == bottleContract) {
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

					const tokensInSell = await contractInstance.methods
						.getTokensMinted()
						.call();

					console.log(bottleContract, tokensInSell, 'wtf');
					setBottle({
						...item,
						metadata: item.metadata.map((item: any, i: any) => {
							if (!item.id) {
								return {
									...item,
									sold: false,
								};
							} else {
								return {
									...item,
									sold: tokensInSell.includes(item.id.toString()),
								};
							}
						}),
					});
				}
			});
		}
	}, [bottleContract, bottles, minted]);

	React.useEffect(() => {
		if (modalShow && typeOfWallet == 'metamask') {
			connectWallet({
				setIsLoading,
				network,
				setWeb3,
				setAccounts,
				updateData,
				show,
			});
		} else if (modalShow && typeOfWallet == 'magic') {
			show();
		} else if (modalShow) {
			toast.error('Please connect your wallet before minting', {
				duration: 3000,
			});
			showConnect();
		}
	}, [modalShow]);

	const getNFTsOneBottle = async () => {
		// console.log(tokensMetadata, 'metadata');
		setIsLoading(true);
		bottles.map(async (item, index) => {
			console.log(item, (bottleContract as string).toLowerCase(), 'compare');
			if (
				item.address.toLowerCase() == (bottleContract as string).toLowerCase()
			) {
				setBottle(item);
				setSelected(
					new Array(item.metadata.length).fill(false).map((token, i) => {
						return { value: false, id: item.metadata[i]?.id };
					})
				);
			}
		});
		setIsLoading(false);
	};

	React.useEffect(() => {
		getNFTsOneBottle();
	}, [bottleContract, bottles, address]);

	const video = React.useRef<any>(null);

	const { Modal, isShow, show: showCongratsModal, hide } = useModal();

	const show = () => {
		setScreen('pay');
	};

	const showCongrats = () => {
		showCongratsModal();
	};

	return (
		<>
			{modal}
			<div
				className={clsx(
					'min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-primary flex flex-col items-center pt-0 w-full',
					'relative',
					isLoading || !bottle.address ? 'justify-center' : 'justify-start'
				)}
			>
				<Modal isShow={isShow} hasBg>
					<div
						className={clsx(
							'flex flex-col items-center w-full h-full sm:px-10 px-4 pb-10 relative mt-24 min-h-[100vh]'
						)}
					>
						<div
							className="flex justify-start text-white w-full"
							onClick={() => hide()}
						>
							{' '}
							<Button>Back</Button>
						</div>
						<div className="py-24 flex flex-col items-center gap-16 w-full">
							<div className="flex flex-col gap-6 w-1/2">
								<h2 className="text-white RalewayBold text-4xl text-center">
									Congratulations!
								</h2>
								<p className="text-white Montserrat text-xl text-center">
									You have bought a Bolster NFT, now you are part of Bolster and
									you can participate in our events, airdrops and much more!
								</p>
							</div>
							<img src="/icons/logo.png" className="w-1/2" alt="" />
						</div>
					</div>
				</Modal>
				{/* <img
					src="/img/bg_membership.jpg"
					className="fixed h-full w-full"
					alt=""
				/> */}
				{!isLoading && bottle && bottle.address ? (
					<div className="flex justify-center items-start w-full ">
						<div
							className={clsx(
								'min-h-screen  flex flex-col gap-4 items-center pt-32 pb-10 xl:w-[95%] w-full xl:px-0 px-8 justify-start relative'
							)}
						>
							<div className="flex justify-between w-full">
								<Link href="/collections">
									<div className="font-bold md:text-xl text-md mb-4  text-white cursor-pointer">
										Back to Collections
									</div>
								</Link>
							</div>

							<>
								<div
									className={clsx(
										{
											['!w-full !border-none']:
												bottle && bottle.metadata.length > 0 && screen == 'pay',
										},
										'flex rounded-xl flex-col items-center justify-center w-full border-secondary py-8'
									)}
								>
									{screen == 'menu' && (
										<>
											<h2 className="text-3xl text-white font-bold pb-4">
												{bottle.name}
											</h2>
											<div className="flex rounded-xl 2xl:flex-row flex-col-reverse items-center 2xl:justify-between w-full border-4 border-primary py-10 xl:px-16 px-8 gap-4 transition-all duration-1000">
												<div className="xl:w-2/5 w-4/5 gap-4 flex flex-col items-center justify-center">
													{' '}
													<div className="flex flex-col w-full transition-all duration-1000">
														<h2 className="text-center font-bold text-2xl text-white">
															{bottle.artist.name}
														</h2>
														<caption className="text-center text-sm text-white">
															Collection Artist
														</caption>
														<div className="flex flex-col w-full items-center justify-center gap-2 mt-2 transition-all duration-1000">
															{bottle.artist.paragraphs.map(
																(paragraph: any) => {
																	return (
																		<ParagraphArtist
																			title={paragraph.title}
																			text={paragraph.text}
																		/>
																	);
																}
															)}
														</div>
													</div>
													<div className="2xl:w-[400px] w-[300px] gap-6 flex flex-col items-center justify-center rounded-xl overflow-hidden bg-gray-900">
														<div className="2xl:w-2/3 w-full flex items-center justify-center rounded-xl overflow-hidden bg-gray-900">
															<Swiper
																slidesPerView={1}
																autoplay={{
																	delay: 2500,
																	disableOnInteraction: false,
																}}
																spaceBetween={10}
																modules={[Zoom, Autoplay]}
															>
																{bottle.artist.photo.map((photo: any) => (
																	<SwiperSlide>
																		<img
																			className="border w-full borderMain rounded-xl bg-gray-900"
																			src={photo}
																			alt=""
																		/>
																	</SwiperSlide>
																))}
															</Swiper>
														</div>
														{bottle.artist.social_media && (
															<div className="flex items-center gap-6 justify-center p-4">
																{bottle.artist?.social_media?.map(
																	(item: any) => (
																		<a
																			target="_blank"
																			href={item.link}
																			className="h-8"
																		>
																			<img
																				className="h-8"
																				src={item.icon}
																				alt=""
																			/>
																		</a>
																	)
																)}
															</div>
														)}
													</div>
												</div>
												<div className="flex flex-col  pt-10 gap-4 border-secondary px-8 shrink-0 xl:w-1/2 w-4/5">
													<h3 className="text-white text-2xl font-bold text-center Raleway">
														Physical asset backing up the floor price for this
														collection
													</h3>
													<div className="p-2 border-white bg-gray-900 border-4 border-primary rounded-md flex items-center justify-center">
														<img
															src={bottle.image}
															alt=""
															className="h-[400px]"
														/>
													</div>
													<div className="flex gap-10 items-center justify-center">
														<a
															href={bottle.litepaper}
															target="_blank"
															className="flex items-center justify-center"
														>
															<Button
																className={clsx(
																	'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
																	'!rounded-full hover:text-secondary w-64'
																)}
															>
																Asset Especifications
															</Button>
														</a>
														{/* <Button
															className={clsx(
																'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
																'!rounded-full hover:text-secondary w-64'
															)}
														>
															Collection Options
														</Button> */}
													</div>
												</div>
											</div>
										</>
									)}
									{/* <video
										src={bottle.image}
										autoPlay
										loop
										className="rounded-xl border-white h-auto md:w-2/3 w-full"
										ref={video}
									></video> */}

									{bottle && bottle.metadata.length > 0 && screen == 'menu' ? (
										<div className="flex xl:flex-row flex-col-reverse xl:items-start items-center  border-secondary w-full">
											<div className="flex flex-col gap-4 items-center px-8 w-full">
												<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 p-4 py-10">
													{bottle.metadata
														.filter((token: any) => !token.sold)
														.map((token: any, i: any) => {
															return (
																<CollectionNFTItem
																	big={
																		bottle.metadata.filter(
																			(token: any) => !token.sold
																		).length == 1
																	}
																	active={true}
																	token={token}
																	network={network}
																	networkName={networkName}
																	bottle={bottle}
																	setBottle={setBottle}
																	setIsLoading={setIsLoading}
																	typeOfWallet={typeOfWallet}
																	selected={
																		selected.filter((item: any) => {
																			return item.id == token.id;
																		})[0]?.value
																	}
																	setSelected={() => {
																		setSelected((prev: any[]) =>
																			prev.map((status) =>
																				token.id == status.id
																					? {
																							value: !status.value,
																							id: status.id,
																					  }
																					: {
																							value: status.value,
																							id: status.id,
																					  }
																			)
																		);
																	}}
																/>
															);
														})}
												</div>
												<h2 className="w-full text-center py-4 text-2xl text-white RalewayBold">
													NFTs Bought
												</h2>
												<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 p-4 py-10">
													{bottle.metadata
														.filter((token: any) => token.sold)
														.map((token: any, i: any) => {
															return (
																<CollectionNFTItem
																	active={false}
																	token={token}
																	network={network}
																	networkName={networkName}
																	bottle={bottle}
																	setBottle={setBottle}
																	setIsLoading={setIsLoading}
																	typeOfWallet={typeOfWallet}
																	selected={
																		selected.filter((item: any) => {
																			return item.id == token.id;
																		})[0]?.value
																	}
																	setSelected={() => {
																		setSelected((prev: any[]) =>
																			prev.map((status, id) =>
																				token.id == status.id
																					? {
																							value: !status.value,
																							id: status.id,
																					  }
																					: {
																							value: status.value,
																							id: status.id,
																					  }
																			)
																		);
																	}}
																/>
															);
														})}
												</div>
											</div>
										</div>
									) : bottle &&
									  bottle.metadata.length > 0 &&
									  screen == 'pay' ? (
										<div
											className={clsx(
												'flex flex-col items-center justify-center w-full h-full relative border-secondary rounded-xl'
											)}
										>
											<MintModal
												priceusd={priceUSD}
												priceMATIC={priceMATIC}
												allowance={bottle.allowance}
												quantity={selected.filter((q: any) => q.value).length}
												bottle={bottle}
												hide={() => setScreen('menu')}
												approve={(address: any) => {
													if (typeOfWallet !== 'metamask') {
														approveBottle(dispatch, bottleContract, address);
													}
												}}
												selected={selected}
												typeOfWallet={typeOfWallet}
												Mint={async (data: any, address: any) => {
													delete data.currency;
													// data.id = 3;
													data.created_at = moment().format(
														'YYYY-MM-DD hh:mm:ss'
													);
													data.updated_at = moment().format(
														'YYYY-MM-DD hh:mm:ss'
													);
													data.deleted_at = null;

													if (typeOfWallet == 'metamask') {
														console.log('meta');
														await Mint(
															selected
																.map((value: any, id: number) => {
																	return {
																		value: value.value,
																		id: value.id,
																	};
																})
																.filter((q: any) => q.value)
																.map((nft: any) => nft.id),
															address,
															setIsLoading,
															bottleContract,
															setMessage,
															// accounts,
															dispatch,
															network,
															networkName,
															hide,
															showCongrats,
															setMinted,
															data
														);
													} else {
														await mint(
															bottleContract,
															selected
																.map((value: any, id: number) => {
																	return {
																		value: value.value,
																		id: value.id,
																	};
																})
																.filter((q: any) => q.value)
																.map((nft: any) => nft.id),
															address,
															dispatch,
															setMessage,
															hide,
															showCongrats,
															setMinted,
															data
														);
													}
													window.location.reload();
													setScreen('menu');
												}}
												currencies={[
													{
														name: 'USDC',
														value: process.env.NEXT_PUBLIC_USDC_ADDRESS,
														image: '/img/usd-coin-usdc-logo.png',
													},
													{
														name: 'MATIC',
														value: process.env.NEXT_PUBLIC_WMATIC_ADDRESS,
														image: '/img/polygon-matic-logo.png',
													},
												]}
												quantityMinted={quantity}
												maxSupply={maxSupply}
												accounts={accounts}
												isLoading={isLoading}
												show={show}
												connectWallet={connectWallet}
												message={message}
											/>
										</div>
									) : (
										<Loading />
									)}
								</div>
							</>
						</div>
					</div>
				) : (
					<Loading />
				)}
				{!isLoading &&
					screen !== 'pay' &&
					selected.length > 0 &&
					selected?.reduce((item: boolean, acc: boolean) => acc || item) && (
						<div className="sticky flex justify-end w-full pb-4 bottom-0 px-4">
							<div
								className="bottom-4 right-2 py-2 px-4 font-bold rounded-md border-secondary bg-secondary cursor-pointer text-white hover:text-secondary hover:bg-white transition-all duration-500"
								onClick={() => {
									if (address) {
										show();
									} else {
										showConnect();
										toast.error('Please connect your wallet to mint');
									}
								}}
							>
								Buy NFTs!
							</div>
						</div>
					)}
				<Toaster containerClassName="z-[1000]" />
			</div>
		</>
	);
};

export const CollectionNFTItem = ({
	active,
	network,
	networkName,
	bottle,
	typeOfWallet,
	token,
	setBottle,
	setIsLoading,
	setSelected,
	selected,
	big,
}: any) => {
	const { Modal, isShow, show, hide } = useModal();
	const { transfer } = useMagicLink();
	const { transferMeta } = useMetamask();
	const { handleSubmit } = useForm();
	const [address, setAddress] = useState('');
	return (
		<>
			<Modal isShow={isShow} hasBg>
				<div className="min-h-[100vh] flex flex-col items-center justify-center w-full">
					<div className="min-h-[50vh] rounded-md p-6 2xl:min-w-[50vw] min-w-full">
						<div className="flex justify-between mb-4">
							<div
								className="text-secondary font-bold cursor-pointer"
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
								className="text-secondary font-bold flex items-center gap-2"
							>
								View in{' '}
								<img src="/icons/opensea.svg" className="h-4 w-4" alt="" />
							</a>
						</div>
						<div className="flex gap-8 h-full items-center justify-center">
							<img
								src={token.image}
								className="w-96 shrink-0 rounded-xl border-white"
								alt=""
							/>
							<form
								onSubmit={handleSubmit(() => {
									if (typeOfWallet == 'magic') {
										transfer(
											setBottle,
											bottle.address,
											token.id,
											address,
											hide
										);
									} else {
										transferMeta(
											setBottle,
											bottle.address,
											token.id,
											address,
											hide,
											setIsLoading
										);
									}
								})}
								className="w-full flex flex-col items-center justify-center gap-4"
							>
								<h2 className="text-secondary font-bold text-lg">
									Transfer NFT {token.name}
								</h2>

								<input
									type="text"
									name="address"
									placeholder="Wallet Address to transfer"
									className="rounded-xl w-full"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
								<Button
									className={clsx(
										'z-10 borderborderMain md:text-lg text-sm  py-2 px-6 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
										Styles.button
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
			{/* <Link href={'/bottle/' + bottle.address + '/token/' + token.id}> */}
			<div
				className={clsx(
					'relative border-secondary rounded-md p-4 flex flex-col items-center justify-center w-52',
					{
						['opacity-50']: !active,
						['cursor-pointer hover:scale-105 duration-300 transition-all']:
							active,
						['!w-96']: big,
					}
				)}
				onClick={active ? () => setSelected() : undefined}
			>
				{selected && active && (
					<div className="top-6 right-8 p-1 rounded-full bg-green-600 absolute w-6 text-white ">
						<CheckIcon />
					</div>
				)}
				{token.image && (
					<img
						src={token.image}
						className={clsx(
							{ ['!h-96 !w-96']: big },
							'w-40 h-40 rounded-md border border-white'
						)}
						alt=""
					/>
				)}
				{token.animation_url && (
					<video
						src={token.animation_url}
						className={clsx(
							{ ['!w-96 !h-auto']: big },
							'h-40 rounded-md border border-white'
						)}
						autoPlay
						loop
					/>
				)}
				<h2 className="p-4 text-center text-white font-bold">{token.name}</h2>
			</div>
			{/* </Link> */}
		</>
	);
};

export const ParagraphArtist: React.FC<any> = ({ title, text }) => {
	const [viewMore, setViewMore] = React.useState(false);
	return (
		<>
			{title && (
				<p className="text-white font-bold text-left text-lg my-2 w-full">
					{title}
				</p>
			)}
			{text && (
				<>
					{text.map((text: string, index: number) => (
						<p
							className={clsx(
								{ ['hidden']: index > 0 && !viewMore },
								'text-white text-justify text-md w-full'
							)}
						>
							{text}
						</p>
					))}
					{text.length > 1 && (
						<p
							className={clsx(
								'text-secondary cursor-pointer text-left flex items-center justify-start gap-1 text-sm w-full'
							)}
							onClick={() => {
								setViewMore((prev) => !prev);
							}}
						>
							{!viewMore ? (
								<>
									Read More{' '}
									<DoubleRightOutlined className="!text-primaryOpacity" />
								</>
							) : (
								<>
									Read Less{' '}
									<DoubleLeftOutlined className="!text-primaryOpacity" />
								</>
							)}
						</p>
					)}
				</>
			)}
		</>
	);
};
