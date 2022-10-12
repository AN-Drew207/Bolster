import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import clsx from 'clsx';
// import { AreaChartOutlined, GoldenFilled } from '@ant-design/icons';
import { MenuIcon } from '@heroicons/react/outline';
// import { DropdownMenu } from '../dropdownMenu';
import { useDispatch, useSelector } from 'react-redux';
import Styles from '../../landing/styles.module.scss';
import { Button } from '../button';
import { State, updateBottleState } from 'redux/actions';
import BottleCollectionABI from '../../../contracts/BottleCollection.json';
import BottleExchangeABI from '../../../contracts/BottleExchange.json';
import bottlesTestnet from 'bottles_mumbai.json';
import bottlesMainnet from 'bottles_polygon.json';
import Web3 from 'web3';
import { SidebarMobile } from './sidebars/mobile';
import { Dropdown } from '../dropdown/dropdown';
import useMagicLink from 'hooks/useMagicLink';
import { useMetamask } from 'hooks/useMetamask';
import { useConnectWalletModal } from 'hooks/useModalConnect';

const bottles =
	process.env.NEXT_PUBLIC_NETWORK_NAME == 'mumbai'
		? bottlesTestnet
		: bottlesMainnet;

const navItems = [
	{ name: 'HOME', link: '/', icon: <MenuIcon /> },
	// { name: 'HOW TO MINT', link: '/tutorial', icon: <MenuIcon /> },
	// { name: 'GALLERY', link: '/gallery', icon: <MenuIcon /> },
	// { name: 'E-BAR', link: '/eBar', icon: <MenuIcon /> },
];

export const updateDataExchanged = async (
	dispatch: any,
	exchangeAddress: string
) => {
	const provider = new Web3.providers.HttpProvider(
		process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
			? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
			: 'localhost:8545'
	);
	const web3 = new Web3(provider);
	let exchange = new web3.eth.Contract(
		BottleExchangeABI as any,
		exchangeAddress
	);
	for (let i = 0; i < bottles.length; i++) {
		let bottle = new web3.eth.Contract(
			BottleCollectionABI as any,
			bottles[i].address
		);
		let exchanged = await exchange.methods
			.collections(bottles[i].address)
			.call();
		let supply = await bottle.methods.supply().call();
		let maxSupply = await bottle.methods.maxSupply().call();
		dispatch(
			updateBottleState({
				index: i,
				exchanged: exchanged.exchanged,
				supply: supply,
				maxSupply: maxSupply,
			})
		);
	}
};

