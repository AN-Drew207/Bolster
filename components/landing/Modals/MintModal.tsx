import { ExclamationCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Input } from 'components/common/form/input';
import { InputEmail } from 'components/common/form/input-email';
import { InputPhone } from 'components/common/form/input-phone/input-phone';
import { SelectInput } from 'components/common/form/SelectInput';
import { Typography } from 'components/common/typography';
// import { SelectInput } from 'components/common/form/SelectInput';
import * as React from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
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
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
	});

	const {
		register: registerBuy,
		handleSubmit: handleSubmitBuy,
		formState: { errors: errorsBuy },
	} = useForm({ mode: 'onChange' });

	const [address, setAddress] = React.useState();
	const [section, setSection] = React.useState('user_data');
	const [userData, setUserData] = React.useState<any>();

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

	const TOKEN_GOOGLE_API = 'AIzaSyDNQIlXXD79FkgsqYnSr9RRVkywb-j6RC0';

	const disabled = !isDirty || !isValid;
	console.log(errors, isValid, isDirty);

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
				<div
					className={clsx(
						{ ['hidden']: section !== 'user_data' },
						'flex flex-col w-full gap-4 text-white items-center'
					)}
				>
					<form
						className="flex flex-col w-full gap-4 text-white items-center w-full"
						onSubmit={handleSubmit((data) => {
							setUserData(data);
							setSection('buy');
						})}
					>
						{' '}
						<h1 className="text-primary font-bold w-full text-center text-2xl">
							Delivery Data
						</h1>
						<div className="flex flex-col gap-2">
							<div className="flex xl:flex-row flex-col gap-2">
								<Input
									type="text"
									title="First Name"
									placeholder=""
									labelVisible
									name="first_name"
									register={register}
									rules={rules.required}
									error={errors.first_name}
								/>
								<Input
									title="Last Name"
									type="text"
									placeholder=""
									labelVisible
									name="last_name"
									register={register}
									rules={rules.required}
									error={errors.last_name}
								/>
							</div>
							<div className="flex xl:flex-row flex-col gap-2">
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
							</div>
							<div className="flex flex-col gap-1">
								<div className="flex-auto">
									<Typography
										type="label"
										className={clsx(
											{ 'text-status-error': errors.address },
											'ml-3 font-bold mb-2 block f-18'
										)}
									>
										Address
									</Typography>
								</div>

								<Input
									name="address"
									register={register}
									className="hidden"
								></Input>

								<ReactGoogleAutocomplete
									apiKey={TOKEN_GOOGLE_API}
									onPlaceSelected={(place: any) => {
										console.log(place.address_components, 'place');
										setValue('address', place.formatted_address);
										place.address_components.map((item: any) => {
											console.log(item, 'address');
											if (item.types.includes('country')) {
												setValue('country', item.long_name);
											}
											if (item.types.includes('postal_code')) {
												setValue('postcode', item.long_name);
											}
											if (item.types.includes('administrative_area_level_2')) {
												setValue('city', item.long_name);
											}
											if (item.types.includes('locality')) {
												setValue('province', item.long_name);
											}
										});
									}}
									options={{
										componentRestrictions: { country: 'uk' },
									}}
									language={'en'}
									className="py-3 px-4 bg-overlay rounded-md border border-white placeholder-white"
									placeholder=""
								/>
								<caption className="text-sm flex gap-2">
									<ExclamationCircleIcon className="w-4" />
									The fields below are filled when you select a location in the
									address dropdown, this is showed when you text.
								</caption>
							</div>
							<div className="flex xl:flex-row flex-col gap-2">
								<Input
									title="Country"
									type="text"
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
									type="text"
									labelVisible
									name="city"
									register={register}
									rules={rules.required}
									error={errors.city}
								/>
							</div>
							<div className="flex xl:flex-row flex-col gap-2">
								<Input
									title="Province"
									type="text"
									placeholder=""
									labelVisible
									name="province"
									register={register}
									rules={rules.required}
									error={errors.province}
								/>
								<Input
									title="Postcode"
									type="text"
									placeholder=""
									labelVisible
									name="postcode"
									register={register}
									rules={rules.required}
									error={errors.postcode}
								/>
							</div>

							<Button
								className={clsx(
									'z-10 border borderMain text-white mt-4 px-16 py-4 text-white transition ease-in-out delay-150 duration-300',
									{ [Styles.button]: !disabled }
								)}
								type="submit"
								disabled={disabled}
							>
								Next
							</Button>
						</div>
					</form>
				</div>
				<form
					className="flex xl:flex-row flex-col gap-8 justify-between items-start w-full"
					onSubmit={handleSubmitBuy((data) => {
						console.log(data, userData);
						if (
							allowance < priceusd * quantity &&
							address ==
								currencies.filter((item: any) => item.name == 'USDC')[0]
									?.value &&
							typeOfWallet == 'magic'
						) {
							approve(address);
						} else {
							Mint({ ...data, ...userData }, address);
						}
					})}
				>
					<div
						className={clsx(
							{ ['hidden']: section !== 'buy' },
							'flex flex-col w-full items-center justify-center gap-4 text-white xl:mt-0 mt-4'
						)}
					>
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
							register={registerBuy}
							rules={rules.required}
							error={errorsBuy.currency}
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
