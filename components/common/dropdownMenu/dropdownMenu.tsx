import * as React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
// import Link from "next/link";
import { Typography } from '../typography';
import Link from 'next/link';
// import Styles from "./styles.module.scss";
export type navElementsAuth = {
	made: any[];
	received: any[];
	className?: string;
};
export const DropdownMenu: React.FC<
	navElementsAuth & React.InputHTMLAttributes<HTMLInputElement>
> = ({ title, made, received, className }) => {
	return (
		<Menu as="div" className={clsx(' relative ', className)}>
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="flex sm:px-4 px-2 rounded-full focus:outline-none focus:ring-none">
							<span className="sr-only">Open user menu</span>
							<div
								className={clsx('text-center relative font-bold', {
									[`text-primary`]: open,
								})}
							>
								<div
									className={clsx(
										{ 'text-white': !open },
										'flex items-center relative'
									)}
								>
									{received.length > 0 && (
										<div className="w-5 h-5 text-sm rounded-full bg-primary absolute top-[-10px] right-[-5px]">
											{received.length}
										</div>
									)}
									<p className={clsx('!text-md font-bold')}>{title}</p>
								</div>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						{/* <> */}
						<Menu.Items className="w-max max-w-[80vw] grid xl:grid-cols-3 md:grid-cols-2  gap-4 p-6 origin-top-right absolute z-[10000] right-0 mt-2  bg-gray-900 rounded-md shadow-button  focus:outline-none">
							<Menu.Item>
								<h2 className="w-full text-lg font-bold text-white textMain">
									Active Offers Made By You
								</h2>
							</Menu.Item>
							{made.length ? (
								made.map((item, index) => {
									return (
										<Menu.Item key={index}>
											<Link href={item.externalLink}>
												<a
													href=""
													className={clsx(
														'flex cursor-pointer items-center justify-center gap-x-2 px-4 py-4 f-14 text-normal text-dark-1 rounded-md'
													)}
												>
													<div className="p-1 rounded-md md:flex hidden text-white text-2xl">
														{item.icon}
													</div>
													<div className="flex flex-col items-center justify-center">
														<Typography
															type="subTitle"
															className="text-white font-bold text-md md:text-left text-center"
														>
															{item.title}
														</Typography>
													</div>
												</a>
											</Link>
										</Menu.Item>
									);
								})
							) : (
								<div className="text-white font-bold text-md p-4 flex justify-center items-center">
									You don't have active offers made by you
								</div>
							)}
							<Menu.Item>
								<h2 className="w-full text-lg font-bold text-white textMain">
									Active Offers Received
								</h2>
							</Menu.Item>
							{received.length ? (
								received.map((item, index) => {
									return (
										<Menu.Item key={index}>
											<Link href={item.externalLink}>
												<a
													href=""
													className={clsx(
														'flex cursor-pointer items-center justify-center gap-x-2 px-4 py-4 f-14 text-normal text-dark-1 rounded-md'
													)}
												>
													<div className="p-1 rounded-md md:flex hidden text-white text-2xl">
														{item.icon}
													</div>
													<div className="flex flex-col items-center justify-center">
														<Typography
															type="subTitle"
															className="text-white font-bold md:text-left text-center"
														>
															{item.title}
														</Typography>
													</div>
												</a>
											</Link>
										</Menu.Item>
									);
								})
							) : (
								<div className="text-white font-bold text-md p-4 flex justify-center items-center">
									You don't have active offers received
								</div>
							)}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
