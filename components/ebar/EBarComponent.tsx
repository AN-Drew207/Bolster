import clsx from 'clsx';
import { Button } from 'components/common/button';
import Link from 'next/link';
import React, { useState } from 'react';
import Styles from '../landing/styles.module.scss';
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
		<div className="flex flex-col sm:px-16 px-4 pt-36 w-full min-h-screen relative">
			{/* <img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/>{' '} */}
			<div className="relative flex flex-col w-full">
				<div className="md:absolute hidden left-0 top-0 font-bold text-xl text-white cursor-pointer">
					<Link href="/?bottles=true">Go To Bottles</Link>
				</div>
				<div className="absolute md:hidden left-0 top-0 font-bold text-xl text-white cursor-pointer">
					<Link href="/?bottles=true">{'Back'}</Link>
				</div>
				<h2 className="textMain font-bold mb-10 text-5xl w-full text-center">
					eBar
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
										const { id, address, name, image, tokensOfUser } = bottle;
										return (
											tokensOfUser?.length > 0 && (
												<BottleNFTs
													id={id}
													address={address}
													name={name}
													video={image}
													tokensOfUser={tokensOfUser}
													bottle={bottle}
													setExchanged={(value: boolean) => {
														console.log(value);
													}}
												/>
											)
										);
									})}
								</>
							) : (
								<div className="flex items-center justify-center h-[60vh] text-3xl font-bold text-white">
									<h2 className="	p-8 rounded-xl bg-overlay">
										You Don't Have NFTs in your eBar
									</h2>
								</div>
							)}
							{exchangedBottles.length > 0 && (
								<h2 className="text-4xl text-white font-bold w-full text-left ">
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
						<div className="text-center text-2xl text-white font-bold h-[60vh] flex items-center justify-center">
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
			<div className="flex flex-col rounded-xl bg-overlay border-2 border-yellow-400 text-xl text-center font-bold text-white md:p-10 sm:p-8 p-4">
				<h3 className="text-2xl text-center font-bold text-yellow-400 pb-4 w-full">
					{name} Final Art
				</h3>
				<div className="px-6 w-full flex items-center justify-center py-4">
					<img src={image} className="w-96" alt="" />
				</div>

				<div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full">
					<Link href={`/bottle/${id}`}>
						<Button
							className={clsx(
								'z-10 border border-yellow-400 font-bold p-2 text-white transition ease-in-out delay-150 hover:-translate-y-1  hover:scale-110 duration-300'
								// Styles.button
							)}
						>
							View Bottle Info
						</Button>
					</Link>
					<Link href={`/eBar/bottle/${address}`}>
						<Button
							className={clsx(
								'z-10 border border-yellow-400 font-bold p-2 text-white transition ease-in-out delay-150 hover:-translate-y-1  hover:scale-110 duration-300'
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
	setExchanged,
}: any) => {
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

	const { Modal, isShow, show, hide } = useModal();
	const { transfer } = useMagicLink();
	const { transferMeta } = useMetamask();
	const { handleSubmit } = useForm();
	const [addressSent, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tokens, setTokens] = useState({ tokensOfUser });
	const [token, setToken] = useState({ id: 0, image: '', name: '' });

	React.useEffect(() => {
		setTokens({ tokensOfUser });
	}, [tokensOfUser]);

	return (
		<>
			<Modal isShow={isShow} hasBg>
				<div className="min-h-[100vh] flex flex-col items-center justify-center w-full">
					<div className="min-h-[50vh] bg-overlay rounded-md p-6 2xl:min-w-[50vw] min-w-full">
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
								className="text-white font-bold flex items-center gap-2 p-2"
							>
								View in{' '}
								<img src="/icons/opensea.svg" className="h-4 w-4" alt="" />
							</a>
						</div>
						<div className="flex gap-8 h-full items-center justify-center">
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
											setExchanged,
											hide
										);
									} else {
										transferMeta(
											setTokens,
											bottle.address,
											token.id,
											addressSent,
											setExchanged,
											hide,
											setIsLoading
										);
									}
								})}
								className="w-full flex flex-col items-center justify-center gap-4"
							>
								<h2 className="textMain font-bold text-lg">
									Transfer NFT {token.name}
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
										'z-10 borderborderMain md:text-lg text-sm  py-2 px-6 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
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
			<div className={clsx('flex flex-col w-full shadow-xl')}>
				<div
					className={clsx(
						{ ['items-center justify-center']: isLoading },
						'flex flex-col rounded-xl bg-overlay border border-white text-xl text-center font-bold text-white md:p-10 sm:p-8 p-4'
					)}
				>
					{isLoading ? (
						<div className="p-4 flex items-center justify-center text-white text-5xl">
							<LoadingOutlined></LoadingOutlined>
						</div>
					) : (
						<>
							<h3 className="text-2xl text-left font-bold textMain pb-4 w-full">
								{name}
							</h3>
							<div className="sm:px-6">
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
														'/bottle/' + bottle.address + '/token/' + token.id
													}
												>
													<div
														className="h-60 sm:w-40 w-[50%] flex flex-col items-center lg:ml-[20%] sm:ml-[20%] ml-[25%] 2xl:ml-[25%] xl:ml-[30%] cursor-pointer"
														onClick={() => {
															// setToken({
															// 	id: token.id,
															// 	name: token.name,
															// 	image: token.image,
															// });
															// show();
														}}
													>
														<img
															src={token.image}
															className="w-40 h-40"
															alt=""
														/>
														<div className="p-4 flex flex-col items-center justify-center">
															{token.name}
														</div>
													</div>
												</Link>
											</SwiperSlide>
										);
									})}
								</Swiper>
							</div>

							<div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full">
								<Link href={`/bottle/${address}`}>
									<Button
										className={clsx(
											'z-10 border borderMain p-2 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:shadow-button hover:scale-110 duration-300',
											Styles.button
										)}
									>
										View Bottle Info
									</Button>
								</Link>
								<Link href={`/eBar/bottle/${address}`}>
									<Button
										className={clsx(
											'z-10 border borderMain p-2 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:shadow-button hover:scale-110 duration-300',
											Styles.button
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
