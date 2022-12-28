import clsx from 'clsx';
import { Button } from 'components/common/button';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../../landing/loadingComponent';
import Styles from '../styles.module.scss';

export const CancelAnOfferModal: React.FC<any> = ({
	setOptions,
	cancelAnOffer,
	isLoading,
	message,
}) => {
	const { handleSubmit } = useForm({ mode: 'onChange' });
	const [acceptedConditions, setAcceptedConditions] = React.useState(true);

	return (
		<div
			className={clsx(
				'flex flex-col items-center justify-center w-full h-full px-16 py-10 relative md:mt-20 bg-gray-900 rounded-xl border border-white'
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
						onSubmit={handleSubmit(() => cancelAnOffer())}
					>
						<div className="flex md:flex-row flex-col justify-center items-center w-full md:gap-16 gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-left">
									Cancel Offer
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
									'z-10 border border-red-500 mt-4 px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1  font-bold hover:bg-red-500 hover:scale-110 duration-300  '
								)}
								type="submit"
							>
								CANCEL
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
						<h2 className="text-2xl text-secondary mb-2 font-bold text-center">
							Game Rules
						</h2>
						{new Array(3).fill(false).map((xd, i) => {
							return (
								<div className="flex w-full gap-2">
									<p className="text-lg font-bold">{i + 1}.</p>
									<p className="text-lg font-bold">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Hic, sit ipsam! Cupiditate, ipsam molestias officiis
										praesentium quos provident dolor labore, excepturi ea ullam
										ratione nisi esse architecto eius, quisquam animi.
									</p>
								</div>
							);
						})}
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
