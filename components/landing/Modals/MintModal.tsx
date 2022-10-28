import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Input } from 'components/common/form/input';
import { InputEmail } from 'components/common/form/input-email';
import { InputPhone } from 'components/common/form/input-phone/input-phone';
import { SelectInput } from 'components/common/form/SelectInput';
// import { SelectInput } from 'components/common/form/SelectInput';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../loadingComponent';
// import { Loading } from '../loadingComponent';
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
	quantity,
	bottle,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	const [address, setAddress] = React.useState();

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
				'grid grid-cols-2 items-center justify-center w-full h-full px-16 py-10 relative md:mt-20 bg-gray-900 rounded-xl border border-white max-w-[1200px]'
			)}
		>
			<>
				{' '}
				<div className="flex w-full gap-4 items-center justify-center">
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
				<form
					className="flex xl:flex-row flex-col gap-8 justify-between items-start w-full"
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
							Mint(data, address);
						}
					})}
				>
					<div className="flex flex-col xl:w-1/2 w-full gap-4 text-white">
						{' '}
						<h1 className="text-primary font-bold w-full text-center text-2xl">
							Buy Form
						</h1>
						<div className="flex flex-col gap-2">
							<Input
								title="First Name"
								placeholder=""
								labelVisible
								name="first_name"
								register={register}
								rules={rules.required}
								error={errors.name}
							/>
							<Input
								title="Last Name"
								placeholder=""
								labelVisible
								name="last_name"
								register={register}
								rules={rules.required}
								error={errors.lastName}
							/>
							<InputEmail
								title="Email"
								placeholder=""
								labelVisible
								name="email"
								register={register}
								rules={rules.required}
								error={errors.email}
							/>
							<InputPhone
								title="Phone"
								placeholder=""
								labelVisible
								name="phone"
								register={register}
								rules={rules.required}
								error={errors.phone}
							/>
							<SelectInput
								title="Gender"
								placeholder=""
								labelVisible
								name="gender"
								values={[
									{ name: 'Female', value: 0 },
									{ name: 'Male', value: 1 },
								]}
								register={register}
								rules={rules.required}
								error={errors.gender}
							/>
							<Input
								title="Country"
								placeholder=""
								labelVisible
								name="country"
								register={register}
								rules={rules.required}
								error={errors.country}
							/>
							<Input
								title="City"
								placeholder=""
								labelVisible
								name="city"
								register={register}
								rules={rules.required}
								error={errors.city}
							/>
							<Input
								title="Address"
								placeholder=""
								labelVisible
								name="address"
								register={register}
								rules={rules.required}
								error={errors.address}
							/>
							<Input
								title="Postcode"
								placeholder=""
								labelVisible
								name="postcode"
								register={register}
								rules={rules.required}
								error={errors.postcode}
							/>
						</div>
						{/* <div className="flex items-center justify-center">
						<Button
							className={clsx(
								'z-10 border borderMain mt-4 px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							type="submit"
							// onClick={() => setAcceptedConditions(true)}
						>
							Mint
						</Button>
					</div> */}
					</div>
					<div className="flex flex-col xl:w-1/2 w-full items-center justify-center gap-4 text-white xl:mt-0 mt-4">
						<div className="flex md:flex-row flex-col justify-center items-center w-full mb-6 md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-center w-full">
									Tokens To Buy
								</h2>
								<p className="text-xl font-semibold text-center">
									<span className="textMain text-center">
										{quantity} {bottle.name} Bottles
									</span>
								</p>
							</div>
						</div>
						<h2 className="text-white text-center font-semibold text-xl">
							{priceusd + ' USD per NFT'}
						</h2>
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
							Estimated Total Price in MATIC: <br />
							{(priceMATIC * quantity).toFixed(4) + ' '}
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
					</div>
				</form>
			</>
		</div>
	);
};
