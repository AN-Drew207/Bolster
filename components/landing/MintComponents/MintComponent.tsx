import React from 'react';
import { Button } from '../../common/button';
import Styles from '../styles.module.scss';
import clsx from 'clsx';
import { Input } from 'components/common/form/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface Props {
	isWhitelisted: boolean;
	isLoading: boolean;
	accounts: any | any[];
	quantity: number;
	maxSupply: number;
}
interface PropsButton {
	connectWallet: () => void;
	isLoading: boolean;
	accounts: any | any[];
	Mint: (arg1: any) => void;
	isWhitelisted: boolean;
}
export const ButtonMint: React.FC<PropsButton> = ({
	connectWallet,
	isLoading,
	accounts,
	Mint,
	isWhitelisted,
}) => {
	const [quantity, setQuantity] = React.useState(1);
	const { register, handleSubmit } = useForm({ mode: 'onChange' });
	return (
		<div className="flex items-center justify-center">
			{(accounts == null || accounts.length === 0) && !isLoading && (
				<Button
					className={clsx(
						'mt-10 px-16 py-4  transition ease-in-out delay-150 hover:-translate-y-1 hover:shadow-button hover:scale-110 duration-300 ',
						Styles.button
					)}
					onClick={connectWallet}
				>
					Connect Wallet
				</Button>
			)}
			{accounts !== null &&
				accounts[0] !== null &&
				accounts.length !== 0 &&
				isWhitelisted && (
					<form
						className="flex flex-col items-center justify-center gap-4 mt-5"
						onSubmit={handleSubmit(() => Mint(quantity))}
					>
						<Input
							register={register}
							type="number"
							name="quantity"
							value={quantity}
							min={1}
							required
							onChange={(e: any) => {
								setQuantity(e.target.value);
							}}
						></Input>
						<Button
							className={clsx(
								'z-10 border borderMain px-16 py-4 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							type="submit"
						>
							<span translate={'no'}> Mint </span> now!
						</Button>
					</form>
				)}
		</div>
	);
};
export const MintComponent: React.FC<Props> = ({
	isWhitelisted,
	isLoading,
	accounts,
	quantity,
	maxSupply,
}) => {
	return (
		<div className="bg-dark text-white flex flex-col justify-center w-full items-center relative">
			<h1 className="textMain text-center font-black text-5xl mb-6">
				CoCo Bottle Club <br /> Global Membership
			</h1>
			<img src="/logos/Isotype_Gold.png" className="w-64" alt="" />
			<h2 className="mt-6 text-md font-semibold">
				<span className="textMain ">1st Wave</span> Mints
			</h2>
			<h2 className="mb-6 text-md font-semibold">
				<span className="textMain">{quantity}</span> / {maxSupply}
			</h2>
			{(accounts == null || accounts.length === 0) && !isLoading && (
				<h2 className="text-md text-center font-semibold">
					Please Connect Your Wallet to Mint your
					<br /> CoCo Membership NFT and enjoy the CoCo Experience
					<br />
					<Link href="/tutorial">
						<span className="text-primary cursor-pointer">
							See tutorial to connect your wallet to mint
						</span>
					</Link>
				</h2>
			)}
			{accounts !== null && accounts.length !== 0 && !isLoading && (
				<div className="flex flex-col w-full gap-4">
					<h2 className="text-md textMain font-semibold text-center w-full break-words">
						{accounts[0]}
					</h2>
					<h2 className="text-md font-semibold text-center w-full">
						{isWhitelisted
							? 'Hi! you have been added to our whitelist, click mint now in order to get your CoCo Membership!'
							: "Hi, sorry, you are not in our whitelist so you can't mint now"}
					</h2>
				</div>
			)}
		</div>
	);
};
