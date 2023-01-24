import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import clsx from 'clsx';
// import { AreaChartOutlined, GoldenFilled } from '@ant-design/icons';
import { MenuIcon } from '@heroicons/react/outline';
// import { DropdownMenu } from '../dropdownMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';
import { State, updateBottleState } from 'redux/actions';
import BottleCollectionABI from '../../../contracts/BottleCollection.json';
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
	// { name: 'WHAT IS BOLSTER', link: '/', icon: <MenuIcon /> },
	// { name: 'BENEFITS', link: '/#benefits', icon: <MenuIcon /> },
	{
		name: 'HOME',
		link: '/',
		icon: <MenuIcon />,
	},
	{
		name: 'NFTs',
		icon: <MenuIcon />,
		items: [
			{ name: 'COLLECTIONS', link: '/collections' },
			{ name: 'SINGLES', link: '/singles' },
		],
	},
	{ name: 'CONTACT US', link: '/#for_artists', icon: <MenuIcon /> },
	// { name: 'FOR ARTISTS', link: '/artists', icon: <MenuIcon /> },
	// { name: 'GALLERY', link: '/gallery', icon: <MenuIcon /> },
	// { name: 'E-BAR', link: '/eBar', icon: <MenuIcon /> },
];

export const updateDataExchanged = async (dispatch: any) => {
	try {
		const provider = new Web3.providers.HttpProvider(
			process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				? process.env.NEXT_PUBLIC_SECONDARY_PROVIDER
				: 'localhost:8545'
		);
		const web3 = new Web3(provider);
		let num = 0;
		for await (let i of bottles) {
			let bottle = new web3.eth.Contract(BottleCollectionABI as any, i.address);
			let supply = await bottle.methods.supply().call();
			let maxSupply = await bottle.methods.maxSupply().call();
			dispatch(
				updateBottleState({
					index: num,
					supply: supply,
					maxSupply: maxSupply,
				})
			);
			num++;
		}
	} catch (error) {
		console.log(error);
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
			updateDataExchanged(dispatch);
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
					'bg-primary',
					'w-full xl:px-36 lg:px-10 px-8 py-3 flex flex-row items-center justify-between gap-10 shadow-md Raleway'
				)}
			>
				{modal}
				<div className="flex items-center shrink-0">
					<Logo />
				</div>{' '}
				{/* <div className="border md:flex hidden items-center text-md justify-center border-white  bg-primary rounded-xl w-[35%]">
					<div className="text-secondary flex items-center w-full px-4 rounded-xl bg-primary border-r border-white">
						<input
							type="text"
							className="text-secondary text-md w-full bg-transparent outline outline-transparent ring border-none !ring-transparent"
							placeholder="Search Collections"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
						<div
							className="text-secondary cursor-pointer flex items-center"
							onClick={() => setSearch('')}
						>
							<XIcon color="#000" width={'14px'} />
						</div>
					</div>
					<div
						className="text-xl h-full flex items-center justify-center px-2 cursor-pointer text-secondary"
						onClick={() => {
							if (search) {
								if (router.asPath == '/collections?search=' + search) {
									router.push('/collections');
								}
								router.push('/collections?search=' + search);
							}
						}}
					>
						<SearchOutlined />
					</div>
				</div> */}
				<div className="lg:flex hidden items-center shrink-0">
					{navItems.map((item, index) => {
						return (
							<div key={item.name + index}>
								{item.items ? (
									<Dropdown
										title={item.name}
										classTitle="text-[14px] font-bold text-center RalewayBold text-secondary"
									>
										<div className="rounded-md bg-primary p-2 flex flex-col shadow-md shadow-overlay">
											{item.items.map((link) => {
												return (
													<NavbarItem
														key={index}
														name={link.name}
														link={link.link}
														route={router.asPath}
													/>
												);
											})}
										</div>
									</Dropdown>
								) : (
									<NavbarItem
										key={index}
										name={item.name}
										link={item.link}
										route={router.asPath}
									/>
								)}
							</div>
						);
					})}

					{address && typeOfWallet == 'magic' ? (
						<>
							<Dropdown title="ACCOUNT" className="text-lg text-secondary">
								<div className="flex flex-col gap-4 p-4 w-72">
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'!rounded-full hover:text-secondary'
										)}
										onClick={() => router.push('/profile')}
									>
										Profile
									</Button>
									{typeOfWallet == 'magic' && (
										<>
											{' '}
											<Button
												className={clsx(
													'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
													'!rounded-full hover:text-secondary'
												)}
												onClick={() => showWallet()}
											>
												Show Wallet
											</Button>
											<Button
												className={clsx(
													'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
													'!rounded-full hover:text-secondary'
												)}
												onClick={() => disconnect(dispatch)}
											>
												Disconnect
											</Button>
										</>
									)}
								</div>
							</Dropdown>
						</>
					) : address ? (
						<NavbarItem
							name={'ACCOUNT'}
							icon={''}
							link={'/profile'}
							route={router.asPath}
						/>
					) : (
						<Button
							className={clsx(
								'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
								'!rounded-full hover:text-secondary ml-4'
							)}
							onClick={() => show()}
						>
							Connect Wallet
						</Button>
					)}
				</div>
				<div
					className="lg:hidden flex"
					onClick={() => {
						setSidebarOpen(true);
					}}
				>
					<MenuIcon
						className="h-6 w-6 text-secondary cursor-pointer"
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
	<Link href="/">
		<div className="mr-4 md:py-0 w-28 flex items-center justify-center text-secondary uppercase cursor-pointer ">
			<img src="/icons/logo.png" className="w-full" alt="" />
		</div>
	</Link>
);

export const NavbarItem: React.FC<any> = ({ name, link }) => {
	return (
		<Link href={link}>
			<div className={clsx('sm:px-4 px-2 py-2 relative cursor-pointer')}>
				<div className={clsx('gap-2 flex items-center text-secondary')}>
					{/* <div className="flex items-center w-4">{icon}</div> */}
					<h3 className={clsx('text-[14px] font-bold text-center RalewayBold')}>
						{name}
					</h3>
				</div>
			</div>
		</Link>
	);
};
