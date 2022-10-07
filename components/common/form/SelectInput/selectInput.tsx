import * as React from 'react';

import clsx from 'clsx';

import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { InputProps } from './../../../../interfaces/common';
import { Typography } from 'components/common/typography';

export const SelectInput: React.FC<
	InputProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	title,
	onChangeCustom,
	register,
	className,
	labelProps,
	values,
	name,
	defaultValue,
	rules,
	error,
	classNameContainer,
}) => {
	const registerInput = register && register(name, rules);

	return (
		<div
			className={clsx(
				'flex flex-col relative w-full',
				classNameContainer && classNameContainer
			)}
		>
			{title && (
				<label
					className={clsx(
						'block ml-2 text-lg mb-2 font-bold',
						{ 'text-status-error': error },
						labelProps && labelProps
					)}
				>
					{title && title}
				</label>
			)}
			<select
				name={name}
				ref={registerInput && registerInput.ref}
				className={clsx(
					'block text-xl bg-transparent text focus:outline-none focus:ring-primary focus:border-primary w-full rounded-lg f-18',
					{ [' border-status-error border ']: error },
					{ [' border-white border ']: !error },

					className && className
				)}
				defaultValue={defaultValue && defaultValue}
				onChange={(e) => {
					registerInput && registerInput.onChange(e);
					onChangeCustom && onChangeCustom(e);
					/* 				handleActivation(e); */
				}}
			>
				<option className="text-primary" value="">
					Select an option{' '}
				</option>
				{values?.map((item: any) => (
					<option
						className="text-primary"
						key={item.value}
						value={item.value && item.value}
					>
						{item.name}
					</option>
				))}
			</select>
			{error && error.message && (
				<span
					className={clsx(
						'flex items-center mt-1 mb-2 gap-1 text-status-error'
					)}
				>
					<div className="ml-1 w-4 h-4">
						<ExclamationCircleIcon className="w-4 text-status-error" />
					</div>
					<Typography type="caption">{error.message}</Typography>
				</span>
			)}
		</div>
	);
};
