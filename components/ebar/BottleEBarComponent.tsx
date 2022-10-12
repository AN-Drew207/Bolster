/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import BottleCollectionABI from '../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../contracts/BottleExchange.json';
import ERC20ABI from '../../contracts/ERC20.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from '../landing/MintComponents';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Styles from '../landing/styles.module.scss';
import { State, updateState, updateTokensOfUser } from 'redux/actions';
import { multiply } from 'components/common/multiply';
import { Loading } from 'components/landing/loadingComponent';
import { ParagraphArtist } from 'components/landing/MintComponents/MintComponentBottle';
import useMagicLink from 'hooks/useMagicLink';
import { useForm } from 'react-hook-form';
import { useMetamask } from 'hooks/useMetamask';

export const BottleEBarComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [exchanged, setExchanged] = React.useState(false);
	const [bottle, setBottle] = React.useState<any>({});

	const {
		id: bottleContract,
		modal: modalShow,
		offer: offerShow,
	} = useRouter().query;

	const { bottles, address, networkName, network, typeOfWallet } = useSelector(
		(state: { state: State }) => state.state
	);
	const dispatch = useDispatch();
	const { account, getNFTsOneBottleMagic } = useMagicLink();

	const getNFTsOneBottle = async () => {
		const web3: any = await getWeb3();
		const accounts = await web3.eth.getAccounts();
		await (window as any).ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [
				{
					chainId: '0x' + parseInt(network).toString(16),
				},
			],
		});
		const networkId = await web3.eth.net.getId();

		if (networkId != network) {
			return alert(
				`You are not on the ${networkName} network, set network to ${network}`
			);
		}
		let bottle: any;
		const exchangeAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
			: '';
		let exchange = new web3.eth.Contract(
			BottleExchangeABI as any,
			exchangeAddress
		);

		// console.log(tokensMetadata, 'metadata');
		bottles.map(async (item, index) => {
			console.log(item, (bottleContract as string).toLowerCase(), 'compare');
			if (
				item.address.toLowerCase() == (bottleContract as string).toLowerCase()
			) {
				const collection = await exchange.methods
					.collections(item.address)
					.call();
				console.log(collection, 'collection');
				if (collection.exchanged == false) {
					bottle = new web3.eth.Contract(BottleCollectionABI, item.address);
					const tokensOfUser = await bottle.methods
						.getOwnerTokens(accounts[0])
						.call();

					const supply = await bottle.methods.supply().call();
					const arraySupply = new Array(parseInt(supply))
						.fill(false)
						.map((xd, index) => index);
					const tokensMetadata = arraySupply.map((token: any) => {
						return item.metadata[token];
					});
					console.log(tokensMetadata, 'response');
					setBottle({
						...item,
						tokensOfUser: tokensOfUser,
						NFTs: tokensMetadata.map((t: any, index: any) => {
							return { ...(t as Object), id: (index + 1).toString() };
						}),
					});
					setExchanged(false);
				} else {
					console.log('true');
					const tokenExchangedURI = await exchange.methods
						.tokenURI(collection.collectionId)
						.call();
					const promiseMetadata = await Promise.resolve(
						await (await fetch(tokenExchangedURI)).json()
					);
					setBottle({
						...item,
						finalToken: promiseMetadata,
					});
					setExchanged(true);
				}
			}
		});
	};

	React.useEffect(() => {
		if (bottleContract && address && typeOfWallet !== 'magic') {
			getNFTsOneBottle();
		} else if (address && typeOfWallet == 'magic') {
			console.log('get magic');
			getNFTsOneBottleMagic(bottleContract, setBottle, setExchanged);
		}
	}, [bottleContract, bottles, address]);

	React.useEffect(() => {
		console.log(bottle);
	}, [bottle]);

	const video = React.useRef<any>(null);

	return (
		<>
			<div
				className={clsx(
					'min-h-screen flex flex-col items-center pt-0 w-full bg-gray-900',
					'relative',
					isLoading || !bottle.address ? 'justify-center' : 'justify-start'
				)}
			>
				{/* <img
					src="/img/bg_membership.jpg"
					className="fixed h-full w-full"
					alt=""
				/> */}
				{!isLoading && bottle && bottle.address ? (
					<div className="flex justify-center items-start w-full">
						<div className="min-h-screen flex flex-col gap-4 items-center py-32 xl:w-4/5 w-full xl:px-0 px-8 justify-start relative">
							<div className="flex justify-between w-full">
								<Link href="/eBar">
									<div className="font-bold md:text-xl text-md mb-4  text-white cursor-pointer">
										Back to eBar
									</div>
								</Link>
								<Link href={'/bottle/' + bottle.address}>
									<div className="font-bold md:text-xl text-md mb-4 text-white cursor-pointer">
										Go to Bottle
									</div>
								</Link>
							</div>
							{exchanged ? (
								<>
									<div className="flex rounded-xl flex-col items-center justify-center w-full bg-overlay border border-yellow-400 p-8">
										<h2 className="text-3xl text-yellow-400 font-bold pb-4">
											{bottle.name}
										</h2>
										<video
											src={bottle.image}
											autoPlay
											loop
											className="rounded-xl border border-yellow-400 h-auto md:w-2/3 w-full"
											ref={video}
										></video>

										<h2 className="text-3xl text-yellow-400 font-bold pt-10">
											Final NFT Art from {bottle.short_name}
										</h2>
										{bottle && bottle.finalToken ? (
											<div className="flex lg:flex-row flex-col items-center justify-center gap-x-10 gap-y-4 p-4 py-10">
												<img
													src={bottle.finalToken.image}
													className="lg:w-1/2 w-full rounded-xl	border border-yellow-400"
													alt=""
												/>
												<div className="flex lg:flex-col flex-col-reverse items-center justify-center gap-x-2 gap-y-4 lg:w-1/2 w-full">
													<img
														src={bottle.artist.photo[0]}
														className="rounded-xl h-80"
														alt=""
													/>
													<h2 className="text-white text-md font-bold">
														Art Made By{' '}
														<span className="text-yellow-400">
															{bottle.artist.name}
														</span>
													</h2>
													<div className="flex flex-col gap-2">
														<div className="flex flex-col w-full items-center justify-center gap-4 mt-4">
															{bottle.artist.paragraphs.map(
																(paragraph: any) => {
																	return (
																		<ParagraphArtist
																			title={paragraph.title}
																			text={paragraph.text}
																		/>
																	);
																}
															)}
														</div>
													</div>
												</div>
											</div>
										) : (
											<Loading />
										)}
									</div>
								</>
							) : (
								<>
									<div className="flex rounded-xl flex-col items-center justify-center w-full bg-overlay border border-dark-800 p-8">
										<h2 className="text-3xl textMain font-bold pb-4">
											{bottle.name}
										</h2>
										<video
											src={bottle.image}
											autoPlay
											loop
											className="rounded-xl border border-white h-auto md:w-2/3 w-full"
											ref={video}
										></video>

										<h2 className="text-3xl textMain font-bold pt-10">
											NFTs From {bottle.short_name}
										</h2>
										{bottle && bottle.NFTs ? (
											<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 p-4 py-10">
												{bottle.NFTs.map((token: any) => {
													console.log(
														bottle.tokensOfUser,
														token,
														token.id,
														bottle.tokensOfUser.includes(token.id)
													);
													return (
														<BottleNFTItem
															active={bottle.tokensOfUser.includes(token.id)}
															token={token}
															network={network}
															networkName={networkName}
															bottle={bottle}
															setBottle={setBottle}
															setExchanged={setExchanged}
															setIsLoading={setIsLoading}
															typeOfWallet={typeOfWallet}
														/>
													);
												})}
											</div>
										) : (
											<Loading />
										)}
									</div>
								</>
							)}
						</div>
					</div>
				) : !address && !account ? (
					<div className="text-center relative text-2xl text-white font-bold h-[60vh] flex items-center justify-center px-6">
						<div className="bg-overlay rounded-xl p-6">
							Please Connect Your Wallet To See this Section
						</div>
					</div>
				) : (
					<Loading />
				)}
				<Toaster containerClassName="z-[1000]" />
			</div>
		</>
	);
};

