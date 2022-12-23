import * as React from 'react';
import clsx from 'clsx';
import { BookOutlined, LinkOutlined, TwitterOutlined } from '@ant-design/icons';
export const Footer = () => {
	const OficialPages = [
		{
			id: 1,
			href: 'https://twitter.com/CoCoBottleClub',
			component: <TwitterOutlined />,
		},
		{
			id: 2,
			href: 'https://santiago-rodriguez.gitbook.io/coco-b.c.-information/',
			component: <BookOutlined />,
		},
		{
			id: 3,
			href: 'https://linktr.ee/cocobottleclub',
			component: <LinkOutlined />,
		},
	];

	return (
		<footer
			className={clsx(
				'flex md:flex-row flex-col text-center items-center md:justify-between justify-center py-8 bg-overlay w-full relative md:px-16 px-4'
			)}
		>
			<p className="text-secondary text-base">
				© 2023 Bolster. All rights reserved
			</p>
			<div className="flex items-center gap-4 text-xl text-secondary justify-center">
				{OficialPages.map((page) => {
					return (
						<a
							href={page.href}
							key={'social-media-' + page.id}
							target="_blank"
							className="flex items-center"
							rel="noopener noreferrer"
						>
							{page.component && page.component}
						</a>
					);
				})}
			</div>
		</footer>
	);
};
