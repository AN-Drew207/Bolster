import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Input } from 'components/common/form/input';
import { SelectInput } from 'components/common/form/SelectInput';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../loadingComponent';
import Styles from '../styles.module.scss';

export const MintModal: React.FC<any> = ({
	hide,
	Mint,
	priceusd,
	priceMATIC,
	currencies,
	quantityMinted,
	maxSupply,
	message,
	isLoading,
	allowance,
	approve,
	typeOfWallet,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	const [address, setAddress] = React.useState();
	const [acceptedConditions, setAcceptedConditions] = React.useState(false);
	const [quantity, setQuantity] = React.useState(0);
	const rules = {
		required: {
			required: { value: true, message: 'This is required' },
		},
		quantity: {
			required: { value: true, message: 'This is required' },
			min: { value: 1, message: 'You need to mint at least one NFT' },
			max: {
				value: maxSupply - quantityMinted,
				message: `You can't mint more than the max of NFTs`,
			},
		},
	};

	return (
		<div
			className={clsx(
				'flex flex-col items-center justify-center w-full h-full px-16 py-10 relative md:mt-20 bg-gray-900 rounded-xl border border-white max-w-[1000px]'
			)}
		>
			{acceptedConditions ? (
				<>
					<div className="flex w-full items-center justify-center">
						<div className="flex w-full mb-10 text-xl text-white">
							<Button
								onClick={() => {
									hide();
								}}
								className="font-semibold"
							>
								x
							</Button>
						</div>
					</div>
					<form
						className="flex flex-col items-center justify-center gap-4 text-white"
						onSubmit={handleSubmit((data) => {
							if (
								allowance < priceusd * quantity &&
								address ==
									currencies.filter((item: any) => item.name == 'USDC')[0]
										?.value &&
								typeOfWallet == 'magic'
							) {
								approve(address);
							} else {
								Mint(data.quantity, address);
							}
						})}
					>
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Tokens Minted
								</h2>
								<p className="text-xl font-semibold text-center">
									<span className="textMain text-center">{quantityMinted}</span>{' '}
									/ {maxSupply}
								</p>
							</div>
						</div>
						<h2 className="text-white text-center font-semibold text-xl">
							{priceusd + ' USD per NFT'}
						</h2>
						<Input
							type="number"
							title="Quantity of NFTs"
							placeholder=""
							labelVisible
							name="quantity"
							register={register}
							rules={rules.quantity}
							error={errors.quantity}
							onChangeCustom={(e: any) => {
								setQuantity(e.target.value);
							}}
						/>
						<SelectInput
							labelVisible
							title="Currency to pay"
							name="currency"
							register={register}
							rules={rules.required}
							error={errors.currency}
							values={currencies.map((currency: any) => {
								return { name: currency.name, value: currency.value };
							})}
							onChangeCustom={(e: any) => {
								setAddress(e.target.value);
							}}
						/>
						<h2 className="text-white text-left text-md w-full">
							{'Total Price in USDC: ' + priceusd * quantity + ' '}
							<span className="font-semibold textMain">USDC</span>
						</h2>
						<h2 className="text-white text-left text-md w-full">
							{'Estimated Total Price in MATIC: ' +
								(priceMATIC * quantity).toFixed(4) +
								' '}
							<span className="font-semibold textMain">MATIC</span>
						</h2>
						{isLoading ? (
							<>
								<Loading small />
								<h2 className="text-sm text-center textMain">{message}</h2>
							</>
						) : (
							<Button
								className={clsx(
									'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
									Styles.button
								)}
								type="submit"
							>
								{allowance < priceusd * quantity &&
								address ==
									currencies.filter((item: any) => item.name == 'USDC')[0]
										?.value &&
								typeOfWallet == 'magic' ? (
									<>Approve USDC</>
								) : (
									<>
										<span translate={'no'}> Mint </span> now!
									</>
								)}
							</Button>
						)}
					</form>
				</>
			) : (
				<>
					{' '}
					<div className="flex w-full items-center justify-center">
						<div className="flex w-full mb-2 text-xl text-white">
							<Button
								onClick={() => {
									hide();
								}}
								className="font-semibold"
							>
								x
							</Button>
						</div>
					</div>
					<div className="flex flex-col w-full gap-4 text-white">
						<h2 className="text-2xl mb-2 font-semibold text-center textMain">
							Game Rules
						</h2>
						<div className="flex w-full gap-2">
							<p className="md:text-lg text-md font-semibold">
								By minting or buying on a secondary market, an NFT created by
								CoCo B.C., you are accepting these game rules.
							</p>
						</div>
						<div className="flex w-full gap-2">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> The objective is for one person to collect
								all the pieces of a bottle collection to be redeemed for the
								physical bottle and the NFT art piece.
							</p>
						</div>
						<div className="flex flex-col w-full gap-2">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> There are 2 options for buying the NFTs:
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>1. </span> Directly minting from our website (each piece
								only can be minted 1 time).
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>2. </span> Buy it from another customer via a third-party
								marketplace.
							</p>
						</div>
						<div className="flex flex-col w-full gap-2">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> If someone holds more than 85% of the
								collection, he/she will be able to make an offer for the rest of
								the collection with the help of the{' '}
								<span className="textMain">“Active No rule”</span>.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> If someone holds more than 85% of the
								collection, he/she will be able to make an offer for the rest of
								the collection with the help of the{' '}
								<span className="textMain">“Active No rule”</span>.
							</p>
							<p className="md:text-lg text-md font-semibold">
								<span className="textMain">Note:</span> When an offer is made
								the NFTs of the holder will be looked for as long as the offer
								is active.{' '}
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span>{' '}
								<span className="textMain">Active No rule:</span> this method is
								developed to assure that one person can fully collect all the
								collection, in other words, to assure that no NFT is lost on a
								wallet without an owner.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> To be able to use the{' '}
								<span className="textMain">Active No rule </span> the person
								needs to have at least i) 85% of the collection, and ii) proper
								funds (minimum the minting price + a 15% per NFT trying to buy).
							</p>
							<p className="md:text-lg text-md font-semibold">
								<span className="textMain">Note:</span> These funds will be
								looked for the entire time the offer is live.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								Once a person fulfills the previous requirements (i, ii), they
								will be able to make an offer for the remaining part of the
								collection, having 3 possible outcomes:
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
								When the offer is automatically rejected, the buyer will be able
								to place another offer that will be live for the next 30 days,
								and so on. If this process is repeated for 5 consecutive periods
								of 30 days, the next offer that is made will automatically be
								accepted, and the transaction will go through. If during these
								first 5 offers, the seller rejects an offer the process is
								restarted. Therefore “Active No rule”
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								The offers are made to every user that holds an NFT, so they may
								be accepted or rejected individually. This means that one person
								can accept the offer, another person can reject it, and a third
								person may not answer, each user will have its individual count
								of the “Active No rule”
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								The offer may be canceled or it can expire for 2 reasons:
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>1. </span> The time expires.
							</p>
							<p className="md:text-lg text-md font-semibold md:ml-8 ml-4">
								<span>2. </span> Every user that receives the offer actively
								responds.
							</p>
							<p className="md:text-lg text-md font-semibold">
								<span className="textMain">Note:</span> If during these first 5
								offers, the buyer cancels the offer, the process is restarted
								for every NFT remaining.
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> Once someone collects all the pieces it can
								claim the perks (bottle + final nft art)
							</p>
						</div>
						<div className="flex flex-col w-full gap-1">
							<p className="md:text-lg text-md font-semibold">
								<span>&#9679;</span> The bottle is stored in a specialized
								warehouse located in Glasgow (Wales) where it can be picked up,
								free of charge, any other way of collecting it will come with
								added costs (logistics, tax, etc).
							</p>
						</div>
						<div className="flex flex-col w-full gap-1 my-4 ">
							<p className="md:text-xl text-lg font-semibold w-full text-center textMain">
								¡Enjoy collecting!
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Button
							className={clsx(
								'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
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
