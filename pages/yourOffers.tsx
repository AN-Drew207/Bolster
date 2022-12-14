import clsx from 'clsx';
import { Typography } from 'components/common/typography';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { State } from 'redux/actions';

export default function YourOffers() {
	const { offersActiveReceived, offersActiveMade } = useSelector(
		(state: { state: State }) => {
			return state.state;
		}
	);

	return (
		<div className="w-full pt-32 px-10 flex items-center justify-center relative">
			{/* <img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/> */}
			<div className="w-full flex flex-col  gap-4 p-6  right-0 mt-2 relative min-h-[70vh] rounded-md bg-overlay">
				<div>
					<h2 className="w-full text-2xl font-bold text-center text-white textMain">
						Active Offers Made By You
					</h2>
				</div>
				{offersActiveMade.length ? (
					<div className="flex flex-col gap-2 min-h-[30vh]">
						{offersActiveMade.map((item: any, index: any) => {
							return (
								<div key={index}>
									<Link href={item.externalLink}>
										<a
											href=""
											className={clsx(
												'flex cursor-pointer items-center justify-center gap-x-2 px-4 py-4 f-14 text-normal text-dark-1 rounded-md'
											)}
										>
											<div className="p-1 rounded-md md:flex hidden text-white text-2xl">
												{item.icon}
											</div>
											<div className="flex flex-col items-center justify-center">
												<Typography
													type="subTitle"
													className="text-white font-bold text-xl md:text-left text-center"
												>
													{item.title}
												</Typography>
											</div>
										</a>
									</Link>
								</div>
							);
						})}
					</div>
				) : (
					<div className="text-white text-center font-bold text-xl p-4 flex justify-center items-center min-h-[30vh]">
						You don't have active offers made by you
					</div>
				)}
				<div>
					<h2 className="w-full text-2xl font-bold text-center text-white textMain">
						Active Offers Received
					</h2>
				</div>
				{offersActiveReceived.length ? (
					<div className="flex flex-col gap-2 min-h-[30vh]">
						{offersActiveReceived.map((item: any, index: any) => {
							return (
								<div key={index}>
									<Link href={item.externalLink}>
										<a
											href=""
											className={clsx(
												'flex cursor-pointer items-center justify-center gap-x-2 px-4 py-4 f-14 text-normal text-dark-1 rounded-md'
											)}
										>
											<div className="p-1 rounded-md md:flex hidden text-white text-2xl">
												{item.icon}
											</div>
											<div className="flex flex-col items-center justify-center">
												<Typography
													type="subTitle"
													className="text-white font-bold md:text-left text-center"
												>
													{item.title}
												</Typography>
											</div>
										</a>
									</Link>
								</div>
							);
						})}
					</div>
				) : (
					<div className="text-white text-center font-bold text-xl p-4 flex justify-center items-center min-h-[30vh]">
						You don't have active offers received
					</div>
				)}
			</div>
		</div>
	);
}
