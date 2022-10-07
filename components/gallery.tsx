import clsx from 'clsx';
import { Button } from 'components/common/button';
import Link from 'next/link';
import React from 'react';
import Styles from './landing/styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';
import { State } from 'redux/actions';
import BottleCollectionABI from '../contracts/BottleCollection.json';
import { Loading } from 'components/landing/loadingComponent';
import { Zoom, Navigation } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Web3 from 'web3';

export const GalleryComponent: React.FC<any> = () => {
	const { bottles } = useSelector((state: { state: State }) => state.state);
	const [tokens, setTokens] = React.useState<any>([]);
	const [isLoading, setIsLoading] = React.useState<any>(false);

	const getNFTs = async () => {
		setIsLoading(true);
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				: 'localhost:8545'
		);
		const web3 = new Web3(provider);

		let bottle: any;

		let NFTs = [];

		for (let i = 0; i < bottles.length; i++) {
			bottle = new web3.eth.Contract(
				BottleCollectionABI as any,
				bottles[i].address
			);
			const supply = await bottle.methods.supply().call();
			const tokens = new Array(parseInt(supply)).fill(false);

			const tokensMetadata = tokens.map((token: any, index) => {
				return bottles[i].metadata[index];
			});
			NFTs.push(tokensMetadata);
		}
		setTokens(NFTs);
		setIsLoading(false);
	};

	React.useEffect(() => {
		getNFTs();
	}, []);

	return (
		<div className="flex flex-col sm:px-16 px-4 pt-36 w-full min-h-screen relative">
			<img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/>{' '}
			<div className="relative flex flex-col w-full">
				<div className="md:absolute hidden left-0 top-0 font-bold text-xl text-white cursor-pointer">
					<Link href="/?bottles=true">Go To Bottles</Link>
				</div>
				<div className="absolute md:hidden left-0 top-0 font-bold text-xl text-white cursor-pointer">
					<Link href="/?bottles=true">{'Back'}</Link>
				</div>
				<h2 className="textMain font-bold mb-10 text-5xl w-full text-center">
					Gallery
				</h2>
				<div className="flex flex-col gap-10 items-center justify-center w-full pb-10">
					{!isLoading ||
					(bottles.length > 0 && tokens && tokens[0]?.length > 0) ? (
						<>
							{bottles?.map(({ id, address, name, image }, index) => {
								return (
									<BottleNFTs
										id={id}
										address={address}
										name={name}
										video={image}
										tokensOfUser={tokens[index]}
									/>
								);
							})}
						</>
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

export const BottleNFTs = ({ address, name, video, tokensOfUser }: any) => {
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
	return (
		<div className="flex flex-col w-full shadow-xl">
			<div className="flex flex-col rounded-xl bg-overlay border border-white text-xl text-center font-bold text-white md:p-10 sm:p-8 p-4">
				<h3 className="text-3xl text-center font-bold textMain pb-4 w-full">
					{name} NFTs
				</h3>
				<div className="sm:px-6">
					<Swiper
						style={styleArrows}
						slidesPerView={3}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
						zoom={true}
						scrollbar={true}
						navigation={true}
						modules={[Zoom, Navigation]}
						className="mySwiper"
						breakpoints={{
							1300: {
								slidesPerView: 3,
							},
							500: {
								slidesPerView: 2,
							},
							100: {
								slidesPerView: 1,
							},
						}}
					>
						{tokensOfUser?.map((token: any) => {
							return (
								<SwiperSlide>
									<div className="h-80 sm:w-72 w-[50%] flex flex-col items-center lg:ml-[20%] sm:ml-[20%] ml-[25%] 2xl:ml-[25%] xl:ml-[30%]">
										<img src={token.image} className="w-64 h-64" alt="" />
										<div className="p-4 flex flex-col items-center justify-center">
											{token.name}
										</div>
									</div>
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
			</div>
		</div>
	);
};
