import clsx from 'clsx';
import { Button } from 'components/common/button';
import * as React from 'react';
import { Loading } from '../loadingComponent';
import Styles from '../styles.module.scss';

export const AcceptAnOfferModal: React.FC<any> = ({
	setOptions,
	acceptAnOffer,
	offer,
	balance,
	decimalsUSD,
	isLoading,
	message,
}) => {
	const [acceptedConditions, setAcceptedConditions] = React.useState(false);
	console.log(offer, 'offer');
	return (
		<div
			className={clsx(
				'flex flex-col items-center justify-center w-full h-full px-16 py-10 relative md:mt-20 bg-gray-900 rounded-xl border border-white max-w-[1000px]'
			)}
		>
			{acceptedConditions ? (
				<>
					<div className="flex w-full items-center justify-center">
						<div className="flex w-full mb-10 text-xl text-secondary">
							<Button
								onClick={() => {
									setOptions('menu');
								}}
								className="font-bold"
							>
								Back Menu
							</Button>
						</div>
					</div>
					<form className="flex flex-col items-center justify-center gap-4 text-secondary">
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-2 md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Accept the Last Offer{' '}
								</h2>
							</div>
						</div>
						<p className="text-sm text-center text-red-500 font-semibold mb-4">
							By accepting this offer, you will be paid by the amount is
							reflected and all the NFTs you hold will be transfered to the user
							is making the offer related to this bottle. Otherwise, if you deny
							the offer, nothing will happened and the amount of money will be
							refunded to the user that made the offer.
						</p>
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div className="flex flex-col">
								<h2 className="text-xl font-semibold text-center whitespace-nowrap">
									Bidder
								</h2>
								<h2 className="text-lg font-semibold text-center text-secondary">
									{offer?.offer?.bidder.substring(0, 20)}...
								</h2>
							</div>
						</div>
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div className="md:w-1/2 flex flex-col">
								<h2 className="text-xl font-semibold text-center whitespace-nowrap">
									Price Per Token
								</h2>
								<h2 className="text-lg font-semibold text-center text-secondary">
									{offer?.offer?.refundAmountPerToken / 10 ** decimalsUSD} USDC
								</h2>
							</div>
							<div className="md:w-1/2 flex flex-col">
								<h2 className="text-xl font-semibold text-center">
									My Balance of NFTs
								</h2>
								<h2 className="text-lg font-semibold text-center text-secondary">
									{balance} NFTs
								</h2>
							</div>
						</div>
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div className="flex flex-col">
								<h2 className="text-xl font-semibold text-center whitespace-nowrap">
									Total to Receive
								</h2>
								<h2 className="text-lg font-semibold text-center text-secondary">
									{(offer?.offer?.refundAmountPerToken / 10 ** decimalsUSD) *
										balance}{' '}
									USDC
								</h2>
							</div>
						</div>

						{isLoading ? (
							<>
								<Loading small />
								<h2 className="text-sm text-center text-secondary">
									{message}
								</h2>
							</>
						) : (
							<div className="flex justify-between w-full gap-8">
								<>
									<Button
										className={clsx(
											'z-10 border !border-green-600 font-bold mt-4 w-1/2 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  hover:bg-green-600'
										)}
										onClick={() => {
											acceptAnOffer(true);
										}}
									>
										ACCEPT
									</Button>
									<Button
										className={clsx(
											'z-10 border !border-red-600 font-bold mt-4 w-1/2 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  hover:bg-red-600'
										)}
										onClick={() => {
											acceptAnOffer(false);
										}}
									>
										DENY
									</Button>
								</>
							</div>
						)}
					</form>
				</>
			) : (
				<>
					{' '}
					<div className="flex w-full items-center justify-center">
						<div className="flex w-full mb-2 text-xl text-secondary">
							<Button
								onClick={() => {
									setOptions('menu');
								}}
								className="font-bold"
							>
								Back
							</Button>
						</div>
					</div>
					<div className="flex flex-col w-full gap-4 text-secondary">
						<h2 className="text-2xl mb-2 text-secondary font-bold text-center">
							Accept / Deny an Offer
						</h2>
						<div className="flex text-center flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								An Offer has been created by an user, you can look at the detail
								of this offer after this section.
							</p>
						</div>
						<div className="flex text-center flex-col w-full gap-1">
							<p className="md:text-lg text-md text-red-500 font-semibold">
								By accepting this offer, you will be paid by the amount is
								reflected and all the NFTs you hold related to this bottle will
								be transfered to the user is making the offer. Otherwise, if you
								deny the offer, nothing will happened and the amount of money
								will be refunded to the user that made the offer.
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Button
							className={clsx(
								'z-10 border borderMain mt-4 px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							onClick={() => setAcceptedConditions(true)}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
