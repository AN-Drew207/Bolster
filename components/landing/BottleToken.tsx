/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import BottleCollectionABI from '../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../contracts/BottleExchange.json';
import ERC20ABI from '../../contracts/ERC20.json';
import getWeb3 from '../getWeb3';
import { ButtonMint, MintComponent } from './MintComponents';
import { Loading } from './loadingComponent';
import { useModal } from 'hooks/modal';
import { Button } from 'components/common/button/button';
import Web3 from 'web3';
import { MintComponentBottle } from './MintComponents/MintComponentBottle';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { MakeAnOfferModal } from './Modals/MakeAnOfferModal';
import { MintModal } from './Modals/MintModal';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './styles.module.scss';
import { State } from 'redux/actions';
import { AcceptAnOfferModal } from './Modals/AcceptAnOfferModal';
import { CancelAnOfferModal } from './Modals/CancelAnOfferModal';
// import bottles from 'bottles.json';
import { ExchangeCollection } from './Modals/ExchangeCollectionModal';
import { GetAmountBackModal } from './Modals/getAmountBackModal';
import { GameRulesModal } from './Modals/GameRulesModal';
import { useMetamask } from 'hooks/useMetamask';
import useMagicLink from 'hooks/useMagicLink';
import { useConnectWalletModal } from 'hooks/useModalConnect';

export const BottleToken: React.FC<any> = ({ id: xd }) => {
	const [web3, setWeb3] = React.useState<any>(null);
	const [accounts, setAccounts] = React.useState<any>(null);
	const [haveNFT, setHaveNFT] = React.useState<any>(false);
	const [exchange, setExchanged] = React.useState<any>(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [bottle, setBottle] = React.useState<any>({});

	const { id: bottleContract, tokenId } = useRouter().query;

	const { bottles, address, networkName, network, typeOfWallet } = useSelector(
		(state: { state: State }) => state.state
	);

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
		setIsLoading(false);
	};

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
				console.log(tokensOfUser);
				setHaveNFT(tokensOfUser.includes(tokenId));
				console.log(tokensMetadata, 'response');
				setBottle({
					...item,
					tokensOfUser: tokensOfUser,
					NFTs: tokensMetadata.map((t: any, index: any) => {
						return { ...(t as Object), id: (index + 1).toString() };
					}),
				});
			}
		});
	};

	React.useEffect(() => {
		if (bottleContract !== undefined) {
			bottles.map((item, index) => {
				console.log(item, bottleContract as string, 'compare');
				if (item.address == bottleContract) {
					setBottle(item);
				}
			});
		}
	}, [bottleContract, bottles]);

	React.useEffect(() => {
		if (bottleContract && address && typeOfWallet !== 'magic') {
			getNFTsOneBottle();
		} else if (address && typeOfWallet == 'magic') {
			console.log('get magic');
			getNFTsOneBottleMagic(bottleContract, setBottle);
		}
	}, [bottleContract, bottles, address]);

	React.useEffect(() => {
		console.log(bottle);
	}, [bottle]);

	return (
		<>
			<div
				className={clsx(
					'min-h-screen flex flex-col items-center pt-40 w-full bg-gray-900',
					'relative',
					isLoading || !bottle.short_name ? 'justify-center' : 'justify-start'
				)}
			>
				<div className={clsx({ ['hidden']: !haveNFT }, 'text-white')}>
					Has NFT!
				</div>
			</div>
		</>
	);
};