export default function AppLayout() {
	const router = useRouter();
	const {
		address,
		offersActiveReceived,
		offersActiveMade,
		network,
		networkName,
		exchange,
		typeOfWallet,
	} = useSelector((state: { state: State }) => {
		return state.state;
	});
	const [isExecuted, setIsExecuted] = React.useState(false);
	const [sideBarOpen, setSidebarOpen] = React.useState(false);
	const dispatch = useDispatch();
	const { login, showWallet, disconnect } = useMagicLink();
	const { connectWalletUpdateData } = useMetamask();
	const { modal, show } = useConnectWalletModal();

	const { magicReload } = useRouter().query;

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	React.useEffect(() => {
		if (bottles) {
			// connectWalletUpdateData(dispatch, network, networkName);
			updateDataExchanged(dispatch, exchange);
		}
	}, [bottles]);

	React.useEffect(() => {
		if (magicReload) {
			// connectWalletUpdateData(dispatch, network, networkName);
			login(dispatch);
		}
	}, [magicReload]);

	const accountChangedHandler = (newAccounts: any[]) => {
		if (newAccounts.length == 0) {
			window.location.reload();
		} else {
			connectWalletUpdateData(dispatch, network, networkName);
		}
	};

	if (
		typeof window !== 'undefined' &&
		(window as any).ethereum !== undefined &&
		(window as any).ethereum.isConnected() &&
		!isExecuted
	) {
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
		setIsExecuted(true);
	}

	return (
		<>
			<nav
				className={clsx(
					'fixed top-0 z-50',
					'bg-gray-900',
					'w-[100%] xl:px-56 lg:px-36 px-8 py-4 flex flex-row items-center justify-between shadow-md'
				)}
			>
				{modal}
				<div className="flex items-center">
					<Logo />
				</div>
				<div className="md:flex hidden items-center">
					{navItems.map((item, index) => {
						return (
							<div key={item.name + index}>
								<NavbarItem
									key={index}
									name={item.name}
									icon={item.icon}
									link={item.link}
									route={router.asPath}
								/>
							</div>
						);
					})}

					{address ? (
						<>
							<div>
								<NavbarItem
									name={'MY NFTS'}
									icon={''}
									link={'/eBar'}
									route={router.asPath}
								/>
							</div>
							{/* <DropdownMenu
								title="YOUR OFFERS"
								received={offersActiveReceived}
								made={offersActiveMade}
							></DropdownMenu> */}
							{typeOfWallet == 'magic' && (
								<Dropdown title="ACCOUNT">
									<div className="flex flex-col gap-4 p-4 w-72">
										<Button
											className={clsx(
												'z-10 border borderMain px-2 py-2 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
												Styles.button
											)}
											onClick={() => showWallet()}
										>
											Show Wallet
										</Button>
										<Button
											className={clsx(
												'z-10 border borderMain px-2 py-2 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
												Styles.button
											)}
											onClick={() => disconnect(dispatch)}
										>
											Disconnect
										</Button>
									</div>
								</Dropdown>
							)}
						</>
					) : (
						// <Dropdown title="CONNECT WALLET">
						// 	{loading ? (
						// 		<div className="flex flex-col gap-4 p-4 h-24 items-center justify-center w-72">
						// 			<Loading small />
						// 		</div>
						// 	) : (
						// 		<div className="flex flex-col gap-4 p-4 w-72">
						// 			<Button
						// 				className={clsx(
						// 					'z-10 border borderMain px-2 py-2 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
						// 					Styles.button
						// 				)}
						// 				onClick={() =>
						// 					connectWalletUpdateData(dispatch, network, networkName)
						// 				}
						// 			>
						// 				<div className="flex items-center justify-center">
						// 					<img
						// 						src="/icons/metamask_logo.png"
						// 						className="w-10"
						// 						alt=""
						// 					/>{' '}
						// 					Connect with Metamask
						// 				</div>
						// 			</Button>
						// 			<Button
						// 				className={clsx(
						// 					'z-10 border borderMain px-2 py-2 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
						// 					Styles.button
						// 				)}
						// 				onClick={() => login(dispatch)}
						// 			>
						// 				<div className="flex items-center justify-center gap-2">
						// 					<MailOutlined className="text-lg" /> Connect with Email
						// 				</div>
						// 			</Button>
						// 		</div>
						// 	)}
						// </Dropdown>
						<Button
							className={clsx(
								'z-10 border borderMain px-2 py-2 text-white transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							onClick={() => show()}
						>
							Connect Wallet
						</Button>
					)}
				</div>
				<div
					className="md:hidden flex"
					onClick={() => {
						setSidebarOpen(true);
					}}
				>
					<MenuIcon
						className="h-6 w-6 text-white cursor-pointer"
						aria-hidden="true"
					/>
				</div>
			</nav>
			<SidebarMobile
				sidebarOpen={sideBarOpen}
				setSidebarOpen={setSidebarOpen}
				navItems={navItems}
				offersActiveReceived={offersActiveReceived}
				offersActiveMade={offersActiveMade}
				dispatch={dispatch}
				network={network}
				networkName={networkName}
			/>
		</>
	);
}

export const Message: React.FunctionComponent<{
	content: string;
	open: boolean;
}> = (props) => {
	const { content, open } = props;

	return (
		<div
			className={clsx(
				`absolute bottom-3.5 left-3.5 bg-purple-300 px-10 py-4 rounded-md`,
				'ease-out duration-300',
				open ? 'scale-100' : 'scale-0'
			)}
		>
			{content}
		</div>
	);
};

export const Logo = () => (
	<a href="https://thecoco.club/">
		<div className="mr-4 md:py-0 h-16 flex items-center justify-center text-white uppercase cursor-pointer">
			Mezcal Shhh!
		</div>
	</a>
);

export const NavbarItem: React.FC<any> = ({ name, link, route }) => {
	return (
		<Link href={link}>
			<div className={clsx('sm:px-4 px-2 py-2 relative cursor-pointer')}>
				<div
					className={clsx(
						{ 'text-white': link !== route },
						{ 'text-primary': link === route },
						'gap-2 flex items-center'
					)}
				>
					{/* <div className="flex items-center w-4">{icon}</div> */}
					<h3 className={clsx('text-md font-bold text-center')}>{name}</h3>
				</div>
			</div>
		</Link>
	);
};
