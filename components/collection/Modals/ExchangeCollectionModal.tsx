import clsx from 'clsx';
import { Button } from 'components/common/button';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../../landing/loadingComponent';
import Styles from '../styles.module.scss';
import { sendForm } from '@emailjs/browser';
import toast from 'react-hot-toast';

export const ExchangeCollection: React.FC<any> = ({
	setOptions,
	exchangeCollection,
	name,
	address,
	isLoading,
	message,
}) => {
	const { handleSubmit } = useForm({ mode: 'onChange' });
	const [acceptedConditions, setAcceptedConditions] = React.useState(false);
	const [formSent, setFormSent] = React.useState(false);

	const sendEmail = (e: any) => {
		e.preventDefault();
		sendForm(
			'service_99nmicq',
			'template_to8xh8w',
			e.target,
			'crkxSdJHxLiYQ8I0F'
		).then(
			(result) => {
				console.log(result.text);
				toast.success(
					'The form has been successfully sent, please proceed with your redeem',
					{ duration: 5000 }
				);
				setFormSent(true);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<div
			className={clsx(
				'flex flex-col items-center justify-center w-full h-full px-16 py-10 relative md:mt-20 bg-gray-900 rounded-xl border border-white max-w-[1000px]'
			)}
		>
			{acceptedConditions && formSent ? (
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
						onSubmit={handleSubmit(() => exchangeCollection())}
					>
						<div className="flex md:flex-row flex-col justify-center items-center w-full md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Redeem Collection
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
							<Button
								className={clsx(
									'z-10 border borderMain mt-4 px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
									Styles.button
								)}
								type="submit"
							>
								Redeem!
							</Button>
						)}
					</form>
				</>
			) : acceptedConditions ? (
				<div className="flex flex-col items-center justify-center w-full h-full relative">
					<form
						className="flex flex-col items-center gap-4"
						onSubmit={sendEmail}
					>
						<h2 className="text-2xl font-semibold text-center text-secondary">
							Contact Form
						</h2>
						<p className="text-md text-center text-secondary">
							Please submit your data to allow us to contact you and give you
							the bottle when you make the redeem.
						</p>
						<input
							type="text"
							name="name"
							placeholder="Name"
							className="rounded-xl w-full"
						/>
						<input
							type="text"
							className="hidden"
							value={name}
							name="bottle"
							placeholder="Name"
						/>
						<input
							type="text"
							className="hidden"
							value={address}
							name="wallet_address"
							placeholder="Name"
						/>
						<input
							type="text"
							name="last_name"
							placeholder="Last Name"
							className="rounded-xl w-full"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="rounded-xl w-full"
						/>{' '}
						<p className="text-md text-secondary">
							<span className="font-bold">Note:</span> We will contact you asap
							by the email you are sending, also we will use{' '}
							<a
								className="text-secondary"
								href="https://ethermail.io/"
								target="_blank"
							>
								Etheremail
							</a>{' '}
							as a contact way to your address, please look at it.
						</p>
						<Button
							className={clsx(
								'z-10 border borderMain mt-4 px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							type="submit"
						>
							Send
						</Button>
					</form>
				</div>
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
						<h2 className="text-2xl text-secondary mb-2 font-bold text-center">
							Exchange Collection
						</h2>
						<div className="flex w-full gap-2">
							<p className="text-lg text-center font-bold">
								You are about to exchange the{' '}
								<span className="text-secondary">{name}</span> Bottle
								Collection, this exchange means burning all the tokens of the
								collections and receiving a Non-transferible token representing
								you have exchanged the bottle, a NFT Art that we will be sent to
								you and we will be in touch with you to reach the delivery of
								the bottle
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
