import React from 'react';
import { Button } from '../../common/button';
import Styles from '../styles.module.scss';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Loading } from '../../landing/loadingComponent';
import Link from 'next/link';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import { Zoom, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
	BookOutlined,
	DoubleLeftOutlined,
	DoubleRightOutlined,
} from '@ant-design/icons';

interface Props {
	isWhitelisted: boolean;
	isLoading: boolean;
	accounts: any | any[];
	quantity: number;
	maxSupply: number;
	bottleName: string;
	address: string;
	videoDemo: string;
	artist: any;
	content: any;
	litepaper: any;
	// login: any;
}
interface PropsButton {
	connectWallet: any;
	connectWalletOffer?: any;
	isLoading: boolean;
	accounts: any | any[];
	show: () => void;
	exchanged: boolean;
	isWhitelisted: boolean;
}

export const MintComponentBottle: React.FC<Props & PropsButton> = ({
	isWhitelisted,
	isLoading,
	accounts,
	quantity,
	maxSupply,
	bottleName,
	videoDemo,
	show,
	content,
	address,
	connectWallet,
	connectWalletOffer,
	exchanged,
	litepaper,
	artist,
}) => {
	const video = React.useRef<any>(null);

	const handleVideo = () => {
		video?.current?.play();
	};

	React.useEffect(() => {
		handleVideo();
	}, [video]);
	return (
		<>
			<DesktopView
				quantity={quantity}
				litepaper={litepaper}
				maxSupply={maxSupply}
				isWhitelisted={isWhitelisted}
				exchanged={exchanged}
				accounts={accounts}
				isLoading={isLoading}
				bottleName={bottleName}
				address={address}
				videoDemo={videoDemo}
				content={content}
				artist={artist}
				connectWallet={connectWallet}
				connectWalletOffer={connectWalletOffer}
				show={show}
				video={video}
			/>
			<MobileView
				quantity={quantity}
				litepaper={litepaper}
				maxSupply={maxSupply}
				isWhitelisted={isWhitelisted}
				exchanged={exchanged}
				accounts={accounts}
				isLoading={isLoading}
				bottleName={bottleName}
				address={address}
				videoDemo={videoDemo}
				content={content}
				artist={artist}
				connectWallet={connectWallet}
				connectWalletOffer={connectWalletOffer}
				show={show}
				video={video}
			/>
		</>
	);
};

