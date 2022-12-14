import Link from 'next/link';
import { Fragment } from 'react';

/* import { signOut } from 'next-auth/client'; */
import { Icon } from 'components/icon';
/* import { Button } from 'components/common/button'; */
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Styles from './styles.module.scss';
import clsx from 'clsx';
import { Icons } from 'consts';
import * as React from 'react';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const Header: React.FC = () => {
	const router = useRouter();

	const navElements = [
		{
			name: 'Marketplace',
			href: '/marketPlace',
			handleSubMenu: false,
			type: 'link',
		},
		{
			name: 'About Us',
			href: '/#AboutUs',
			handleSubMenu: false,
			type: 'link',
		},
		{
			name: 'Asset Tokenization',
			href: '/#ContactUs',
			handleSubMenu: false,
			type: 'link',
		},
		{
			name: 'LOGIN',
			href: '/auth/signin',
			handleSubMenu: false,
			type: 'link',
		},
	];

	interface NavElemntSubMenuProps {
		name?: string;
		href?: string;
	}

	interface NavElemntProps {
		href: string;
		hanldeSubMenu: boolean;
		subMenu?: NavElemntSubMenuProps[];
		active: boolean;
		type: string;
	}

	const NavSidebarElemnt: React.FC<NavElemntProps> = ({
		href,
		children,
		hanldeSubMenu,
		subMenu,
		active,
		type,
	}) => {
		return (
			<>
				{!hanldeSubMenu ? (
					type == 'link' && (
						<Link href={href}>
							<button
								className={clsx(
									'hover:text-primary text-dark-1 font-bold block xl:flex focus:outline-none hover:outline-none',
									active && 'text-primary',
									Styles.f18l
								)}
							>
								{children}
							</button>
						</Link>
					)
				) : (
					<Menu as="div" className="px-4 relative">
						{({ open }) => (
							<>
								<div>
									<Menu.Button className="bg-white text-lg rounded-full flex items-center focus:outline-none outline-none">
										{children}
									</Menu.Button>
								</div>
								<Transition
									show={open}
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items
										static
										className="z-10 origin-top-right absolute right-0 mt-2 w-[138px] rounded-md shadow-lg py-1 bg-white focus:outline-none"
									>
										navElements
										{subMenu?.map((item, index) => {
											return (
												<Menu.Item key={index}>
													{({ active }) => (
														<Link href={item.href || ''}>
															<a
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-lg text-secondary hover:text-primary'
																)}
															>
																{item.name}
															</a>
														</Link>
													)}
												</Menu.Item>
											);
										})}
									</Menu.Items>
								</Transition>
							</>
						)}
					</Menu>
				)}
			</>
		);
	};

	return (
		<Disclosure
			as="nav"
			className="bg-white w-full  fixed z-20 xl:shadow-button"
		>
			{({ open }) => (
				<>
					<div className={clsx('w-full mx-auto', Styles.containerNavbar)}>
						<div className="relative flex justify-between h-auto py-3">
							<div
								className={clsx(
									'absolute inset-y-0 right-0  items-center ',
									Styles.displayOptionsMobile
								)}
							>
								{/* Mobile menu button */}

								<Disclosure.Button className="inline-flex items-center justify-center  rounded-md focus:outline-none  outline-none  ">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<Icon src={Icons.iconTrash} />
									) : (
										/* 		<MenuIcon className="block h-6 w-6" aria-hidden="true" /> */

										<Icon src={Icons.iconTrash} className={'w-9 md:w-12'} />
									)}
								</Disclosure.Button>
							</div>

							<div className="xl:flex-1 flex  items-stretch justify-start">
								<Link href="/">
									<a>
										<Icon src={Icons.Logo} className={'w-28 h-16 '} />
									</a>
								</Link>
							</div>

							<div
								className={clsx(
									'gap-x-8 2xl:gap-x-16  absolute inset-y-0 right-0 items-center  inset-auto ml-6 pr-0',
									Styles.displayOptions
								)}
							>
								{navElements.map((item, index) => {
									const active = router.pathname === item.href;

									return (
										<NavSidebarElemnt
											href={item.href}
											key={index}
											hanldeSubMenu={item.handleSubMenu}
											active={active}
											type={item.type}
										>
											{item.name}
											{item.handleSubMenu && (
												<Icon
													src={Icons.arrowDown}
													className={'w-5 h-2 ml-4'}
												/>
											)}
										</NavSidebarElemnt>
									);
								})}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="xl:hidden">
						<div
							className={clsx(
								'pt-16 min-w-[100vw] pb-44 md:pb-72 min-h-screen flex flex-col gap-y-24 fixed bg-white top-20 bottom-0 overflow-scroll  text-center ',
								Styles.SidebarMenu
							)}
						>
							{navElements.map((item, index) => {
								const active = router.pathname === item.href;

								return (
									<NavSidebarElemnt
										href={item.href}
										key={index}
										hanldeSubMenu={item.handleSubMenu}
										active={active}
										type={item.type}
									>
										{item.name}
										{item.handleSubMenu && (
											<Icon src={Icons.arrowDown} className={'w-5 h-2 ml-4'} />
										)}
									</NavSidebarElemnt>
								);
							})}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
