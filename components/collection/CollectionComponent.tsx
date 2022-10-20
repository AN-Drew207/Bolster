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
import { CheckIcon } from '@heroicons/react/outline';
import { MintModal } from 'components/landing/Modals/MintModal';
import { useConnectWalletModal } from 'hooks/useModalConnect';

export const CollectionComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [bottle, setBottle] = React.useState<any>({});
	const [selected, setSelected] = React.useState<any>([]);
	const [web3, setWeb3] = React.useState<any>(null);
	const [accounts, setAccounts] = React.useState<any>(null);
	const [quantity, setQuantity] = React.useState<any>(0);
	const [maxSupply, setMaxSupply] = React.useState<any>(-1);
	const [priceUSD, setPriceUSD] = React.useState<any>(0);
	const [balance, setBalance] = React.useState<any>(0);
	const [priceMATIC, setPriceMATIC] = React.useState<any>(0);
	const [message, setMessage] = React.useState('');

	const {
		connectWalletUpdateData,
		connectWallet,
		connectWalletOffer,
		Mint,
		acceptAnOffer,
		cancelAnOffer,
		exchangeCollection,
		makeAnOffer,
	} = useMetamask();

	const {
		approveBottle,
		mint,
		loginUpdateDataOffer,
		loginBuy,
		acceptAnOfferMagic,
		cancelAnOfferMagic,
		exchangeCollectionMagic,
		makeAnOfferMagic,
	} = useMagicLink();

	const { modal, show: showConnect } = useConnectWalletModal();

	const dispatch = useDispatch();

	const {
		id: bottleContract,
		modal: modalShow,
		offer: offerShow,
	} = useRouter().query;
	const {
		network,
		address,
		offersActiveReceived,
		offersActiveMade,
		networkName,
		bottles,
		typeOfWallet,
	} = useSelector((state: { state: State }) => state.state);

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	const accountChangedHandler = async (newAccount: any) => {
		setIsLoading(true);
		if (newAccount.length === 0) {
			setWeb3(null);
			setAccounts(null);
			// setIsWhitelisted(false);
			setIsLoading(false);
			window.location.reload();
			return false;
		}
		const web3 = await getWeb3();
		const accounts = await (web3 as any).eth.getAccounts();
		setWeb3(web3);
		accounts.push(newAccount[0]);
		accounts[0] = (window as any).ethereum.selectedAddress;
		setAccounts(accounts);
		updateData(accounts[0]);
		setIsLoading(false);
	};

	const updateData = async (address: string) => {
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				: 'localhost:8545'
		);
		const web3 = new Web3(provider);
		console.log(bottleContract);
		const contractInstance = new (web3 as any).eth.Contract(
			BottleCollectionABI,
			bottleContract
		);
		const currentSupply = await contractInstance.methods.supply().call();
		if (address) {
			const balance = await contractInstance.methods.balanceOf(address).call();
			setBalance(balance);
		}

		const priceUSD = await contractInstance.methods.usdPrice().call();
		const decimalsUSD = await contractInstance.methods.decimalsUSD().call();
		const priceMATIC = await contractInstance.methods.getPrice(1).call();
		setPriceUSD(priceUSD / 10 ** decimalsUSD);
		setQuantity(currentSupply);
		setPriceMATIC(Web3.utils.fromWei(priceMATIC, 'ether').substring(0, 8));
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
	};

	React.useEffect(() => {
		if (bottleContract !== undefined) {
			updateData('');

			bottles.map(async (item, index) => {
				console.log(item, bottleContract as string, 'compare');
				if (item.address == bottleContract) {
					const provider = new Web3.providers.HttpProvider(
						process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
							? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
							: 'localhost:8545'
					);
					const web3 = new Web3(provider);
					console.log(bottleContract);
					const contractInstance = new (web3 as any).eth.Contract(
						BottleCollectionABI,
						bottleContract
					);

					const tokensInSell = await contractInstance.methods
						.getOwnerTokens(bottleContract)
						.call();

					console.log(bottleContract, tokensInSell);
					setBottle({
						...item,
						metadata: item.metadata.map((item: any, i: any) => {
							return { ...item, sold: !tokensInSell.includes(i.toString()) };
						}),
					});
				}
			});
		}
	}, [bottleContract, bottles]);

	React.useEffect(() => {
		if (modalShow && typeOfWallet == 'metamask') {
			connectWallet({
				setIsLoading,
				network,
				setWeb3,
				setAccounts,
				updateData,
				show,
			});
		} else if (modalShow && typeOfWallet == 'magic') {
			show();
		} else if (modalShow) {
			toast.error('Please connect your wallet before minting', {
				duration: 3000,
			});
			showConnect();
		}
	}, [modalShow]);

	const getNFTsOneBottle = async () => {
		// console.log(tokensMetadata, 'metadata');
		bottles.map(async (item, index) => {
			console.log(item, (bottleContract as string).toLowerCase(), 'compare');
			if (
				item.address.toLowerCase() == (bottleContract as string).toLowerCase()
			) {
				setBottle(item);
				setSelected(new Array(item.metadata.length).fill(false));
			}
		});
	};

	React.useEffect(() => {
		getNFTsOneBottle();
	}, [bottleContract, bottles, address]);

	const video = React.useRef<any>(null);

	const { Modal, isShow, show, hide } = useModal();

	return (
		<>
			{modal}
			<div
				className={clsx(
					'min-h-screen flex flex-col items-center pt-0 w-full bg-gray-900',
					'relative',
					isLoading || !bottle.address ? 'justify-center' : 'justify-start'
				)}
			>
				<Modal isShow={isShow} hasBg>
					<div
						className={clsx(
							'flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10 relative mt-24'
						)}
					>
						<MintModal
							priceusd={priceUSD}
							priceMATIC={priceMATIC}
							allowance={bottle.allowance}
							quantity={selected.filter((q: boolean) => q).length}
							bottle={bottle}
							hide={hide}
							approve={(address: any) => {
								if (typeOfWallet !== 'metamask') {
									approveBottle(dispatch, bottleContract, address);
								}
							}}
							typeOfWallet={typeOfWallet}
							Mint={(address: any) => {
								console.log('A?', bottleContract);
								if (typeOfWallet == 'metamask') {
									console.log('meta');
									Mint(
										selected
											.map((value: any, id: number) => {
												return { value, id };
											})
											.filter((q: any) => q.value)
											.map((nft: any) => nft.id),
										address,
										setIsLoading,
										bottleContract,
										setMessage,
										// accounts,
										dispatch,
										network,
										networkName,
										hide,
										show,
										setQuantity,
										setMaxSupply
									);
								} else {
									mint(
										bottleContract,
										selected
											.map((value: any, id: number) => {
												return { value, id };
											})
											.filter((q: any) => q.value)
											.map((nft: any) => nft.id),
										address,
										dispatch,
										setMessage,
										hide,
										show,
										setQuantity,
										setMaxSupply
									);
								}
							}}
							currencies={[
								{ name: 'USDC', value: process.env.NEXT_PUBLIC_USDC_ADDRESS },
								{
									name: 'MATIC',
									value: process.env.NEXT_PUBLIC_WMATIC_ADDRESS,
								},
							]}
							quantityMinted={quantity}
							maxSupply={maxSupply}
							accounts={accounts}
							isLoading={isLoading}
							show={show}
							connectWallet={connectWallet}
							message={message}
						/>
					</div>
				</Modal>
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

									{bottle && bottle.metadata.length > 0 ? (
										<>
											<h2 className="text-3xl textMain font-bold pt-10">
												Available NFTs From {bottle.short_name}
											</h2>
											<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 p-4 py-10">
												{bottle.metadata
													.filter((token: any) => !token.sold)
													.map((token: any, i: any) => {
														return (
															<CollectionNFTItem
																active={true}
																token={token}
																network={network}
																networkName={networkName}
																bottle={bottle}
																setBottle={setBottle}
																setIsLoading={setIsLoading}
																typeOfWallet={typeOfWallet}
																selected={selected[i]}
																setSelected={() => {
																	setSelected((prev: any[]) =>
																		prev.map((status, id) =>
																			id == i ? !status : status
																		)
																	);
																}}
															/>
														);
													})}
											</div>
											<h2 className="text-3xl textMain font-bold pt-10">
												Sold NFTs From {bottle.short_name}
											</h2>
											<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 p-4 py-10">
												{bottle.metadata
													.filter((token: any) => token.sold)
													.map((token: any, i: any) => {
														return (
															<CollectionNFTItem
																active={false}
																token={token}
																network={network}
																networkName={networkName}
																bottle={bottle}
																setBottle={setBottle}
																setIsLoading={setIsLoading}
																typeOfWallet={typeOfWallet}
																selected={selected[i]}
																setSelected={() => {
																	setSelected((prev: any[]) =>
																		prev.map((status, id) =>
																			id == i ? !status : status
																		)
																	);
																}}
															/>
														);
													})}
											</div>
										</>
									) : (
										<Loading />
									)}
								</div>
							</>
						</div>
					</div>
				) : (
					<Loading />
				)}
				{selected.length > 0 &&
					selected?.reduce((item: boolean, acc: boolean) => acc || item) && (
						<div className="sticky flex justify-end w-full pb-4 bottom-0 px-4">
							<div
								className="bottom-4 right-2 py-2 px-4 font-bold rounded-md border border-white bg-overlay cursor-pointer text-white hover:text-overlay hover:bg-white transition-all duration-500"
								onClick={() => {
									if (address) {
										show();
									} else {
										showConnect();
										toast.error('Please connect your wallet to mint');
									}
								}}
							>
								Buy NFTs!
							</div>
						</div>
					)}
				<Toaster containerClassName="z-[1000]" />
			</div>
		</>
	);
};

export const CollectionNFTItem = ({
	active,
	network,
	networkName,
	bottle,
	typeOfWallet,
	token,
	setBottle,
	setIsLoading,
	setSelected,
	selected,
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
											hide
										);
									} else {
										transferMeta(
											setBottle,
											bottle.address,
											token.id,
											address,
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
			{/* <Link href={'/bottle/' + bottle.address + '/token/' + token.id}> */}
			<div
				className={clsx('w-40 h-60 relative', {
					['opacity-50']: !active,
					['cursor-pointer']: active,
				})}
				onClick={active ? () => setSelected() : undefined}
			>
				{selected && active && (
					<div className="top-2 right-2 p-1 rounded-full bg-green-600 absolute w-8 text-white ">
						<CheckIcon />
					</div>
				)}
				<img
					src={token.image}
					className="rounded-xl border border-white overflow-hidden h-40 w-40"
					alt=""
				/>{' '}
				<h2 className="p-4 text-center text-white font-bold">{token.name}</h2>
			</div>
			{/* </Link> */}
		</>
	);
};
