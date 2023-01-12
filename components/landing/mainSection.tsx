/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import clsx from 'clsx';
import { Button } from 'components/common/button';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { sendForm } from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Zoom } from 'swiper';
import { title } from 'process';
import { Dropdown } from 'components/common/dropdown/dropdown';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const MainSectionComponent = () => {
	return (
		<div className="min-h-[100vh] pt-28 bg-overlay relative text-secondary flex items-center justify-center w-full relative">
			<div className="w-full flex justify-center items-center absolute h-full overflow-hidden">
				<img
					src="/img/bg1.jpg"
					className="w-full rounded-md min-w-[1920px]"
					alt=""
				/>
			</div>
			<div className="bg-gray-900 opacity-[0.4] absolute h-full w-full"></div>
			<div className="bg-gradient-to-b from-transparent to-gray-900 absolute bottom-0 h-28 w-full"></div>
			<div className="flex gap-10 items-center justify-center w-full  h-full relative text-white">
				<div className="w-2/3 flex flex-col justify-center items-center gap-4 relative">
					<h2 className="text-center w-full lg:text-7xl text-3xl w-full RalewayBold">
						Amazing NFT Projects with Backstop Value.
					</h2>
					<h2 className="Raleway w-full text-center text-md font-thin max-w-[700px]">
						NFTs with peace of mind
					</h2>
					<div className="flex justify-center gap-10">{}</div>
					<div className="flex justify-center gap-10">
						{' '}
						<Button
							className={clsx(
								'z-10 border border-white bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:scale-[120%] duration-300',
								'ml-4'
							)}
							href={'/collections'}
						>
							Explore NFTs
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const OfferComponent = () => {
	const items = [
		{
			text: '',

			iconSVG: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="md:w-12 w-8 md:h-12 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
			),
		},
		{
			iconSVG: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="md:w-12 w-8 md:h-12 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
					/>
				</svg>
			),
			text: 'Your NFTs grant you the legal right to redeem them for a collectable physical asset in the UK',
		},

		{
			text: 'Effortless redemption process',
			iconSVG: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="md:w-12 w-8 md:h-12 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
			),
		},
		{
			text: 'No maintenance or warehousing cost on physical assets',
			subTexts: [
				'No need to worry about the upkeep or storage of physical assets with our service',
				'Enjoy the convenience of not having to worry about maintenance or warehousing costs.',
			],
			iconSVG: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="md:w-12 w-8 md:h-12 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			),
		},
		{
			text: 'Authenticity guarantee on physical assets',
			subTexts: [
				'Backed by our authenticity guarantee: your physical assets are the real deal',
			],
			iconSVG: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="md:w-12 w-8 md:h-12 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
					/>
				</svg>
			),
		},
	];
	return (
		<div className="py-28 bg-gray-900 relative text-secondary flex flex-col gap-24 items-center justify-center w-full">
			<h2 className="text-4xl text-white RalewayBold">Offer</h2>
			<div className="flex flex-wrap gap-10 justify-center w-full">
				{items.map((item) => {
					return (
						<div className="flex flex-col gap-6 md:w-[450px] w-[250px] p-10 border-2 border-secondary rounded-md items-center ">
							<div className="md:p-4 p-2 rounded-md bg-secondary text-white text-xl">
								{item.iconSVG}
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="lg:text-xl text-lg Raleway text-center text-white h-full flex items-center justify-center">
									{item.text}
								</h3>
								{item?.subTexts?.map((item) => (
									<p className="lg:text-lg text-md Raleway text-center text-gray-500 h-full flex items-center justify-center">
										{item}
									</p>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const TestimonialsComponent = () => {
	const items = [
		{
			text: "“I was burned in the past by the fluctuating value of NFTs, but this product's solution to NFT loss of value and volatility has restored my confidence in the market.”",
			name: 'Joe, UK',
			icon: '/img/joe.jpg',
		},
		{
			name: 'Santiago, Spain',
			icon: '/img/santiago.jpg',
			text: '“As a collector, I want to be sure that my NFTs retain their value over time. Bolster’s backstop supported by physical assets provides the stability and security that I need for my collection."',
		},
		{
			name: 'Lucia, Mexico',
			text: `"I was hesitant to invest in NFTs due to their volatility, but this product's backstop supported by physical assets gives me peace of mind knowing that my collection is protected."`,
			icon: '/img/lucia.jpg',
		},
	];
	return (
		<div className="py-28 bg-overlay relative text-secondary w-full flex flex-col gap-10 items-center justify-center overflow-hidden">
			<img
				src="/img/bg2.jpg"
				className="absolute top-0 w-full min-w-[1500px] opacity-[0.6]"
				alt=""
			/>
			<h2 className="relative text-center w-full text-4xl text-white RalewayBold">
				What some of our early customers are saying
			</h2>
			<div className="flex flex-wrap gap-10 justify-center w-full relative items-center">
				{items.map((item) => {
					return (
						<div className="flex flex-col gap-2 w-[525px] items-center ">
							<h3 className="text-lg Montserrat text-center text-gray-200 italic">
								{item.text}
							</h3>
							<img src={item.icon} className="w-20 rounded-full" alt="" />
							<h3 className="text-xl Raleway text-center text-white">
								{item.name}
							</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const HowWeDoItComponent = () => {
	const [hover, setHover] = React.useState(false);
	const [active, setActive] = React.useState(0);
	const bottles = [
		{
			id: 1,
			component: (
				<div className="relative xl:w-1/2 w-full xl:min-h-none min-h-[400px] max-h-[400px] xl:max-h-none flex flex-col items-center justify-center gap-2">
					<img
						src="/img/Rosebank_1991 cask_2112.png"
						className={clsx(
							{ ['scale-110']: hover },
							'absolute top-0 bottom-0 left-0 right-0 m-auto 2xl:w-80 w-60 z-10 transition-all duration-1000'
						)}
						alt=""
					/>
					<div className="w-full  flex px-5 items-center gap-4 justify-center">
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/1.png"
							alt=""
							className={clsx(
								{
									['rotate-6neg top-[-40px] left-[-40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/5.png"
							alt=""
							className={clsx(
								{
									['rotate-6 top-[-40px] left-[40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>{' '}
					<div className="w-full 2xl:flex hidden gap-12 items-center justify-center">
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/4.png"
							alt=""
							className={clsx(
								{
									[' top-[0px] left-[-40px]']: hover,
								},
								'w-1/2 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/8.png"
							alt=""
							className={clsx(
								{
									['rotate-3 top-[0px] left-[40px]']: hover,
								},
								'w-1/2 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>{' '}
					<div className="w-full flex px-5 gap-4 items-center justify-center">
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/10.png"
							alt=""
							className={clsx(
								{
									['rotate-4neg top-[40px] left-[-40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeig4l3mp2rh2v6xchi7kuoamvxfsgcmvozcaidhhokxkk5nyeqimhu.ipfs.nftstorage.link/50.png"
							alt=""
							className={clsx(
								{
									['rotate-3 top-[40px] left-[40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>
				</div>
			),
		},
		{
			id: 2,
			component: (
				<div className="relative xl:w-1/2 w-full xl:min-h-none min-h-[400px] max-h-[400px] xl:max-h-none flex flex-col items-center justify-center gap-2">
					<img
						src="/img/Karuizawa_1972.png"
						className={clsx(
							{ ['scale-110']: hover },
							'absolute top-0 bottom-0 left-0 right-0 m-auto 2xl:w-80 w-60  z-10 transition-all duration-1000'
						)}
						alt=""
					/>
					<div className="w-full flex px-5 items-center gap-4 justify-center">
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/3.png"
							alt=""
							className={clsx(
								{
									['rotate-6neg top-[-40px] left-[-40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/7.png"
							alt=""
							className={clsx(
								{
									['rotate-6 top-[-40px] left-[40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>{' '}
					<div className="w-full 2xl:flex hidden gap-12 items-center justify-center">
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/8.png"
							alt=""
							className={clsx(
								{
									[' top-[0px] left-[-40px]']: hover,
								},
								'2xl:w-1/2 sm:w-80 w-60 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/15.png"
							alt=""
							className={clsx(
								{
									['rotate-3 top-[0px] left-[40px]']: hover,
								},
								'2xl:w-1/2 sm:w-80 w-60 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>{' '}
					<div className="w-full flex px-5 gap-4 items-center justify-center">
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/12.png"
							alt=""
							className={clsx(
								{
									['rotate-4neg top-[40px] left-[-40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
						<img
							src="https://bafybeih76ssazli4lxp7vvwx4mxshohaurenc2phv6jhcsvchxv4yvcsbu.ipfs.nftstorage.link/35.png"
							alt=""
							className={clsx(
								{
									['rotate-3 top-[40px] left-[40px]']: hover,
								},
								'2xl:w-1/2 sm:w-40 w-32 rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
						/>
					</div>
				</div>
			),
		},
		{
			id: 3,
			component: (
				<div className="relative flex items-center justify-center w-full flex gap-2 xl:min-h-none min-h-[400px] max-h-[400px] xl:max-h-none">
					<div className="xl:w-1/2 flex items-center justify-center relative">
						<video
							src="https://bafybeiezbjlf7jwelm2lwmtnh2oozbh2zxdxc46y7gjx7ykozyvfwqhi6i.ipfs.nftstorage.link/"
							className={clsx(
								{
									['scale-110']: hover,
								},
								'w-full rounded-md top-0 left-0 relative transition-all duration-1000'
							)}
							autoPlay
							loop
						/>
						<img
							src="/img/Rosebank_16 Cask_1511.png"
							className={clsx(
								{ ['scale-110']: hover },
								'md:w-80 w-60 absolute right-[-35%] bottom-[-20%] z-10 transition-all duration-1000'
							)}
							alt=""
						/>{' '}
					</div>
				</div>
			),
		},
	];

	React.useEffect(() => {
		setInterval(() => {
			setActive((prev) => {
				return prev === 2 ? 0 : prev + 1;
			});
		}, 10000);
	}, []);

	return (
		<div className="py-28 bg-black-1 relative text-white  w-full flex flex-col items-center justify-center transition-all duration-1000 min-h-[100vh]">
			<div className="flex 2xl:flex-row flex-col-reverse gap-24 items-center justify-center w-full md:px-16 transition-all duration-1000">
				<div
					className="2xl:w-1/2 w-3/5 flex items-center justify-center relative transition-all duration-1000"
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseLeave={() => {
						setHover(false);
					}}
				>
					{bottles.map((item) => {
						return (
							<div
								className={clsx(
									{ ['hidden']: item.id !== active + 1 },
									'w-full flex items-center justify-center md:min-h-none min-h-[400px] max-h-[400px] md:max-h-none'
								)}
							>
								{item.component}
							</div>
						);
					})}
				</div>
				<div className="2xl:w-1/2 w-full flex flex-col items-center justify-center">
					<p className="2xl:text-justify text-center Montserrat md:text-[18px] text-[13px] md:w-2/3 w-full md:px-0 px-4">
						At Bolster, we believe that NFTs are a valuable tool for promoting
						culture and art. However, we also recognize that the prices of NFTs
						can be extremely volatile and have suffered significant losses
						during the crypto winter. That's why we decided to create curated
						art projects that are structured with an option to be redeemed for
						physical assets. <br />
						<br /> This means that if the value of an NFT or a collection of
						NFTs falls below the market value of the physical asset it
						represents, there is an economic incentive to buy it. This can
						either raise the value of the NFT(s) or allow someone to obtain the
						physical asset at a discounted price. If the NFT(s) is redeemed, it
						will be burned.
						<br />
						<br /> To redeem an NFT or a collection of NFTs, you will need to
						have the complete collection. If the collection has only one NFT, it
						can be redeemed at any time. By offering this redemption option, we
						add an extra layer of value and stability to our NFTs.
					</p>
				</div>
			</div>
		</div>
	);
};

export const CTAComponent = () => {
	return (
		<div className="md:py-28 py-10 bg-gray-900 relative text-white  w-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-4 items-center justify-center md:w-2/3 md:px-0 px-4">
				<p className="text-center RalewayBold text-[17px]">
					Buy an NFT with us and get a Global Membership that gives you 24-hour
					early access to our exclusive drops. <br /> Limited to our early
					members.
				</p>
				<span className="text-gray-500 Montserrat font-[400]">
					Airdrop date: TBD
				</span>
				<Button
					className={clsx(
						'z-10 border border-white bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:scale-[120%] duration-300',
						'ml-4'
					)}
					href={'/collections'}
				>
					Get yours here!
				</Button>
			</div>
		</div>
	);
};

export const WhyShouldComponent = () => {
	const items = [
		{
			text: 'Authenticity Guarantee on all our Backstop physical products',
			subTexts:
				'We are confident in the authenticity of our physical assets because we either purchase them directly from the brands or through our team of industry experts who carefully curate our selection. Our thorough procurement process ensures that we can provide an authenticity guarantee on all of our physical assets.',
			image: 'img/authenticity.png',
		},
		{
			text: 'The legal rights that the NFT(s) have to be redeemed to the physical assets are backed by UK law',
			subTexts:
				'The NFT(s) are legally backed by UK law and can be redeemed for the physical assets they represent.',
			image: 'img/law.jpg',
		},
		{
			text: 'The world is full of incredible artists just waiting to be discovered. Let us help you find them.',
			image: 'img/world.png',
		},
		{
			text: 'Access a diverse array of stunning artistic creations by artists worldwide. We partner with hand-selected, talented artists to bring you unique, high-quality pieces.',
			subTexts:
				'Our experienced art curator, Yvonne, has over 20 years of experience in the field. Not only has she worked with galleries and exhibitions, but she has also built a network of artists who are eager to collaborate with us. Her expertise ensures that our collections and exhibitions are of the highest caliber.',
			image: 'img/artist.jpg',
		},
	];

	React.useEffect(() => {
		AOS.init({ once: true });
	}, []);

	return (
		<div className="md:py-28 py-10 px-4 bg-gray-900 flex flex-col gap-10 relative items-center justify-center">
			<div className="2xl:w-2/3 flex flex-col gap-10 relative items-center justify-center">
				<div className="flex gap-16 justify-center items-center overflow-hidden w-full">
					<div className="flex flex-col items-center justify-center w-full md:px-16  Raleway ">
						{items.map((item, index) => {
							return (
								<div
									className={clsx(
										{ 'lg:!flex-row-reverse': index % 2 == 0 },
										'min-h-72 flex lg:flex-row flex-col justify-between items-center w-full py-8 gap-10'
									)}
									data-aos={`fade-${index % 2 == 0 ? 'left' : 'right'}`}
									data-aos-duration="1000"
									data-aos-easing="ease-in-out"
									data-aos-mirror="true"
									data-aos-once="false"
								>
									<div className="flex flex-col gap-2 w-full xl:text-justify text-center">
										<h2 className="text-[17px] Raleway text-white">
											{item.text}
										</h2>
										<p className="text-[15px] text-gray-500 Montserrat pl-4">
											{item.subTexts}
										</p>
									</div>
									<div className="flex flex-col gap-2 w-full items-center justify-center">
										<img
											src={item.image}
											className="md:w-2/3 md:min-w-[300px] w-1/2 rounded-full"
											alt=""
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const LegalComponent = () => {
	return (
		<div className="py-10 bg-gradient-to-b from-gray-900 to-primary relative text-white  w-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-6 items-center justify-center w-full lg:px-56 px-10">
				<h2 className="text-2xl RalewayBold">Disclaimer</h2>
				<p className="text-center Montserrat text-[13px] text-gray-500">
					The information and materials provided on our website are for general
					informational purposes only and do not constitute investment advice.
					We do not guarantee the accuracy, completeness, reliability,
					suitability, or timeliness of the information or materials provided,
					and we are not responsible for any errors or omissions. The market
					value of our backstop physical products may fluctuate and we cannot
					predict its behavior. We are not an investment platform and do not
					offer investment services or products. You should carefully consider
					your investment objectives and risk tolerance before making any
					investment decisions.
				</p>
			</div>
		</div>
	);
};

export const TypeOfBolsterComponent = () => {
	const items = [
		{ image: 'img/Rare-whisky.jpg', title: 'Rare Whiskies', color: '#C70039' },
		{
			image: 'img/painting.jpg',
			title: 'Physical Paintings',
			color: '#0070FF',
		},
		{ image: 'img/rolex.jpg', title: 'Collective Watches', color: '#BBBBBB' },
		{ image: 'img/gold.jpg', title: 'Gold', color: '#FFC300' },
	];
	const [index, setIndex] = React.useState(0);
	const [itemSelected, setItemSelected] = React.useState('Rare Whiskies');

	const [formSent, setFormSent] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const sendEmail = (e: any) => {
		e.preventDefault();
		setLoading(true);
		sendForm(
			'service_i7w64sf',
			'template_2zwghz2',
			e.target,
			'crkxSdJHxLiYQ8I0F'
		).then(
			(result) => {
				toast.success(
					'The form has been successfully sent, we will reach you asap!',
					{ duration: 5000 }
				);
				setFormSent(true);
				setLoading(false);
			},
			(error) => {
				setLoading(false);
			}
		);
	};

	return (
		<div
			className="md:py-28 py-10 bg-gray-900 relative w-full flex justify-center"
			id="for_artists"
		>
			<div className="w-full 2xl:px-10 lg:px-36 px-4 flex justify-center">
				<div className="flex flex-col gap-4 items-center justify-center 2xl:w-2/3 w-full  h-full">
					<h2 className="text-4xl text-white RalewayBold text-center">
						Let's Collaborate
					</h2>
					<p className="text-center Raleway text-gray-500 text-[17px]">
						Enhance your collectibles with Bolster! Our hassle-free service
						handles all the legalities, storage, and insurance for you. Choose
						from our wide selection of physical products and assets and give
						your fans an additional peace of mind that comes with proper
						ownership. Bolster makes it easy to legally add value to your work.
					</p>
					<div className="flex lg:flex-row flex-col gap-4 items-center justify-center w-full  h-full">
						<div className="lg:w-1/2 sm:w-2/3 w-full">
							<Swiper
								slidesPerView={1}
								autoplay={{
									delay: 5000,
									disableOnInteraction: false,
								}}
								onSlideChange={(slide) => {
									setIndex(slide.realIndex);
								}}
								loop={true}
								spaceBetween={10}
								modules={[Zoom, Autoplay]}
							>
								{items.map((item) => {
									return (
										<SwiperSlide>
											<div className="md:w-full rounded-xl  flex flex-col relative text-center items-center justify-center gap-2 overflow-hidden">
												<img
													src={item.image}
													className="w-full opacity-75"
													alt=""
												/>
												<h1
													className="text-xl w-full absolute bottom-0 py-4 text-2xl R"
													style={{
														background: 'rgba(0,0,0,0.8)',
													}}
												>
													{item.title}
												</h1>
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
						<div className="lg:w-1/2 w-full max-w-[600px] flex flex-col items-center justify-center h-full">
							{' '}
							<form
								className="flex flex-col items-center gap-4 2xl:px-16 w-full"
								onSubmit={sendEmail}
							>
								<input
									type="text"
									name="name"
									placeholder="Name"
									className="outline-none ring-none border-none rounded-md w-full text-[12px]"
									disabled={loading}
									required
								/>
								<input
									type="email"
									name="email"
									placeholder="Email"
									className="outline-none ring-none border-none rounded-md w-full text-[12px]"
									disabled={loading}
									required
								/>
								<textarea
									name="message"
									placeholder="Message"
									className="outline-none ring-none border-none rounded-md resize-none h-28 w-full text-[12px]"
									disabled={loading}
									required
								/>{' '}
								<div className="w-full flex md:justify-end justify-center">
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'!rounded-full hover:text-secondary ml-4'
										)}
										type="submit"
									>
										Send
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const ContactUs: React.FC<any> = () => {
	const [formSent, setFormSent] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	return (
		<div
			className={clsx('w-full bg-primary flex items-center justify-center')}
			id="contactus"
		>
			<div className="flex md:flex-row flex-col-reverse items-center md:justify-between justify-center w-full h-full px-16 py-10 gap-16 relative  xl:w-2/3">
				<div className="flex flex-col items-center justify-center h-full relative w-auto">
					<img
						src="/icons/logo.png"
						className="md:w-[300px] w-[200px]"
						alt=""
					/>
				</div>
				<div className="flex flex-col items-center justify-center h-full relative w-auto"></div>
			</div>
		</div>
	);
};
