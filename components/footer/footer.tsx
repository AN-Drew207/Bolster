import * as React from 'react';
import clsx from 'clsx';
import { TwitterOutlined } from '@ant-design/icons';
export const Footer = () => {
	// const OficialPages = [
	// 	{
	// 		id: 1,
	// 		href: 'https://twitter.com/CoCoBottleClub',
	// 		component: <TwitterOutlined />,
	// 	},
	// ];

	return (
		<footer
			className={clsx(
				'flex md:flex-row flex-col text-center items-center justify-center py-8 bg-gray-900 w-full relative md:px-16 px-4'
			)}
		>
			<p className="text-gray-500 Raleway text-base">
				© 2023 Bolster. All rights reserved
			</p>
			{/* <div className="flex items-center gap-4 text-xl  justify-center">
				{OficialPages.map((page) => {
					return (
						<a
							href={page.href}
							key={'social-media-' + page.id}
							target="_blank"
							className="flex items-center text-gray-500 hover:text-white"
							rel="noopener noreferrer"
						>
							{page.component && page.component}
						</a>
					);
				})}
			</div> */}
		</footer>
	);
};
