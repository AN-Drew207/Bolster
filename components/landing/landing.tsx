/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import CoCoCollectionABI from '../../contracts/CoCoCollection.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from './MintComponents';
import { Loading } from './loadingComponent';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';
import { MintBottle } from './mintBottle';
import { MintCoCoCollection } from './mintCoCoCollection';
import Styles from './styles.module.scss';
import { Bottles } from './BottlesComponent/BottlesCollections';
import { useForm } from 'react-hook-form';
import { Input } from 'components/common/form/input';
import { InputText } from 'components/common/form/input-text';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Footer } from 'components/footer';

export const LandingComponent = () => {
	const [view, setView] = React.useState<any>('menu');
	const { Modal, show, isShow, hide } = useModal();
	const {
		handleSubmit,
		register,
		formState: { isValid },
	} = useForm();

	const { bottles } = useRouter().query;

	const { address: addressConnected } = useSelector(
		(state: any) => state.state
	);
	const [address, setAddress] = React.useState<any>('');
	const [clicked, setClicked] = React.useState<any>(false);

	React.useEffect(() => {
		if (bottles) {
			setView('bottle');
		}
	}, [bottles]);

	return (
		<div className="min-h-[90vh]  bg-overlay relative">
			<Toaster position="bottom-center" />
			<img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/>
			<Modal isShow={isShow}>
				<div className="flex items-center justify-center w-full min-h-[90vh]">
					<div
						className={clsx(
							'flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10 relative mt-28 rounded-xl bg-overlay p-10'
						)}
					>
						<div className="flex w-full items-center justify-center">
							<div className="flex w-full  mb-10 text-xl text-white">
								<Button
									onClick={() => {
										hide();
									}}
									className="font-bold"
								>
									Back
								</Button>
							</div>
						</div>
						<h1 className="text-3xl text-white font-bold text-center mb-2">
							Global Memberships Coming Soon!
						</h1>
						{clicked ? (
							<h1 className="text-2xl text-white font-bold text-center mb-4">
								Meanwhile, join our community{' '}
								<div className="flex gap-2 flex-wrap w-full items-center justify-center mt-2">
									<a
										className="text-primary w-8 m-0 flex items-center"
										target="_blank"
										href="https://twitter.com/CoCoBottleClub?s=09"
									>
										<img src="/img/twitter.png" className="w-8 m-0" alt="" />
									</a>
									<a
										className="text-primary w-8 m-0 flex items-center"
										target="_blank"
										href="https://discord.gg/jx79rnJX8t"
									>
										<img src="/img/discord.png" className="w-8 m-0" alt="" />
									</a>
									<a
										className="text-primary w-8 m-0"
										target="_blank"
										href="https://t.me/+TsL_34k_1C81MjI0"
									>
										<img src="/img/Telegram.png" className="w-8 m-0" alt="" />
									</a>
								</div>
							</h1>
						) : (
							<h1 className="text-2xl text-white font-bold text-center mb-4">
								Register your interest{' '}
								<a
									href="https://forms.gle/aohV6cxbeSzyue72A"
									className="textMain"
									target="_blank"
									onClick={() => setClicked(true)}
								>
									here
								</a>
								!
							</h1>
						)}
					</div>
				</div>
			</Modal>
			{!isShow &&
				(view == 'menu' ? (
					<div className="min-h-[90vh] w-full flex items-center justify-center relative px-2">
						{' '}
						<div className="flex flex-col justify-center items-center p-10 md:gap-10 gap-4 bg-overlay md:p-20 p-4 md:py-20 py-16 rounded-xl">
							<div className="flex md:flex-row flex-col md:gap-10 gap-4">
								<Button
									className={clsx(
										'z-10 border borderMain w-72 md:px-16 text-xl p-4 py-4 text-white',
										Styles.button
									)}
									onClick={() => show()}
									// disabled
								>
									Memberships
								</Button>
								<Button
									className={clsx(
										'z-10 border borderMain md:px-16 p-4 py-4 w-72 text-white text-xl',
										Styles.button
									)}
									onClick={() => setView('bottle')}
									// disabled
								>
									Bottle Collections
								</Button>
							</div>
						</div>
					</div>
				) : view == 'bottle' ? (
					<Bottles setView={setView} />
				) : (
					<MintCoCoCollection />
				))}
		</div>
	);
};
