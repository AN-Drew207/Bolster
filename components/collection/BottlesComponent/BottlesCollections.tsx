import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
// import bottles from 'bottles.json';
import { useSelector } from 'react-redux';
import { Loading } from '../../landing/loadingComponent';

export const Bottles: React.FC<any> = ({ setView }) => {
	const { bottles: bottlesView } = useSelector((state: any) => state.state);
	console.log(bottlesView, 'botellas');
	return (
		<div
			className={clsx(
				{ 'items-center justify-center': !bottlesView },
				'flex flex-col sm:px-16 px-4 py-36 w-full min-h-screen relative overflow-hidden'
			)}
		>
			{/* <img
				src="/img/bg_membership.jpg"
				className="fixed h-full w-full top-0 left-0"
				alt=""
			/>{' '} */}
			{bottlesView ? (
				<div className="relative flex flex-col w-full">
					<div
						className="sm:block hidden absolute left-0 top-0 font-bold text-xl text-secondary cursor-pointer"
						onClick={() => {
							setView('menu');
						}}
					>
						Back To Menu
					</div>
					<div
						className="block sm:hidden absolute left-0 top-0 font-bold text-xl text-secondary cursor-pointer"
						onClick={() => {
							setView('menu');
						}}
					>
						Back
					</div>
					<h2 className="text-secondary font-bold mb-10 text-5xl w-full text-center">
						Our Collections
					</h2>
					<div className="flex flex-wrap gap-10 items-center justify-center w-full">
						{bottlesView.map((bottle: any, index: number) => {
							const { address, name, image, exchanged, supply, maxSupply } =
								bottle;
							console.log(bottle, 'a?');
							return (
								<BottleItem
									address={address}
									name={name}
									image={image}
									exchanged={exchanged}
									supply={supply}
									maxSupply={maxSupply}
									index={index}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};
+3;
export const BottleItem = ({ address, name, video, image }: any) => {
	const videoRef = React.useRef<any>(null);

	const handleVideo = () => {
		videoRef?.current?.play();
	};

	console.log(image);

	React.useEffect(() => {
		handleVideo();
	}, [video]);
	return (
		<Link href={`/collections/${address}`}>
			<div className="sm:w-[400px] w-[320px] flex flex-col border rounded-xl overflow-hidden shadow-xl cursor-pointer border-gray-800 hover:scale-105 transition-all duration-500">
				<div className="rounded-xl bg-overlay relative border border-secondary z-10 cursor-pointer">
					<div className="w-full flex justify-center p-4 rounded-xl">
						<img
							// autoPlay
							// loop
							src={image}
							className="h-[350px]"
							// ref={videoRef}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center bg-primary justify-center text-xl text-center font-bold text-secondary h-20 p-4">
					<h3 className="flex items-center justify-center text-xl text-center font-bold">
						{name}
					</h3>{' '}
				</div>
			</div>
		</Link>
	);
};
