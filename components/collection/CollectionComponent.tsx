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
import { CheckIcon, PlusIcon } from '@heroicons/react/outline';
import { MintModal } from 'components/collection/Modals/MintModal';
import { useConnectWalletModal } from 'hooks/useModalConnect';
import { ProfileApiService } from 'api';
import moment from 'moment';
import { Autoplay, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
	CheckCircleOutlined,
	CheckOutlined,
	DoubleLeftOutlined,
	DoubleRightOutlined,
	LeftCircleFilled,
	LoadingOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { XIcon } from '@heroicons/react/solid';
import NFTDetailIDComponent from './NFTDetail/NFTDetailID';

export const CollectionComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [specs, setSpecs] = React.useState(false);
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
	const [nftView, setNFTView] = React.useState({ id: 0, name: '', image: '' });

	const { connectWallet, Mint } = useMetamask();

	const { approveBottle, mint } = useMagicLink();

	const { modal, show: showConnect } = useConnectWalletModal();

	const {
		Modal: ModalArtist,
		isShow: isShowArtist,
		show: showArtist,
		hide: hideArtist,
	} = useModal();
	const {
		Modal: ModalBottle,
		isShow: isShowBottle,
		show: showBottle,
		hide: hideBottle,
	} = useModal();

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
		console.log('screen', screen);
	}, [screen]);

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

					const price = await contractInstance.methods.usdPrice().call();

					console.log(
						bottleContract,
						tokensInSell,
						parseInt(price) / 1000000,
						'wtf'
					);
					setBottle({
						...item,
						price: parseInt(price) / 1000000,
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
					setSelected(
						new Array(item.metadata.length)
							.fill(false)
							.map((token, i) => {
								return { value: false, id: item.metadata[i]?.id };
							})
							.filter((item) => !tokensInSell.includes(item.id.toString()))
					);
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

	// const getNFTsOneBottle = async () => {
	// 	// console.log(tokensMetadata, 'metadata');
	// 	setIsLoading(true);
	// 	bottles.map(async (item, index) => {
	// 		console.log(item, (bottleContract as string).toLowerCase(), 'compare');
	// 		if (
	// 			item.address.toLowerCase() == (bottleContract as string).toLowerCase()
	// 		) {
	// 			setBottle(item);
	// 		}
	// 	});
	// 	setIsLoading(false);
	// };

	// React.useEffect(() => {
	// 	getNFTsOneBottle();
	// }, [bottleContract, bottles, address]);

	const video = React.useRef<any>(null);

	const { Modal, isShow, show: showCongratsModal, hide } = useModal();

	const show = () => {
		setScreen('pay');
	};

	const showCongrats = () => {
		showCongratsModal();
	};

	const isSelected = () => {
		let value = false;
		selected.forEach((item: any) => {
			if (item?.value) {
				value = true;
			}
		});
		return value;
	};

	const selectedNFTs = () => {
		let value = 0;
		selected.forEach((item: any) => {
			if (item?.value) {
				value++;
			}
		});
		return value;
	};

	console.log(selected);

	const selectAll = () => {
		setSelected((prev: any[]) =>
			prev.map((status, id) => {
				return {
					value: true,
					id: status.id,
				};
			})
		);
	};

	const selectNone = () => {
		setSelected((prev: any[]) =>
			prev.map((status, id) => {
				return {
					value: false,
					id: status.id,
				};
			})
		);
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
				<ModalBottle isShow={isShowBottle} hasBg>
					<div className="min-h-[100vh] flex flex-col items-center justify-center  w-full mt-28 mb-20">
						<div className="pb-4 w-full flex justify-between px-6 text-secondary">
							<div
								className="font-bold md:text-xl text-md mb-4 cursor-pointer"
								onClick={() => {
									hideBottle();
								}}
							>
								<LeftCircleFilled />
								Back to to {bottle?.name}
							</div>
							<XIcon
								className=" w-5 h-5 cursor-pointer"
								onClick={() => {
									hideBottle();
								}}
							></XIcon>
						</div>
						<div className="flex xl:flex-row flex-col justify-between w-full gap-10">
							<div className="flex flex-col  pt-10 gap-4 border-secondary px-8 shrink-0 xl:w-1/2 w-full">
								<h3 className="text-white text-2xl font-bold text-center Raleway">
									Physical asset backing up this collection
								</h3>
								<div className="p-2 relative border-white bg-gray-900 border-4 border-primary rounded-md flex items-center justify-center">
									<img
										src={bottle.image}
										alt=""
										className={clsx('md:h-[400px] h-[300px]')}
									/>
								</div>
							</div>
							<div className="flex flex-col w-full gap-8 text-white">
								<div className="flex flex-col">
									{bottle.content?.title && (
										<h2 className="md:text-2xl text-xl text-secondary font-bold text-left">
											{bottle?.content?.title}
										</h2>
									)}
									{bottle?.content?.caption && (
										<caption className="text-sm text-white w-full text-left">
											{bottle?.content?.caption}
										</caption>
									)}
								</div>
								{bottle?.content?.paragraphs &&
									bottle?.content?.paragraphs.map((item: any, index: any) => {
										return (
											<p
												key={'paragraph-' + index}
												className="text-md font-bold text-justify"
											>
												{item}
											</p>
										);
									})}
							</div>
						</div>
						{bottle.content && (
							<div
								className={clsx(
									'flex flex-col justify-between py-4 w-full gap-4'
								)}
							>
								<h2 className="text-md w-full text-white text-center RalewayBold font-bold">
									{bottle.bottle_name}
								</h2>

								<div
									className={clsx(
										'w-full h-full flex flex-wrap gap-4 items-center justify-center relative'
									)}
								>
									{bottle.content.caracteristics.map(
										(item: any, index: any) => {
											return (
												<div
													key={'caracteristic-' + index}
													className="flex xl:flex-row flex-col items-center justify-start w-36 gap-4"
												>
													<div className="flex items-center justify-center w-[20px]">
														<img
															className="max-w-[16px] max-h-12"
															src={item.icon}
															alt=""
														/>
													</div>
													<p className="xl:text-[14px] text-[12px] text-white text-center font-bold w-full">
														{item.caption}
													</p>
												</div>
											);
										}
									)}
								</div>
								<div className="text-xl text-white py-6 w-full text-center">
									Asset securely stored at the Hillington facility of{' '}
									<a
										href="https://www.lcb.co.uk"
										target="_blank"
										className="text-secondary"
									>
										London City Bond Ltd
									</a>
									, a leading provider of wine and spirit storage solutions.{' '}
								</div>
								<h2 className="text-md w-full text-white text-center RalewayBold font-bold relative">
									Look at it in{' '}
									<a
										className="text-secondary"
										target="_blank"
										href={bottle.litepaper}
									>
										WhiskyStats
									</a>
								</h2>
							</div>
						)}
					</div>
				</ModalBottle>
				<ModalArtist isShow={isShowArtist} hasBg>
					<div className="min-h-[100vh] flex flex-col items-center justify-center w-full mt-28 relative">
						<div className="pb-4 w-full flex justify-between px-6">
							<div
								className="font-bold md:text-xl text-md mb-4  flex items-center justify-center gap-2 text-secondary cursor-pointer"
								onClick={() => {
									hideArtist();
								}}
							>
								<LeftCircleFilled /> Back to {bottle?.name}
							</div>
							<XIcon
								className="text-secondary w-5 h-5 cursor-pointer"
								onClick={() => {
									hideArtist();
								}}
							></XIcon>
						</div>
						<div className="flex rounded-xl flex-col items-center w-full border-4 border-primary py-10 xl:px-16 lg:px-8 gap-4 transition-all duration-1000">
							<div className="flex flex-col items-center  w-full gap-4">
								<div className="w-4/5 gap-4 flex flex-col items-center justify-center">
									{' '}
									<div className="flex flex-col w-full transition-all duration-1000">
										<h2 className="text-center font-bold text-2xl text-white">
											{bottle?.artist?.name}
										</h2>

										<caption className="text-center text-sm text-white">
											Collection Artist
										</caption>

										<div className="flex flex-col w-full items-center justify-center gap-2 mt-2 transition-all duration-1000">
											{bottle?.artist?.paragraphs.map((paragraph: any) => {
												return (
													<ParagraphArtist
														title={paragraph.title}
														text={paragraph.text}
													/>
												);
											})}
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
												{bottle?.artist?.photo.map((photo: any) => (
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
										{bottle?.artist?.social_media && (
											<div className="flex items-center gap-6 justify-center p-4">
												{bottle.artist?.social_media?.map((item: any) => (
													<a target="_blank" href={item.link} className="h-8">
														<img className="h-8" src={item.icon} alt="" />
													</a>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</ModalArtist>
				{/* <img
					src="/img/bg_membership.jpg"
					className="fixed h-full w-full"
					alt=""
				/> */}
				{!isLoading && bottle && bottle.address ? (
					<div className="flex justify-center items-start w-full">
						<div
							className={clsx(
								{ ['!pt-20']: screen == 'nft' },
								'min-h-screen  flex flex-col gap-4 items-center pt-32 pb-10 w-full md:px-8 px-2 justify-start relative'
							)}
						>
							{screen !== 'nft' && (
								<div className="flex justify-between w-full">
									<Link
										href={
											bottle.metadata.length > 1 ? '/collections' : '/singles'
										}
									>
										<div className="font-bold md:text-xl text-md mb-4  text-white cursor-pointer">
											Back to{' '}
											{bottle.metadata.length > 1 ? 'Collections' : 'Singles'}
										</div>
									</Link>
								</div>
							)}

							<>
								<div
									className={clsx(
										{
											['!w-full !border-none']:
												bottle && bottle.metadata.length > 0 && screen == 'pay',
										},
										'flex rounded-xl lg:flex-row flex-col justify-center w-full border-secondary py-8 h-full'
									)}
								>
									{screen == 'menu' && (
										<div className="flex flex-col gap-6 items-center px-2 xl:w-[450px] lg:w-[350px] shrink-0 w-full h-full relative lg:pr-8 lg:min-h-[100vh] pt-12">
											<div className="flex flex-col gap-6 items-center shrink-0 w-full relative lg:sticky lg:top-24">
												<h2 className="text-3xl text-white font-bold text-center">
													{bottle.name}
												</h2>
												<div className="flex flex-col">
													{priceMATIC !== 0 ? (
														<h2 className="text-white">
															<span className="text-secondary font-bold">
																{priceMATIC?.substring(
																	0,
																	priceMATIC?.indexOf('.') + 3
																)}{' '}
																MATIC
															</span>{' '}
															per NFT
														</h2>
													) : (
														<LoadingOutlined className="text-secondary text-xl" />
													)}
												</div>
												<div className="flex lg:flex-col items-center justify-center sm:flex-row flex-col gap-10 w-full">
													<div className="lg:w-[250px] gap-2 gap-4 items-center justify-center flex flex-col">
														<Swiper
															slidesPerView={1}
															autoplay={{
																delay: 2500,
																disableOnInteraction: false,
															}}
															spaceBetween={10}
															className="lg:inline-block hidden"
															modules={[Zoom, Autoplay]}
														>
															{bottle?.artist?.photo.map((photo: any) => (
																<SwiperSlide>
																	<img
																		className="border w-full borderMain rounded-xl bg-gray-900 "
																		src={photo}
																		alt=""
																	/>
																</SwiperSlide>
															))}
														</Swiper>
														<h2 className="text-center font-bold text-2xl text-white lg:inline-block hidden">
															{bottle?.artist?.name}
														</h2>
														<Button
															className={clsx(
																'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-white text-[14px] transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
																'!rounded-full hover:text-secondary w-40'
															)}
															onClick={() => showArtist()}
														>
															Artist Info
														</Button>
													</div>

													<div className="lg:w-[250px] flex flex-col gap-2 relative rounded-md flex items-center justify-center">
														<img
															src={bottle.image}
															alt=""
															className={clsx(
																'sm:w-[200px] lg:inline-block hidden',
																{
																	['absolute top-0 opacity-[0.15]']: specs,
																}
															)}
														/>
														<h2 className="text-center font-bold text-xl text-white lg:inline-block hidden">
															Physical asset backing up the collection
														</h2>
														<Button
															className={clsx(
																'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-white text-[14px] transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
																'!rounded-full hover:text-secondary w-40'
															)}
															onClick={() => showBottle()}
														>
															Bottle Info
														</Button>
													</div>
												</div>
											</div>
										</div>
									)}
									{/* <video
										src={bottle.image}
										autoPlay
										loop
										className="rounded-xl border-white h-auto md:w-2/3 w-full"
										ref={video}
									></video> */}
									<div className="flex flex-col gap-4 w-full">
										{screen !== 'nft' && (
											<div className="flex xl:flex-row flex-col gap-10 pt-6 pl-10 items-center justify-between">
												<h2 className="text-white  Montserrat  font-bold text-xl">
													{selectedNFTs() > 0 ? (
														<p>
															<span className="text-secondary">
																{selectedNFTs()}
															</span>{' '}
															NFT{selectedNFTs() > 1 && 's'} Selected
														</p>
													) : (
														'Select the NFTs you want to buy'
													)}
												</h2>
												<div className="flex gap-4 items-center">
													<h2 className="text-md text-white">
														{selected.length > 0 &&
														selected.reduce(
															(acc: any, { value }: any) => value && acc
														)
															? 'Unselect All'
															: 'Select All'}
													</h2>
													<div
														className={clsx(
															{
																['bg-secondary']:
																	selected.length > 0 &&
																	selected.reduce(
																		(acc: any, { value }: any) => value && acc
																	),
															},
															'w-6 h-6 rounded-md border-[2px] border-secondary flex items-center justify-center p-1 cursor-pointer text-white'
														)}
														onClick={
															selected.length > 0 &&
															selected.reduce(
																(acc: any, { value }: any) => value && acc
															)
																? () => selectNone()
																: () => selectAll()
														}
													>
														{selected.length > 0 &&
														selected.reduce(
															(acc: any, { value }: any) => value && acc
														) ? (
															<CheckOutlined />
														) : (
															''
														)}
													</div>
												</div>
											</div>
										)}
										{bottle &&
										bottle.metadata.length > 0 &&
										screen == 'menu' ? (
											<div className="flex xl:flex-row flex-col-reverse xl:items-start items-center  border-secondary w-full xl:max-h-[100vh] xl:overflow-auto">
												<div className="flex flex-col gap-4 items-center md:px-4 w-full">
													<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 py-10">
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
																		setNFTView={setNFTView}
																		setScreen={setScreen}
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
													{bottle.metadata.filter((token: any) => token.sold)
														.length > 0 && (
														<h2 className="w-full text-center py-4 text-2xl text-white RalewayBold">
															NFTs Sold
														</h2>
													)}
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
																		setScreen={setScreen}
																		setNFTView={setNFTView}
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
										  screen == 'nft' ? (
											<NFTDetailIDComponent
												data={
													nftView
														? {
																...nftView,
														  }
														: { image: '', name: '' }
												}
												address={bottle.address}
												id={nftView ? nftView.id : 1}
												back={() => setScreen('menu')}
												selected={
													selected.filter((item: any) => {
														return item.id == nftView.id;
													})[0]?.value
												}
												addCart={() => {
													setSelected((prev: any[]) =>
														prev.map((status) =>
															nftView.id == status.id
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
								</div>
							</>
						</div>
					</div>
				) : (
					<Loading />
				)}
				{!isLoading && screen !== 'pay' && selected.length > 0 && isSelected() && (
					<div className="sticky flex justify-end w-full pb-4 bottom-0 px-4 z-[1000]">
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
	setScreen,
	setNFTView,
	setSelected,
	selected,
	big,
}: any) => {
	const { Modal, isShow, show, hide } = useModal();

	const [hover, setHover] = React.useState(false);

	return (
		<>
			<Modal isShow={isShow} hasBg>
				<div className="min-h-[100vh] flex flex-col items-center justify-center w-full">
					<div className="min-h-[50vh] rounded-md p-6 2xl:min-w-[50vw] min-w-full">
						<div className="flex justify-between mb-4 w-1/2">
							<button
								className="text-white font-bold cursor-pointer border-none outline-none"
								onClick={hide}
							>
								<XIcon className="text-white" />
							</button>
						</div>
						<div className="flex gap-8 h-full items-center justify-center w-full">
							{token.image && (
								<img
									src={token.image}
									onClick={active ? () => setSelected() : undefined}
									className="max-h-[80vh] w-full md:max-w-[400px] max-w-[600px] shrink-0 rounded-xl border-white"
									alt=""
								/>
							)}
							{token.animation_url && (
								<video
									src={token.animation_url}
									onClick={active ? () => setSelected() : undefined}
									className="max-h-[80vh] w-full md:max-w-[400px] max-w-[600px] shrink-0 rounded-xl border-white"
									autoPlay
									loop
								/>
							)}
						</div>
					</div>
				</div>
			</Modal>

			{/* <Link href={'/bottle/' + bottle.address + '/token/' + token.id}> */}
			<div
				className={clsx(
					'relative border-secondary rounded-md flex flex-col items-center justify-center bg-primary md:w-52 w-36 cursor-pointer border',
					{
						['opacity-50']: !active,
						[' hover:scale-105 duration-300 transition-all']: active,
						['!md:w-96 w-52']: big,
					}
				)}
				onMouseOver={() => {
					setHover(true);
				}}
				onMouseLeave={() => {
					setHover(false);
				}}
				// onClick={
				// 	active
				// 		? () => {
				// 				setScreen('nft');
				// 				setNFTView(token);
				// 		  }
				// 		: undefined
				// }
			>
				{token.image && (
					<img
						src={token.image}
						onClick={() => {
							setScreen('nft');
							setNFTView(token);
						}}
						className={clsx(
							{ ['md:!w-96 !w-52']: big },
							'w-full rounded-md  cursor-pointer'
						)}
						alt=""
					/>
				)}
				{token.animation_url && (
					<video
						src={token.animation_url}
						onClick={
							active
								? () => {
										setScreen('nft');
										setNFTView(token);
								  }
								: undefined
						}
						className={clsx(
							{ ['!md:w-96 !md:h-auto']: big },
							'rounded-md w-full  cursor-pointer'
						)}
						autoPlay
						loop
					/>
				)}
				<div className="flex justify-between items-center w-full px-2">
					<h2
						className="text-left text-white font-bold md:text-[15px] text-[13px] cursor-pointer md:py-4 py-2"
						onClick={
							active
								? () => {
										setScreen('nft');
										setNFTView(token);
								  }
								: undefined
						}
					>
						{token.name}
					</h2>
					{selected && active ? (
						<div
							className="p-1 rounded-full bg-green-600 w-6 h-6 text-white cursor-pointer z-10"
							onClick={
								active
									? (e) => {
											e.preventDefault();
											setSelected();
									  }
									: undefined
							}
						>
							<CheckIcon />
						</div>
					) : (
						active && (
							<div
								className="p-1 rounded-full bg-gray-900 w-6 h-6 text-white cursor-pointer z-10"
								onClick={
									active
										? (e) => {
												e.preventDefault();
												setScreen('menu');
												setSelected();
										  }
										: undefined
								}
							>
								<PlusIcon />
							</div>
						)
					)}
				</div>
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
				<p className="text-white font-bold text-center text-lg my-2 w-full">
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
