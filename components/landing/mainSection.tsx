/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { BottleItem, Bottles } from './BottlesComponent/BottlesCollections';
import { useSelector } from 'react-redux';

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
