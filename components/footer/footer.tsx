import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
// import { TwitterOutlined } from '@ant-design/icons';
export const Footer = () => {
	const OficialPages = [
		{
			id: 1,
			href: '/faqs',
			title: 'FAQs',
		},
	];

	return (
		<footer
			className={clsx(
				'flex md:flex-row flex-col text-center items-center md:justify-between justify-center py-8 bg-primary w-full relative md:px-16 px-4'
			)}
		>
			<p className="text-gray-500 Raleway text-base">
				© 2023 Bolster. All rights reserved
			</p>
			<div className="flex items-center gap-4 text-xl  justify-center">
				{OficialPages.map((page) => {
					return (
						<Link href={page.href}>
							<div className="flex items-center text-gray-500 text-[14px] hover:text-white cursor-pointer">
								{page.title}
							</div>
						</Link>
					);
				})}
			</div>
		</footer>
	);
};
