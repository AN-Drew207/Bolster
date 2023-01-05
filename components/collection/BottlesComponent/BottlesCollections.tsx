import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
// import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
// import bottles from 'bottles.json';

export const CollectionsLandingComponent = () => {
	const { bottles: bottlesView } = useSelector((state: any) => state.state);
	console.log(bottlesView, 'botellas');
	return (
		<div className="flex flex-col bg-overlay px-32 pb-48 pt-16 gap-12 min-h-[100vh]">
			<h2 className="RalewayBold text-xl text-secondary">Backed Collections</h2>
			<div className="flex flex-wrap gap-10 items-center justify-center w-full">
				{bottlesView.map(
					(
						{
							address,
							name,
							image,
							exchanged,
							supply,
							maxSupply,
							metadata,
						}: any,
						index: number
					) => {
						return (
							<BottleItem
								address={address}
								name={name}
								image={image}
								exchanged={exchanged}
								supply={supply}
								nfts={metadata}
								maxSupply={maxSupply}
								index={index}
							/>
						);
					}
				)}
			</div>
		</div>
	);
};

export const BottleItem = ({ address, name, video, nfts }: any) => {
	const videoRef = React.useRef<any>(null);

	const handleVideo = () => {
		videoRef?.current?.play();
	};

	console.log(nfts);

	React.useEffect(() => {
		handleVideo();
	}, [video]);
	return (
		<Link href={`/collections/${address}`}>
			<div className="sm:w-[400px] w-[320px] flex flex-col border rounded-xl overflow-hidden shadow-xl cursor-pointer border-gray-800 hover:scale-105 transition-all duration-500">
				<div className="rounded-xl bg-overlay relative border border-secondary z-10 cursor-pointer">
					<div className="w-full flex justify-center p-4 rounded-xl overflow-hidden">
						<div className="w-full">
							<Swiper
								loop={true}
								autoplay={
									nfts.length > 1
										? { delay: 6000, disableOnInteraction: false }
										: {}
								}
								modules={nfts.length > 1 ? [Autoplay] : []}
								className="mySwiper"
							>
								{nfts.map((item: any) => {
									return (
										<SwiperSlide>
											<div className="w-full min-h-full">
												{item.image && (
													<img
														src={item.image}
														className="min-w-full w-full"
														alt=""
													/>
												)}
												{item.animation_url && (
													<video
														src={item.animation_url}
														className="min-w-full w-full"
														autoPlay
														loop
													/>
												)}
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center bg-primary justify-center text-xl text-center font-bold text-secondary h-20 p-4">
					<h3 className="flex items-center justify-center text-xl text-center font-bold">
						{name}
					</h3>{' '}
				</div>
			</div>
		</Link>
	);
};