export const DesktopView: React.FC<any> = ({
	// isWhitelisted,
	// isLoading,
	// accounts,
	quantity: newQuantity,
	maxSupply: newMaxSupply,
	bottleName,
	address,
	videoDemo,
	content,
	connectWallet,
	connectWalletOffer,
	// artist,
	litepaper,
	// Mint,
	// show,
	video,
	exchanged: newExchanged,
}) => {
	const [quantity, setQuantity] = React.useState(newQuantity);
	const [maxSupply, setMaxSupply] = React.useState(newMaxSupply);
	const [exchanged, setExchanged] = React.useState(newExchanged);

	React.useEffect(() => {
		setMaxSupply(newMaxSupply);
		setQuantity(newQuantity);
		setExchanged(newExchanged);
	}, [newMaxSupply, newQuantity, newExchanged]);

	// const styleArrows: any = {
	// 	'--swiper-navigation-color': '#000',
	// 	'--swiper-pagination-color': '#000',
	// };

	return (
		<div className="bg-dark md:flex hidden text-secondary flex flex-col justify-between w-full items-start relative gap-10">
			<div className="flex rounded-xl xl:flex-row flex-col items-center justify-center w-full bg-overlay border border-dark-800 p-2 relative">
				<video
					src={videoDemo}
					autoPlay
					loop
					className="rounded-xl border border-white h-auto xl:w-1/2 w-full"
					ref={video}
				></video>
				<div className="absolute top-0 right-0 p-10">
					<a href={litepaper} target="_blank" rel="noreferrer">
						<BookOutlined className="text-xl hover:text-primary" />
					</a>
				</div>
				{content.caracteristics && (
					<div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-2 p-6">
						<h1 className="text-secondary text-center font-black md:text-4xl text-3xl w-full">
							{bottleName}
						</h1>
						<div className="w-full flex flex-col gap-2 items-center">
							<p className="font-bold text-lg text-center">Bottle Address</p>
							<a
								href={`https://polygonscan.com/address/${address}`}
								target="_blank"
								rel="noreferrer"
								className="text-secondary font-bold"
							>
								{address}
							</a>
						</div>
						{content.caracteristics.map((item: any, index: any) => {
							return (
								<div
									key={'caracteristic-' + index}
									className="flex xl:flex-row flex-col items-center justify-start w-40 gap-4"
								>
									<div className="flex items-center justify-start">
										<img
											className="max-w-[36px] max-h-20"
											src={item.icon}
											alt=""
										/>
									</div>
									<p className="text-sm text-secondary text-center font-bold">
										{item.caption}
									</p>
								</div>
							);
						})}
						<div className="flex flex-col w-full items-center justify-center gap-2">
							<div className="flex flex-wrap items-center justify-center w-full gap-x-6 gap-y-4">
								{quantity != maxSupply ? (
									<>
										{maxSupply != -1 ? (
											<Button
												className={clsx(
													'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
													Styles.button
												)}
												onClick={connectWallet}
											>
												Mint Now!
											</Button>
										) : (
											<Loading small />
										)}
									</>
								) : (
									<Button
										className={clsx(
											'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
											Styles.button
										)}
										onClick={connectWalletOffer}
									>
										Collection Options
									</Button>
								)}
								{maxSupply != -1 && (
									<Link href={'/profile/collection/' + address}>
										<div
											className={clsx(
												'py-2 px-8 transition text-center rounded-md cursor-pointer bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
												Styles.button
											)}
										>
											My NFTs from this Bottle
										</div>
									</Link>
								)}
							</div>
							{exchanged && maxSupply != -1 && (
								<h2 className="text-green-600 font-bold text-sm">
									This bottle has been successfully redeemed
								</h2>
							)}
						</div>
					</div>
				)}
			</div>
			{/* <div className="flex rounded-xl 2xl:flex-row flex-col items-center justify-center w-full bg-overlay border border-dark-800 py-10 xl:px-16 px-8 gap-4">
				<div className="2xl:w-3/5 flex flex-col w-full">
					<h2 className="text-left font-bold text-2xl text-secondary">
						{artist.name}
					</h2>
					<caption className="text-left text-sm text-secondary">
						Bottle Artist
					</caption>
					<div className="flex flex-col w-full items-center justify-center gap-2 mt-2">
						{artist.paragraphs.map((paragraph: any) => {
							return (
								<ParagraphArtist
									title={paragraph.title}
									text={paragraph.text}
								/>
							);
						})}
					</div>
				</div>
				<div className="2xl:w-2/5 w-full gap-6 flex items-center justify-center">
					<div className="2xl:w-2/3 w-[50%] flex items-center justify-center rounded-xl overflow-hidden">
						<Swiper
							style={styleArrows}
							slidesPerView={1}
							zoom={true}
							navigation={true}
							spaceBetween={10}
							modules={[Zoom, Navigation]}
						>
							{artist.photo.map((photo: any) => (
								<SwiperSlide>
									<img
										className="border w-full borderMain rounded-xl"
										src={photo}
										alt=""
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div> */}
			{/* <div className="flex flex-col w-full p-10 bg-overlay border border-dark-800 rounded-xl">
				<div className="flex md:flex-row flex-col justify-between items-center w-full mb-6 ">
					<h2 className="text-md font-semibold text-left">
						Tokens Minted <br />
						<span className="text-secondary">{quantity}</span> / {maxSupply}
					</h2>
					<ButtonMint
						isWhitelisted={isWhitelisted}
						accounts={accounts}
						isLoading={isLoading}
						show={show}
						connectWallet={connectWallet}
					/>
				</div> 
				<div className="flex flex-col w-full gap-8">
					<div className="flex flex-col">
						{content.title && (
							<h2 className="md:text-2xl text-xl text-secondary font-bold text-left">
								{content.title}
							</h2>
						)}
						{content.caption && (
							<caption className="text-sm text-secondary w-full text-left">
								{content.caption}
							</caption>
						)}
					</div>
					{content.paragraphs &&
						content.paragraphs.map((item: any, index: any) => {
							return (
								<p
									key={'paragraph-' + index}
									className="text-md font-bold text-justify"
								>
									{item}
								</p>
							);
						})}
				</div>
			</div> */}
		</div>
	);
};

