import * as React from 'react';
import clsx from 'clsx';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
// import Link from "next/link";
// import Styles from "./styles.module.scss";

export type navElementsAuth = {
	// made: any[];
	// received: any[];
	className?: string;
	classTitle?: string;
};
export const DropdownMenu: React.FC<
	navElementsAuth & React.InputHTMLAttributes<HTMLInputElement>
> = ({ title, className, classTitle, children }) => {
	const [open, setOpen] = React.useState(false);
	return (
		<div className={clsx('flex flex-col w-full relative ', className)}>
			<div>
				<div
					onClick={() => setOpen((prev) => !prev)}
					className="flex rounded-full focus:outline-none focus:ring-none"
				>
					<span className="sr-only">Open user menu</span>
					<div className={clsx('flex cursor-pointer rounded-md', classTitle)}>
						<span className=" whitespace-nowrap">{title}</span>
						{open ? <CaretUpOutlined /> : <CaretDownOutlined />}
					</div>
				</div>
			</div>
			<div className={clsx({ hidden: !open })}>{children}</div>
		</div>
	);
};
