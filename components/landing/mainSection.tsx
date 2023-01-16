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
import { SelectInput } from 'components/common/form/SelectInput';
import Link from 'next/link';

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
				<Link href="/collections">
					<div
						className="2xl:w-1/2 w-3/5 flex items-center justify-center relative transition-all duration-1000 cursor-pointer"
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
				</Link>
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
			text: 'Authenticity Guarantee on all our Backstop physical products.',
			subTexts:
				'We are confident in the authenticity of our physical assets because we either purchase them directly from the brands or through our team of industry experts who carefully curate our selection. Our thorough procurement process ensures that we can provide an authenticity guarantee on all of our physical assets.',
			image: 'img/authenticity.png',
		},
		{
			text: 'The legal rights that the NFT(s) have to be redeemed to the physical assets are backed by UK law.',
			subTexts:
				'The NFT(s) are legally backed by UK law and can be redeemed for the physical assets they represent.',
			image: 'img/law.jpg',
		},
		{
			text: 'The world is full of incredible artists just waiting to be discovered. Let us help you find them.',
			image: 'img/world.png',
		},

		{
			text: 'Effortless Redemption Process.',
			subTexts:
				'You can make the redemption of your assets whenever you want by our easy process and receive it!',
			image: 'img/effortless.jpg',
		},
		{
			text: 'Our Assets are securely stored.',
			subTexts:
				"We have them reseved and secure, when the owner wants to redeem it, we'll send him the asset from there.",
			image: 'img/stored.jpeg',
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

export const ArtistsComponent = () => {
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
								<SelectInput
									name="type"
									title="Are you an ...?"
									values={[
										{ name: 'Artist', value: 'artist' },
										{ name: 'NFT Project', value: 'nft_project' },
										{ name: 'Collector', value: 'collector' },
										{ name: 'General Inquiries', value: 'general_inquiries' },
									]}
								></SelectInput>
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
			<div className="flex flex-col items-center justify-center w-full h-full px-16 py-10 gap-16 relative  xl:w-2/3">
				<div className="flex flex-col items-center justify-center h-full relative w-auto">
					<img
						src="/icons/logo.png"
						className="md:w-[300px] w-[200px]"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-full relative w-auto">
					{[
						{ image: '', link: '' },
						{ image: '', link: '' },
					].map((item) => {
						return <a className=""></a>;
					})}
				</div>
			</div>
		</div>
	);
};
