import clsx from 'clsx';
import { Button } from 'components/common/button';
import * as React from 'react';

export const GameRulesModal: React.FC<any> = ({ hide }) => {
	return (
		<div
			className={clsx(
				'flex flex-col items-center justify-center w-full h-full px-16 sm:py-10 py-24 relative md:mt-20 bg-gray-900 rounded-xl border border-white max-w-[1000px]'
			)}
		>
			<>
				{' '}
				<div className="flex w-full items-center justify-center">
					<div className="flex w-full mb-2 text-xl text-white">
						<Button
							onClick={() => {
								hide();
							}}
							className="font-medium"
						>
							x
						</Button>
					</div>
				</div>
				<div className="flex flex-col w-full gap-4 text-white">
					<h2 className="text-2xl mb-2 font-bold text-center textMain">
						The Rules of the game
					</h2>
					<div className="flex w-full gap-2">
						<p className="md:text-lg text-md font-medium">
							By minting or buying on a secondary market a Non-Fungible Token
							(hereinafter, <span className="font-bold">“NFT(s)”</span>) created
							by CoCo B.C., you are accepting the following rules of this game,
							which are coded into our Smart Contract for Unicorn Bottles
						</p>
					</div>
					<h2 className="text-xl mb-2 font-bold text-center textMain">
						Objective
					</h2>
					<div className="flex flex-col w-full gap-2">
						<p className="md:text-lg text-md font-medium">
							Gather all the NFT pieces of a collection that represents a bottle
							in order to be able to redeem them for the physical bottle, which
							also includes the NFT art piece.
						</p>
					</div>
					<h2 className="text-xl mb-2 font-bold text-center textMain">
						Buying Options
					</h2>
					<div className="flex flex-col w-full gap-2">
						<p className="md:text-lg text-md font-medium">
							<span>&#9679;</span> There are 2 options for buying the NFTs:
						</p>
						<p className="md:text-lg text-md font-medium md:ml-8 ml-4">
							<span>1. </span> Directly minting from our website (each piece
							only can be minted 1 time).
						</p>
						<p className="md:text-lg text-md font-medium md:ml-8 ml-4">
							<span>2. </span> Buy it from another customer via a third-party
							marketplace.
						</p>
					</div>
					<h2 className="text-xl mb-2 font-bold text-center textMain">
						Active No Rule
					</h2>
					<div className="flex flex-col w-full gap-2">
						<p className="md:text-lg text-md font-medium">
							This method is developed to guarantee that one customer can fully
							gather the entire collection. This aims to ensure that no NFT is
							lost on a wallet without an owner.
						</p>
						<p className="md:text-lg text-md font-medium">
							To be able to use the{' '}
							<span className="font-bold">Active No Rule</span> the person
							requires to have at least:<span className="font-bold"> 85%</span>{' '}
							of the collection (as mentioned above), and Proper funds (as a
							minimum, the minting price +{' '}
							<span className="font-bold">15%</span>
							for each NFT trying to buy). As with the NFTs, these funds{' '}
							<span className="font-bold">will be locked</span> for the entire
							time the offer is active.
						</p>
						<p className="md:text-lg text-md font-medium">
							Once the customer fulfills the previous two requirements (i and
							ii), the user will be able to make an offer for the remaining part
							of the collection, with two possible outcomes:
						</p>
						<p className="md:text-lg text-md font-medium md:ml-8 ml-4">
							<span>1. </span> The offer is accepted, and the transaction goes
							through;
						</p>
						<p className="md:text-lg text-md font-medium md:ml-8 ml-4">
							<span>2. </span> The offer is rejected, and the transaction is
							declined;
						</p>
						<p className="md:text-lg text-md font-medium">
							If the offer is neither accepted nor rejected for 30 days it
							becomes automatically rejected. Once the offer is automatically
							rejected, the customer will be able to place another offer that
							will be active for the next 30 days, and so on. If the mentioned
							process is repeated for 5 consecutive periods of 30 days, the
							following offer will automatically be accepted, and the
							transaction will be accepted and go through. Moreover, if during
							these first 5 offers, a user rejects an offer, the process will be
							restarted.
						</p>
						<h3 className="text-lg my-2 font-bold text-left">Active No Rule</h3>
						<p className="md:text-lg text-md font-medium">
							The offers are made to every user that holds an NFT so they may be
							accepted or rejected individually by each one. This implies that
							one user can accept the offer, another can reject it, and a third
							may not answer. Each user will have its own individual count of
							the <span className="font-bold">“Active No Rule.”</span>
						</p>
						<p className="md:text-lg text-md font-medium">
							The offers are made to every user that holds an NFT so they may be
							accepted or rejected individually by each one. This implies that
							one user can accept the offer, another can reject it, and a third
							may not answer. Each user will have its own individual count of
							the <span className="font-bold">“Active No Rule.”</span>
						</p>
						<p className="md:text-lg text-md font-medium">
							Given the above, the offer may be canceled for the following two
							reasons: (i) the frame of{' '}
							<span className="font-bold">30 days</span> expires, or (ii) every
							user that receives the offer actively replies.
						</p>
						<p className="md:text-lg text-md font-medium">
							<span className="font-bold">Note:</span> If during these first{' '}
							<span className="font-bold">5</span> offers, the{' '}
							<span className="font-bold">customer</span> cancels the offer, the
							process is restarted for all.
						</p>
					</div>
					<h2 className="text-xl mb-2 font-bold text-center textMain">
						Outcome
					</h2>
					<div className="flex flex-col w-full gap-2">
						<p className="md:text-lg text-md font-medium">
							Once the customer collects all the pieces (the NFTs linked to a
							bottle), they can exchange them for all the benefits (bottle +
							final NFT art). By performing this exchange, all the NFTs part of
							the collections will be burnt,
						</p>
						<p className="md:text-lg text-md font-medium">
							<span>&#9679;</span> If someone holds more than 85% of the
							collection, he/she will be able to make an offer for the rest of
							the collection with the help of the{' '}
							<span className="textMain">“Active No rule”</span>.
						</p>
					</div>

					<div className="flex flex-col w-full gap-1 my-4 ">
						<p className="md:text-xl text-lg font-medium w-full text-center textMain">
							¡Enjoy collecting!
						</p>
					</div>
				</div>
			</>
		</div>
	);
};
