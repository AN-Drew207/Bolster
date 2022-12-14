import Link from 'next/link';
import * as React from 'react';
import { Typography } from '../typography';
import { Spinner } from '../spinner/spinner';
import { Icon } from 'components/icon';
import clsx from 'clsx';
export interface ButtonProps {
	label?: string;
	disabled?: boolean;
	onClick?: () => void;
	href?: string;
	loading?: boolean;
	className?: string;
	labelProps?: string;
	icon?: any;
	target?: any;
	iconProps?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<
	ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	label,
	disabled,
	loading,
	onClick,
	className,
	labelProps,
	children,
	icon,
	iconProps,
	href = null,
	...props
}) => {
	const refButtom = React.useRef(null);

	return (
		<>
			{href ? (
				<Link href={href}>
					<button
						ref={refButtom}
						type="button"
						disabled={disabled}
						onClick={onClick}
						className={` rounded-lg  focus:outline-none ${className}`}
						{...props}
					>
						{label ? (
							<Typography type="smallTitle">
								<div className="flex items-center justify-center">
									{icon && (
										<div
											className={clsx(iconProps ? iconProps : 'mr-3 w-8 h-8')}
										>
											<Icon
												src={icon}
												/* fillPath={social }  */
												/* 	className={} */
											/>
										</div>
									)}
									{loading && <Spinner type="loadingButton" />}
									<span className={clsx(labelProps && labelProps)}>
										{label}
									</span>
								</div>
							</Typography>
						) : icon ? (
							<Icon src={icon} fillPath={true} className="" />
						) : (
							children
						)}
					</button>
				</Link>
			) : (
				<button
					ref={refButtom}
					type="button"
					disabled={disabled}
					onClick={onClick}
					className={clsx(` rounded-lg focus:outline-none ${className}`, {
						'disabled:bg-gray-1 disabled:text-gray-0 ': disabled,
					})}
					{...props}
				>
					{label ? (
						<Typography type="smallTitle">
							<div className="flex items-center justify-center ">
								{icon && (
									<div className={clsx(iconProps ? iconProps : 'mr-3 w-8 h-8')}>
										<Icon
											src={icon}
											/* fillPath={social }  */
											/* 	className={'w-8 h-8'} */
										/>
									</div>
								)}
								{loading && <Spinner type="loadingButton" />}
								<span className={clsx(labelProps && labelProps)}>{label}</span>
							</div>
						</Typography>
					) : icon ? (
						<Icon src={icon} fillPath={true} className="w-5 h-5 bg-white" />
					) : (
						children
					)}
				</button>
			)}
		</>
	);
};

export const ButtonContent: React.FC<
	ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	label,
	disabled,
	onClick,
	icon,
	href,
	children,
	labelProps,
	...props
}) => {
	return (
		<>
			{href ? (
				<Button
					icon={icon}
					label={label}
					disabled={disabled}
					labelProps={labelProps}
					href={href}
					{...props}
				/>
			) : (
				<Button
					icon={icon}
					label={label}
					disabled={disabled}
					onClick={onClick}
					href={href}
					labelProps={labelProps}
					{...props}
				>
					{children}
				</Button>
			)}
		</>
	);
};
