import clsx from 'clsx';
import { Button } from 'components/common/button';
import { TutorialBottles } from 'components/tutorial/tutorialBottles';
import { TutorialCollection } from 'components/tutorial/tutorialCollection';
import * as React from 'react';
import Styles from 'components/landing/styles.module.scss';

const Tutorial = () => {
	const [view, setView] = React.useState('menu');
	return (
		<>
			{view == 'menu' ? (
				<div className="min-h-[90vh] w-[100%] flex items-center justify-center relative px-2">
					{' '}
					{/* <img
						src="/img/bg_membership.jpg"
						className="fixed h-full w-full top-0 left-0"
						alt=""
					/> */}
					<div className="flex flex-col justify-center items-center p-10 md:gap-10 gap-4 bg-overlay md:p-20 p-10 rounded-md relative">
						<h2 className="font-bold sm:text-3xl text-2xl text-center text-secondary">
							How to Mint?
						</h2>
						<div className="flex sm:flex-row flex-col md:gap-10 gap-4">
							<Button
								className={clsx(
									'z-10 border borderMain relative sm:px-16 p-4 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
									Styles.button
								)}
								onClick={() => setView('collection')}
								// disabled
							>
								Memberships
							</Button>
							<Button
								className={clsx(
									'z-10 border borderMain sm:px-16 p-4 py-4 text-secondary',
									Styles.button
								)}
								onClick={() => setView('bottle')}
								// disabled
							>
								Bottle Collections
							</Button>
						</div>
					</div>
				</div>
			) : view == 'bottle' ? (
				<TutorialBottles />
			) : (
				<TutorialCollection />
			)}
		</>
	);
};
export default Tutorial;
