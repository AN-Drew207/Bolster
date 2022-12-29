/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
	BottleItem,
	Bottles,
} from '../collection/BottlesComponent/BottlesCollections';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import router from 'next/router';

export const MainSectionComponent = () => {
	return (
		<div className="min-h-[100vh] pt-28 bg-overlay relative text-secondary flex items-center justify-center w-full">
			<div className="flex gap-10 items-center w-full">
				<div className="w-1/2 flex justify-center items-center">
					<img
						src="/icons/bolster_logotype.svg"
						className="w-[80%] rounded-md"
						alt=""
					/>
				</div>
				<div className="w-1/2 flex flex-col justify-center items-center gap-4">
					<h2 className="text-center w-full text-6xl w-[700px]">
						Building the future of NFTs
					</h2>
					<h2 className="text-gray-800 Raleway w-full text-center text-md w-[700px]">
						Amazing NFT Projects with Backstop Value. NFTs with peace of mind
					</h2>
				</div>
			</div>
		</div>
	);
};

export const OfferComponent = () => {
	const items = [
		{
			text: 'Access a diverse array of stunning artistic creations',
			icon: '/icons/opensea.svg',
		},
		{
			icon: '/icons/opensea.svg',
			text: 'Your NFTs grant you the legal right to redeem them for a collectable physical asset in the UK',
		},
		{
			text: 'Authenticity guarantee on physical assets',
			icon: '/icons/opensea.svg',
		},
		{
			text: 'No maintenance or warehousing cost on physical assets',
			icon: '/icons/opensea.svg',
		},
	];
	return (
		<div className="py-28 bg-white relative text-secondary flex flex-col gap-16 items-center justify-center w-full">
			<h2 className="text-3xl">What we Offer</h2>
			<div className="flex flex-wrap gap-10 justify-center w-full">
				{items.map((item) => {
					return (
						<div className="flex flex-col gap-2 w-80 items-center ">
							<img src={item.icon} className="w-20" alt="" />
							<h3 className="text-lg Raleway text-center">{item.text}</h3>
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
			icon: '/icons/opensea.svg',
		},
		{
			name: 'Santiago, Spain',
			icon: '/icons/opensea.svg',
			text: '“As a collector, I want to be sure that my NFTs retain their value over time. Bolster’s backstop supported by physical assets provides the stability and security that I need for my collection."',
		},
		{
			name: 'Lucia, Mexico',
			text: `"I was hesitant to invest in NFTs due to their volatility, but this product's backstop supported by physical assets gives me peace of mind knowing that my investment is protected."`,
			icon: '/icons/opensea.svg',
		},
	];
	return (
		<div className="py-28 bg-overlay relative text-secondary w-full flex flex-col items-center justify-center">
			<div className="flex flex-wrap gap-10 justify-center w-full">
				{items.map((item) => {
					return (
						<div className="flex flex-col gap-2 w-80 items-center ">
							<img src={item.icon} className="w-20" alt="" />
							<h3 className="text-xl Raleway text-center">{item.name}</h3>
							<h3 className="text-lg Raleway text-center">{item.text}</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const HowWeDoItComponent = () => {
	return (
		<div className="py-28 bg-overlay relative text-secondary  w-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-10 items-center justify-center w-1/2">
				<h2 className="text-3xl">How we do it?</h2>
				<p className="text-center Raleway text-[17px]">
					At Bolster, we believe that NFTs are a valuable tool for promoting
					culture and art. However, we also recognize that the prices of NFTs
					can be extremely volatile and have suffered significant losses during
					the crypto winter. That's why we decided to create curated art
					projects that are structured with an option to be redeemed for
					physical assets. This means that if the value of an NFT or a
					collection of NFTs falls below the market value of the physical asset
					it represents, there is an economic incentive to buy it. This can
					either raise the value of the NFT(s) or allow someone to obtain the
					physical asset at a discounted price. If the NFT(s) is redeemed, it
					will be burned. To redeem an NFT or a collection of NFTs, you will
					need to have the complete collection. If the collection has only one
					NFT, it can be redeemed at any time. By offering this redemption
					option, we hope to add an extra layer of value and stability to our
					NFTs.
				</p>
			</div>
		</div>
	);
};

export const CTAComponent = () => {
	return (
		<div className="py-10 bg-secondary relative text-white  w-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-4 items-center justify-center w-1/2">
				<p className="text-center Raleway text-[17px]">
					Buy an NFT with us and get a Global Membership that gives you 24-hour
					early access to our exclusive drops. <br /> Limited to the first 100
					members.
				</p>
				<Button
					className={clsx(
						'z-10 border border-white bg-white Raleway font-bold px-4 py-3 text-secondary	 transition ease-in-out delay-150 hover:bg-secondary hover:border-white duration-300',
						'hover:text-white'
					)}
					onClick={() => router.push('/profile')}
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
			text: 'The world is full of incredible artists just waiting to be discovered. Let us help you find them.',
		},
		{
			text: 'We partner with hand-selected, talented artists to bring you unique, high-quality pieces',
			subTexts:
				'Our experienced art curator, Yvonne, has over 20 years of experience in the field. Not only has she worked with galleries and exhibitions, but she has also built a network of artists who are eager to collaborate with us. Her expertise ensures that our collections and exhibitions are of the highest caliber.',
		},
		{
			text: 'Authenticity Guarantee on all our Backstop physical products',
			subTexts:
				'We are confident in the authenticity of our physical assets because we either purchase them directly from the brands or through our team of industry experts who carefully curate our selection. Our thorough procurement process ensures that we can provide an authenticity guarantee on all of our physical assets.',
		},
		{
			text: 'The legal rights that the NFT(s) have to be redeemed to the physical assets are backed by UK law',
			subTexts:
				'The NFT(s) are legally backed by UK law and can be redeemed for the physical assets they represent.',
		},
	];

	return (
		<div className="py-28 bg-overlay relative text-secondary  w-full flex flex-col gap-10 items-center justify-center">
			<h2 className="text-3xl">Why you should come with us?</h2>

			<div className="flex flex-col gap-4 items-center justify-center w-1/2 Raleway">
				{items.map((item) => {
					return (
						<div className="flex flex-col gap-2 w-full">
							<h2 className="text-lg Raleway">{item.text}</h2>
							<p className="text-[14px] text-gray-800 Raleway">{item.text}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const CollectionsLandingComponent = () => {
	const { bottles: bottlesView } = useSelector((state: any) => state.state);
	console.log(bottlesView, 'botellas');
	return (
		<div className="flex flex-col bg-overlay px-32 pb-48 pt-16 gap-12">
			<h2 className="Raleway text-xl text-secondary">Backed Collections</h2>
			<div className="flex flex-wrap gap-10 items-center justify-center w-full">
				{bottlesView.map(
					(
						{ address, name, image, exchanged, supply, maxSupply }: any,
						index: number
					) => {
						return (
							<BottleItem
								address={address}
								name={name}
								video={image}
								exchanged={exchanged}
								supply={supply}
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

export const LegalComponent = () => {
	return (
		<div className="py-10 bg-white relative text-secondary  w-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-4 items-center justify-center w-2/3">
				<h2 className="text-lg">DISCLAIMER</h2>
				<p className="text-center Raleway text-[14px]">
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