export const MobileView: React.FC<any> = ({
	// isWhitelisted,
	// isLoading,
	// accounts,
	quantity: newQuantity,
	maxSupply: newMaxSupply,
	bottleName,
	address,
	videoDemo,
	content,
	connectWallet,
	connectWalletOffer,
	// artist,
	litepaper,
	// Mint,
	// show,
	video,
	exchanged: newExchanged,
}) => {
	const [quantity, setQuantity] = React.useState(newQuantity);
	const [maxSupply, setMaxSupply] = React.useState(newMaxSupply);
	const [exchanged, setExchanged] = React.useState(newExchanged);

	React.useEffect(() => {
		setMaxSupply(newMaxSupply);
		setQuantity(newQuantity);
		setExchanged(newExchanged);
	}, [newMaxSupply, newQuantity, newExchanged]);

	// const styleArrows: any = {
	// 	'--swiper-navigation-color': '#000',
	// 	'--swiper-pagination-color': '#000',
	// };
	return (
		<div className="bg-dark flex md:hidden text-secondary flex lg:flex-row flex-col justify-between w-full items-start relative gap-10">
			<div className="flex flex-col w-full md:p-10 p-4 bg-overlay border border-dark-800 rounded-xl gap-6 relative">
				<h1 className="text-secondary text-center font-black md:text-5xl text-3xl mt-2">
					{bottleName}
				</h1>
				<div className="absolute top-0 right-0 sm:pr-8 pr-4 pt-7">
					<a href={litepaper} target="_blank" rel="noreferrer">
						<BookOutlined className="text-xl hover:text-primary" />
					</a>
				</div>
				<video
					src={videoDemo}
					autoPlay
					loop
					className="rounded-xl"
					ref={video}
				></video>
				<div className="w-full truncate text-secondary">
					<p className="font-bold text-lg text-center">Bottle Address</p>
					<a
						href={`https://polygonscan.com/address/${address}`}
						target="_blank"
						rel="noreferrer"
						className="text-secondary font-bold truncate"
					>
						{address}
					</a>
				</div>
				<div className="flex flex-col w-full items-center justify-center gap-2">
					<div className="flex flex-wrap items-center justify-center w-full gap-x-6 gap-y-4">
						{quantity != maxSupply ? (
							<>
								{maxSupply != -1 ? (
									<Button
										className={clsx(
											'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
											Styles.button
										)}
										onClick={connectWallet}
									>
										Mint Now!
									</Button>
								) : (
									<Loading small />
								)}
							</>
						) : (
							<Button
								className={clsx(
									'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
									Styles.button
								)}
								onClick={connectWalletOffer}
							>
								Collection Options
							</Button>
						)}
						{maxSupply != -1 && (
							<Link href={'/profile/collection/' + address}>
								<div
									className={clsx(
										'py-2 px-8 transition text-center rounded-md cursor-pointer bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
										Styles.button
									)}
								>
									My NFTs from this Bottle
								</div>
							</Link>
						)}
					</div>
					{exchanged && maxSupply != -1 && (
						<h2 className="text-green-600 font-bold text-sm">
							This bottle has been successfully redeemed
						</h2>
					)}
				</div>
				<div className="flex flex-col w-full gap-8">
					<div className="flex flex-col">
						{content.title && (
							<h2 className="md:text-2xl text-xl text-secondary font-bold text-left">
								{content.title}
							</h2>
						)}
						{content.caption && (
							<caption className="text-sm text-secondary w-full text-left">
								{content.caption}
							</caption>
						)}
					</div>
					{content.paragraphs &&
						content.paragraphs.map((item: any, index: any) => {
							return (
								<p
									key={'paragraph-' + index}
									className="text-md font-bold text-justify"
								>
									{item}
								</p>
							);
						})}
					{content.caracteristics && (
						<>
							<div className="sm:flex hidden flex-wrap items-center sm:justify-between justify-center gap-y-10 gap-x-2 p-6">
								{content.caracteristics.map((item: any, index: any) => {
									return (
										<div
											key={'caracteristic-' + index}
											className="flex items-center justify-start w-40 gap-4"
										>
											<div className="flex items-center justify-start">
												<img
													className="max-w-[36px] max-h-20"
													src={item.icon}
													alt=""
												/>
											</div>
											<p className="text-md text-secondary text-center font-bold">
												{item.caption}
											</p>
										</div>
									);
								})}
							</div>
							<div className="sm:hidden flex flex-wrap items-center justify-center">
								{content.caracteristics.map((item: any, index: any) => {
									return (
										<div
											key={'caracteristic2-' + index}
											className="flex flex-col items-center justify-center h-20 w-1/2 gap-4 mb-6"
										>
											<div className="flex items-center sm:justify-center">
												<img
													className="sm:max-w-[36px] sm:max-h-20 h-18"
													src={item.icon}
													alt=""
												/>
											</div>
											<p className="text-md text-secondary font-bold text-center">
												{item.caption}
											</p>
										</div>
									);
								})}
							</div>
							<div className="flex flex-wrap items-center justify-center w-full gap-4">
								{quantity != maxSupply ? (
									<>
										{maxSupply != -1 ? (
											<Button
												className={clsx(
													'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
													Styles.button
												)}
												onClick={connectWallet}
											>
												Mint Now!
											</Button>
										) : (
											<Loading small />
										)}
									</>
								) : (
									<Button
										className={clsx(
											'py-2 px-8 transition bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
											Styles.button
										)}
										onClick={connectWalletOffer}
									>
										Collection Options
									</Button>
								)}
								{maxSupply != -1 && (
									<Link href={'/profile/collection/' + address}>
										<div
											className={clsx(
												'py-2 px-8 transition text-center rounded-md cursor-pointer bg-overlay ease-in-out delay-150 hover:-translate-y-1 uppercase font-bold hover:shadow-button hover:scale-110 duration-300',
												Styles.button
											)}
										>
											My NFTs from this Bottle
										</div>
									</Link>
								)}
							</div>
						</>
					)}
				</div>
			</div>
			{/* <div className="flex rounded-xl flex-col xl:items-start items-center justify-center w-full bg-overlay border border-dark-800 py-10 xl:px-16 md:px-8 px-4 gap-4">
				<div className="flex flex-col w-full">
					<h2 className="text-left font-bold text-2xl text-secondary">
						{artist.name}
					</h2>
					<caption className="text-left text-sm text-secondary">
						Bottle Artist
					</caption>
					<div className="flex flex-col w-full items-center justify-center gap-4 mt-4">
						{artist.paragraphs.map((paragraph: any) => {
							return (
								<ParagraphArtist
									title={paragraph.title}
									text={paragraph.text}
								/>
							);
						})}
					</div>
				</div>
				<div className="w-[80%] gap-6 flex items-center justify-center">
					<Swiper
						style={styleArrows}
						slidesPerView={1}
						zoom={true}
						navigation={true}
						spaceBetween={10}
						autoplay={{ delay: 3000 }}
						modules={[Zoom, Navigation, Autoplay]}
					>
						{artist.photo.map((photo: any) => (
							<SwiperSlide>
								<div className="flex items-center justify-center w-full">
									<img
										className="border w-full borderMain rounded-xl"
										src={photo}
										alt=""
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div> */}
		</div>
	);
};

