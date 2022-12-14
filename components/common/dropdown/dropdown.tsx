import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';
// import { Typography } from '../typography';
// import Styles from '../../landing/styles.module.scss';

export const Dropdown: React.FC<any> = ({ classTitle, title, children }) => {
	return (
		<div>
			<Menu as="div" className="relative inline-block text-left">
				{({ open }) => {
					console.log('open', open);
					return (
						<>
							<div>
								<Menu.Button className="inline-flex justify-center w-full font-medium bg-transparent focus:outline-none">
									<div
										className={clsx(
											'flex justify-center items-center cursor-pointer rounded-md',
											classTitle
										)}
									>
										<p className={clsx('!text-md font-bold text-white')}>
											{title}
										</p>
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
								<Menu.Items className="absolute top-4 right-3 z-20 md:mt-7 origin-top-right bg-overlay divide-y shadow-lg rounded-[6px] focus:outline-none">
									<div>{children}</div>
								</Menu.Items>
							</Transition>
						</>
					);
				}}
			</Menu>
		</div>
	);
};