export const BottleNFTItem = ({
	active,
	network,
	networkName,
	bottle,
	typeOfWallet,
	token,
	setBottle,
	setExchanged,
	setIsLoading,
}: any) => {
	const { Modal, isShow, show, hide } = useModal();
	const { transfer } = useMagicLink();
	const { transferMeta } = useMetamask();
	const { handleSubmit } = useForm();
	const [address, setAddress] = useState('');
	return (
		<>
			<Modal isShow={isShow} hasBg>
				<div className="min-h-[100vh] flex flex-col items-center justify-center w-full">
					<div className="min-h-[50vh] bg-overlay rounded-md p-6 2xl:min-w-[50vw] min-w-full">
						<div className="flex justify-between mb-4">
							<div
								className="text-white font-bold cursor-pointer"
								onClick={hide}
							>
								Back
							</div>
							<a
								href={`https://${
									network != '137' ? 'testnets.' : ''
								}opensea.io/assets/${networkName}/${bottle.address}/${
									token.id
								}`}
								target="_blank"
								className="text-white font-bold flex items-center gap-2"
							>
								View in{' '}
								<img src="/icons/opensea.svg" className="h-4 w-4" alt="" />
							</a>
						</div>
						<div className="flex gap-8 h-full items-center justify-center">
							<img
								src={token.image}
								className="w-96 shrink-0 rounded-xl border border-white"
								alt=""
							/>
							<form
								onSubmit={handleSubmit(() => {
									if (typeOfWallet == 'magic') {
										transfer(
											setBottle,
											bottle.address,
											token.id,
											address,
											setExchanged,
											hide
										);
									} else {
										transferMeta(
											setBottle,
											bottle.address,
											token.id,
											address,
											setExchanged,
											hide,
											setIsLoading
										);
									}
								})}
								className="w-full flex flex-col items-center justify-center gap-4"
							>
								<h2 className="textMain font-bold text-lg">
									Transfer NFT {token.name}
								</h2>

								<input
									type="text"
									name="address"
									placeholder="Wallet Address to transfer"
									className="rounded-xl w-full"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
								<Button
									className={clsx(
										'z-10 borderborderMain md:text-lg text-sm  py-2 px-6 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
										Styles.button
									)}
									type="submit"
								>
									Send
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Modal>
			<Link href={'/bottle/' + bottle.address + '/token/' + token.id}>
				<div
					className={clsx(
						{ ['opacity-50']: !active },
						{ ['cursor-pointer']: active },
						'w-40 h-60'
					)}
					// onClick={active ? () => show() : undefined}
				>
					<img
						src={token.image}
						className="rounded-xl border border-white overflow-hidden h-40 w-40"
						alt=""
					/>{' '}
					<h2 className="p-4 text-center text-white font-bold">{token.name}</h2>
				</div>
			</Link>
		</>
	);
};
