// import clsx from 'clsx';
// import Styles from './styles.module.scss';
import clsx from 'clsx';
import React from 'react';

export const Loading: React.FC<any> = ({ small }) => {
	return (
		<div className="relative flex items-center flex-col">
			<div className={clsx('loader', { ['!w-16 !h-16']: small })}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
};