export const ButtonMint: React.FC<PropsButton> = ({
	connectWallet,
	isLoading,
	accounts,
	show,
	isWhitelisted,
}) => {
	const { handleSubmit } = useForm({ mode: 'onChange' });
	return (
		<div className="flex items-center justify-center">
			{(accounts == null || accounts.length === 0) && !isLoading && (
				<Button
					className={clsx(
						'px-16 py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:shadow-button hover:scale-110 duration-300 ',
						Styles.button
					)}
					onClick={connectWallet}
				>
					Connect Wallet
				</Button>
			)}
			{accounts !== null &&
				accounts[0] !== null &&
				accounts.length !== 0 &&
				isWhitelisted && (
					<form
						className="flex sm:flex-row flex-col items-center justify-center gap-4"
						onSubmit={handleSubmit(() => show())}
					>
						<Button
							className={clsx(
								'z-10 border borderMain px-16 py-4 text-secondary transition ease-in-out delay-150 hover:-translate-y-1   hover:shadow-button hover:scale-110 duration-300  ',
								Styles.button
							)}
							type="submit"
						>
							<span translate={'no'}> Mint </span> now!
						</Button>
					</form>
				)}
		</div>
	);
};

export const ParagraphArtist: React.FC<any> = ({ title, text }) => {
	const [viewMore, setViewMore] = React.useState(false);
	return (
		<>
			{title && (
				<p className="text-secondary font-bold text-left text-lg my-2 w-full">
					{title}
				</p>
			)}
			{text && (
				<>
					{text.map((text: string, index: number) => (
						<p
							className={clsx(
								{ ['hidden']: index > 0 && !viewMore },
								'text-secondary font-bold text-justify text-md w-full'
							)}
						>
							{text}
						</p>
					))}
					{text.length > 1 && (
						<p
							className={clsx(
								'text-secondary cursor-pointer font-bold text-left flex items-center justify-start gap-1 text-sm w-full'
							)}
							onClick={() => {
								setViewMore((prev) => !prev);
							}}
						>
							{!viewMore ? (
								<>
									Read More{' '}
									<DoubleRightOutlined className="!text-primaryOpacity" />
								</>
							) : (
								<>
									Read Less{' '}
									<DoubleLeftOutlined className="!text-primaryOpacity" />
								</>
							)}
						</p>
					)}
				</>
			)}
		</>
	);
};
