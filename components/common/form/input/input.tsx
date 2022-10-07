import * as React from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';
import { Typography } from '../../typography';
import { Icon } from 'components/icon';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

export const Input: React.FC<
	any & React.InputHTMLAttributes<HTMLInputElement>
> = ({
	name,
	title,
	isFill,
	register,
	rules,
	rightImg,
	leftImg,
	disabled,
	rightClick,
	leftClick,
	customPlaceholder,
	onChangeCustom,
	error,
	className,
	InputSelect,
	labelVisible,
	verifyValue,
	handleVerification,
	primary,
	classNameInner,
	classNameContainer,
	// onChangeCustomTextArea,
	textArea = false,
	...props
}) => {
	const [showLabel, setShowLabel] = React.useState(false);
	const registerAux = register && register(name, rules);
	return (
		<div className={clsx('relative flex flex-col py-2 w-full', className)}>
			<div className={clsx(styles.input)}>
				<div className="flex flex-1">
					<div className="flex-auto">
						<Typography
							type="label"
							className={clsx(
								{ 'text-status-error': error || verifyValue === false },
								{ 'text-primary': isFill },
								{ 'text-primary': primary && !error },
								'ml-3 font-bold mb-2 block f-18'
							)}
						>
							{(showLabel || labelVisible) && title}
						</Typography>
					</div>

					{verifyValue === false && (
						<div className="flex-1 text-right">
							<Typography
								type="label"
								className={clsx(
									'ml-3 font-bold mb-2 block f-18 text-gray-500 cursor-pointer'
								)}
								onClick={handleVerification}
							>
								<p>Verificar</p>
							</Typography>
						</div>
					)}
				</div>
				<div className="relative container-input">
					{textArea ? (
						<textarea
							id={name}
							name={name}
							placeholder={customPlaceholder || title}
							autoComplete="off"
							rows={10}
							className={clsx(
								classNameInner,
								{ 'border-transparent-color-gray-800': !error },
								{
									'border-alert-error focus:border-alert-error': error,
								},
								{ 'px-6': !leftImg && !rightImg },
								{ 'pl-8 pr-4': leftImg },
								{ 'pr-8 pl-4': rightImg },
								{ 'bg-transparent-color-gray-200': isFill },
								{ 'bg-transparent': !isFill },
								!!isFill && styles.inputDateWithValue,
								'mt-[5px] py-3 w-full text-gray-500 font-lato text-xs border rounded-10',
								'placeholder-gray-200',
								// 'lg:pt-[14px] lg:pb-2',
								'disabled:placeholder-gray-800 disabled:bg-transparent-color-gray-800 disabled:cursor-not-allowed disabled:text-gray-800',
								'focus:outline-none focus:bg-transparent focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-200 focus:ring-transparent',
								'font-montserrat border f-18 focus:bg-gray-opacity-10'
							)}
							{...register(name, rules)}
							{...props}
						/>
					) : (
						// <textarea
						// 	id={name}
						// 	name={name}
						// 	placeholder={customPlaceholder || title}
						// 	autoComplete="off"
						// 	className={clsx(
						// 		{
						// 			'border-alert-error focus:border-alert-error placeholder-alert-error focus:ring-transparent':
						// 				error || verifyValue === false,
						// 		},
						// 		{
						// 			'text-status-error': error,
						// 		},
						// 		{ 'px-4': !leftImg && !rightImg },
						// 		{ 'pl-21 md:pl-36 pr-4': InputSelect },
						// 		{ 'pl-14 pr-4': leftImg },
						// 		{ 'pr-8': rightImg },
						// 		{ 'bg-transparent border-primary': isFill },
						// 		{ 'bg-transparent border-primary': primary && !error },
						// 		{ 'bg-transparent': !isFill },
						// 		!!isFill && styles.inputDateWithValue,
						// 		'placeholder-gray-500 pb-4 pt-4 w-full text-gray-500 font-montserrat border f-24 rounded',
						// 		{
						// 			'border-gray-500': !error && !isFill,
						// 		},
						// 		'disabled:placeholder-gray-200 disabled:cursor-not-allowed disabled:text-gray-500',
						// 		{
						// 			'focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-opacity-10 focus:ring-transparent':
						// 				!error,
						// 		}
						// 	)}
						// 	ref={registerAux && registerAux.ref}
						// 	// onChange={(e) => {
						// 	// 	console.log(e);
						// 	// }}
						// 	// onChange={(e) => {
						// 	// 	registerAux && registerAux.onChange(e); // method from hook form register
						// 	// 	onChangeCustomTextArea && onChangeCustomTextArea(e); // your method
						// 	// 	e.target.value === ''
						// 	// 		? setShowLabel(false)
						// 	// 		: setShowLabel(true);
						// 	// }}
						// 	// ref={register ? register(rules) : () => ({})}
						// 	{...props}
						// />
						<input
							onKeyUp={(e) => {
								if (props.type === 'tel') {
									e.currentTarget.value === ''
										? setShowLabel(false)
										: setShowLabel(true);
								}
							}}
							id={name}
							name={name}
							placeholder={customPlaceholder || title}
							autoComplete="off"
							disabled={disabled}
							className={clsx(
								{
									'border-alert-error focus:border-alert-error placeholder-alert-error focus:ring-transparent':
										error || verifyValue === false,
								},
								{
									'text-status-error': error,
								},
								{ 'px-4': !leftImg && !rightImg },
								{ 'pl-21 md:pl-36 pr-4': InputSelect },
								{ 'pl-14 pr-4': leftImg },
								{ 'pr-8': rightImg },
								{ 'bg-transparent border-primary': isFill },
								{ 'bg-transparent border-primary': primary && !error },
								{ 'bg-transparent': !isFill },
								!!isFill && styles.inputDateWithValue,
								'placeholder-white pb-2 pt-2 w-full text-white border text-xl rounded-md',
								{
									'border-white': !error && !isFill,
								},
								'disabled:placeholder-gray-200 disabled:cursor-not-allowed disabled:text-gray-500',
								{
									'focus:outline-none focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-opacity-10 focus:ring-transparent':
										!error,
								},
								classNameContainer
							)}
							ref={registerAux && registerAux.ref}
							onChange={(e) => {
								registerAux && registerAux.onChange(e); // method from hook form register
								onChangeCustom && onChangeCustom(e); // your method
								e.target.value === ''
									? setShowLabel(false)
									: setShowLabel(true);
							}}
							// ref={register ? register(rules) : () => ({})}
							{...props}
						/>
					)}

					{InputSelect && (
						<div className="absolute top-0 h-full w-20 md:w-32">
							<InputSelect />
						</div>
					)}

					{leftImg && (
						<div
							onClick={leftClick}
							className="absolute left-7 top-1/3 w-5 h-5"
						>
							<Icon
								src={leftImg}
								fillPath
								className="text-gray-500 cursor-pointer"
							/>
						</div>
					)}
					{rightImg && (
						<div
							onClick={rightClick}
							className="absolute right-4 top-1/3 w-5 h-5"
						>
							<Icon
								src={rightImg}
								fillPath
								className="text-gray-500 cursor-pointer"
							/>
						</div>
					)}
				</div>
				{error && error.message && (
					<span className="flex items-center mt-3 text-status-error font-montserrat">
						<div className="mr-1 w-4 h-3">
							<ExclamationCircleIcon className="w-4 text-status-error" />
						</div>
						<Typography type="caption" className="f-12">
							{error.message}
						</Typography>
					</span>
				)}
			</div>
		</div>
	);
};
