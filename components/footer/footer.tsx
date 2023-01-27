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
		{
			id: 1,
			href: '/privacy',
			title: 'Privacy Policy',
		},
		{
			id: 1,
			href: '/terms',
			title: 'Terms & Conditions',
		},
	];

	return (
		<footer
			className={clsx(
				'flex md:flex-row flex-col text-center items-center md:justify-between justify-center py-8 bg-primary w-full relative md:px-16 px-4'
			)}
		>
			<p className="text-white Raleway text-base">
				© 2023 Bolster. All rights reserved
			</p>
			<div className="flex items-center gap-x-6 flex-wrap text-xl  justify-center">
				{OficialPages.map((page) => {
					return (
						<Link href={page.href}>
							<div className="flex items-center text-white text-[16px] font-bold hover:text-white cursor-pointer">
								{page.title}
							</div>
						</Link>
					);
				})}
			</div>
		</footer>
	);
};
