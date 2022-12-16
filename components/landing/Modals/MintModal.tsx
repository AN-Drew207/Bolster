// import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { LeftOutlined } from '@ant-design/icons';
import clsx from 'clsx';
// import { CollectionNFTItem } from 'components/collection/CollectionComponent';
import { Button } from 'components/common/button';
// import { Input } from 'components/common/form/input';
// import { InputEmail } from 'components/common/form/input-email';
// import { InputPhone } from 'components/common/form/input-phone/input-phone';
// import { Typography } from 'components/common/typography';
// import { SelectInput } from 'components/common/form/SelectInput';
import * as React from 'react';
// import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { useForm } from 'react-hook-form';
import { Loading } from '../loadingComponent';
// import { Loading } from '../loadingComponent';

export const MintModal: React.FC<any> = ({
	hide,
	Mint,
	priceusd,
	priceMATIC,
	currencies,
	// quantityMinted,
	// maxSupply,
	message,
	isLoading,
	allowance,
	approve,
	typeOfWallet,
	quantity,
	selected,
	bottle,
}) => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	setValue,
	// 	formState: { errors, isDirty, isValid },
	// } = useForm({
	// 	mode: 'onChange',
	// });

	const {
		// register: registerBuy,
		handleSubmit: handleSubmitBuy,
		// formState: { errors: errorsBuy },
	} = useForm({ mode: 'onChange' });

	const [address, setAddress] = React.useState(currencies[0]?.value);
	// const [section, setSection] = React.useState('user_data');
	// const [userData, setUserData] = React.useState<any>();

	// const TOKEN_GOOGLE_API = 'AIzaSyDNQIlXXD79FkgsqYnSr9RRVkywb-j6RC0';

	// const disabled = !isDirty || !isValid;
	// console.log(errors, isValid, isDirty);

	console.log(selected, 'selected', bottle.metadata);

	return (
		<div
			className={clsx(
				'grid grid-cols-2 items-center justify-center w-full h-full pt-10 relative bg-gray-900 rounded-xl'
			)}
		>
			<>
				{' '}
				<div className="flex w-full gap-4 items-center justify-center px-10">
					<div className="flex w-full gap-2 text-lg text-white items-center">
						<Button
							onClick={() => {
								hide();
							}}
							className="font-bold flex"
						>
							<LeftOutlined />
						</Button>
						<h2 className="text-lg font-semibold text-center">
							Transaction resume:
						</h2>
					</div>
				</div>
				<form
					className="flex flex-col gap-8 justify-center items-center w-full"
					onSubmit={handleSubmitBuy((data) => {
						// console.log(data, userData);
						if (
							allowance < priceusd * quantity &&
							address ==
								currencies.filter((item: any) => item.name == 'USDC')[0]
									?.value &&
							typeOfWallet == 'magic'
						) {
							approve(address);
						} else {
							Mint({ ...data }, address);
						}
					})}
				>
					<div
						className={clsx(
							'flex flex-col w-full items-center justify-center gap-4 text-white xl:mt-0 mt-4'
						)}
					>
						<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 p-4">
							{selected?.map((item: any) => {
								return (
									item.value && (
										<div className={clsx('w-40 h-60 relative')}>
											<img
												src={bottle?.metadata[item?.id]?.image}
												className="rounded-xl border border-white overflow-hidden h-40 w-40"
												alt=""
											/>{' '}
											<h2 className="p-4 text-center text-white font-bold">
												{bottle?.metadata[item?.id]?.name}
											</h2>
										</div>
									)
								);
							})}
						</div>
						<div className="flex flex-col gap-2 pt-4 items-end w-full border-t border-white  px-10">
							<div className="flex gap-4">
								{currencies.map((item: any) => {
									return (
										<div
											className={clsx(
												{ ['!bg-white !text-overlay']: item.value == address },
												'py-1 px-2 border border-white font-bold text-[12px] flex gap-2 items-center rounded-xl cursor-pointer'
											)}
											onClick={() => {
												setAddress(item.value);
											}}
										>
											<img src={item.image} className="w-6 h-6" alt="" />
											<p>{item.name}</p>
										</div>
									);
								})}
							</div>
							<div className="flex items-center gap-2">
								{address ==
									currencies.filter((item: any) => item.name == 'USDC')[0]
										.value && (
									<h2 className="text-white text-left text-md">
										Transaction Info: {quantity} NFTs for{' '}
										{priceusd * quantity + ' '}
										<span className="font-semibold textMain">USDC</span>
									</h2>
								)}

								{address ==
									currencies.filter((item: any) => item.name == 'MATIC')[0]
										.value && (
									<h2 className="text-white text-left text-md">
										Transaction Info: {quantity} NFTs for{' '}
										{(priceMATIC * quantity).toFixed(4) + ' '}
										<span className="font-semibold textMain">MATIC</span>
									</h2>
								)}
								{isLoading ? (
									<>
										<Loading small />
										<h2 className="text-sm text-center textMain">{message}</h2>
									</>
								) : (
									<Button
										className={clsx('text-white border-white border p-2')}
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
						</div>
					</div>
					<div></div>
				</form>
			</>
		</div>
	);
};
