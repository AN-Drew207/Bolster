import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Input } from 'components/common/form/input';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../../landing/loadingComponent';
import Styles from '../styles.module.scss';

export const MakeAnOfferModal: React.FC<any> = ({
	setOptions,
	makeAnOffer,
	quantityLeft,
	quantityMinted,
	maxSupply,
	minimumPrice,
	percentage,
	isLoading,
	message,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	const [acceptedConditions, setAcceptedConditions] = React.useState(false);
	const [price, setPrice] = React.useState(0);
	const rules = {
		required: {
			required: { value: true, message: 'This is required' },
		},
		quantity: {
			required: { value: true, message: 'This is required' },
			min: {
				value: minimumPrice + minimumPrice * 0.15,
				message: 'You have to pay at least minting price +' + percentage + '%',
			},
		},
	};
	console.log(minimumPrice, 'price');

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
					<form
						className="flex flex-col items-center justify-center gap-4 text-secondary"
						onSubmit={handleSubmit((data) => makeAnOffer(data.price))}
					>
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Your Tokens{' '}
								</h2>
								<p className="text-xl font-semibold text-center">
									<span className="text-secondary text-center">
										{quantityLeft}
									</span>{' '}
									/ {quantityMinted}
								</p>
							</div>
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Max Supply{' '}
								</h2>
								<p className="text-xl font-semibold text-center">
									<span className="text-secondary text-center">
										{maxSupply}{' '}
									</span>
									NFTs
								</p>
							</div>
						</div>
						<Input
							type="number"
							title="Price to Pay per NFT"
							placeholder=""
							labelVisible
							name="price"
							register={register}
							rules={rules.quantity}
							error={errors.price}
							onChangeCustom={(e: any) => {
								setPrice(e.target.value);
							}}
						/>
						<h2 className="text-secondary text-left text-md w-full">
							{'Total Price in USDC: ' +
								((maxSupply - quantityLeft) * price).toFixed(2) +
								' '}
							<span className="font-bold text-secondary">USDC</span>
						</h2>
						{isLoading ? (
							<>
								<Loading small />
								<h2 className="text-sm text-center text-secondary">
									{message}
								</h2>
							</>
						) : (
							<Button
								className={clsx(
									'z-10 border borderMain mt-4 px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
									Styles.button
								)}
								type="submit"
							>
								Make an Offer now!
							</Button>
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
						<h2 className="text-2xl mb-2 font-bold text-secondary text-center">
							Make An Offer For All the NFTs
						</h2>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> To be able to use this option you have to
								send proper funds (minimum the minting price + a 15% per NFT
								trying to buy).
							</p>
							<p className="md:text-lg text-md font-semibold">
								<span className="text-secondary">Note:</span> These funds will
								be looked for the entire time the offer is live.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								Once you make the offer, you'll have 3 possible outcomes by each
								user holding a NFT:
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>1. </span> The offer is accepted and the transaction goes
								through.
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>2. </span> The offer is rejected and the transaction is
								declined.
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>3. </span> The offer is neither accepted nor rejected, in
								this case, the offer will be active for 30 days. After this
								period, the offer will be automatically rejected.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								When the offer is automatically rejected, you will be able to
								place another offer that will be live for the next 30 days, and
								so long. If this process is repeated for 5 consecutive periods
								of 30 days, the next offer that is made will automatically be
								accepted for the users that didn't answer, and the transaction
								will go through. If during these first 5 offers, a seller
								rejects an offer the process is restarted for this seller until
								he/she accept or don't answer for 5 consecutive times.
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
							I Accept
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
