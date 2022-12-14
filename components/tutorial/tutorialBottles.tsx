/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import { Button } from 'components/common/button/button';
import Styles from './styles.module.scss';
import Web3 from 'web3';
import Link from 'next/link';
import {
	addMumbaiEthereumChain,
	switchEthereumChain,
} from 'components/common/chainMetamask/chainMetamask';

export const TutorialBottles = () => {
	const exchanges = [
		{
			global: {
				name: 'Binance',
				link: 'https://www.binance.com/',
			},
			usa: { name: 'Coinbase Exchange', link: 'https://www.coinbase.com/es' },
			europe: {
				name: 'Binance',
				link: 'https://www.binance.com/',
			},
		},
		{
			global: {
				name: 'FTX',
				link: 'https://ftx.com/es',
			},
			usa: { name: 'Kraken', link: 'https://www.kraken.com/' },
			europe: {
				name: 'FTX',
				link: 'https://ftx.com/es',
			},
		},
		{
			global: {
				name: 'Coinbase Exchange',
				link: 'https://www.coinbase.com/es',
			},
			usa: { name: 'FTX.US', link: 'https://ftx.us/' },
			europe: {
				name: 'Coinbase Exchange',
				link: 'https://www.coinbase.com/es',
			},
		},
		{
			global: {
				name: 'Huobi Global',
				link: 'https://www.huobi.com/',
			},
			usa: { name: 'Binance US', link: 'https://www.binance.us/en' },
			europe: {
				name: 'Kucoin',
				link: 'https://www.kucoin.com/',
			},
		},
		{
			global: {
				name: 'OKX',
				link: 'https://www.okx.com/',
			},
			usa: { name: 'Gemini', link: 'https://www.gemini.com/' },
			europe: {
				name: 'Gate.io',
				link: 'https://www.gate.io/',
			},
		},
	];

	const [usdc, setUSDC] = React.useState(false);

	return (
		<div className="min-h-screen flex bg-gray-900 flex-col justify-center relative">
			<img
				src="/img/banner_bg_1.jpg"
				className="fixed top-0 h-full w-full left-0"
				alt=""
			/>
			<div className="fixed lg:block hidden top-0 w-1/2 right-0">
				<img src="/img/tuto2.png" className="w-full" alt="" />
				<img
					src="/img/banner_bg_3.png"
					className="w-full absolute"
					style={{ bottom: '-140px' }}
					alt=""
				/>
			</div>
			<div
				className={clsx(
					'flex flex-col items-center py-28 lg:w-1/2 w-full lg:pl-8 px-10 gap-8 relative',
					'justify-center'
				)}
			>
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-center text-white w-full my-4 font-bold text-md">
						If you have any questions, you can ask us via:{' '}
					</h2>
					<div className="flex gap-4">
						<a
							className="text-primary w-12 m-0 flex items-center"
							target="_blank"
							href="https://twitter.com/CoCoBottleClub?s=09"
						>
							<img src="/img/twitter.png" className="w-12 m-0" alt="" />
						</a>

						<a
							className="text-primary w-12 m-0 flex items-center"
							target="_blank"
							href="https://discord.gg/jx79rnJX8t"
						>
							<img src="/img/discord.png" className="w-12 m-0" alt="" />
						</a>

						<a
							className="text-primary w-12 m-0"
							target="_blank"
							href="https://t.me/+TsL_34k_1C81MjI0"
						>
							<img src="/img/Telegram.png" className="w-12 m-0" alt="" />
						</a>
					</div>
					<h2 className="text-center text-white w-full my-4 font-bold text-md">
						How to buy a CoCo B.C. Bottle Fraction:
					</h2>
					<h2 className="text-2xl font-bold  text-left text-white">
						1. Getting your Decentralized Wallet
					</h2>
					<p className="text-md font-bold text-center text-white">
						Click in 'Download Metamask'. A default account with an associated
						public Ethereum address will be created on the Main Network. Your
						Metamask Ethereum address can be found on the main screen and it
						starts with 0x.
					</p>
					<Button
						className={clsx(
							'p-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-transparent hover:text-orange-500 border-orange-500 border',
							Styles.button
						)}
					>
						<a href={'https://metamask.io/download/'} target="_blank">
							Download Metamask
						</a>
					</Button>
					<h2 className="text-2xl font-bold text-center text-white">
						Follow this official Metamask video-tutorial or
					</h2>
					<div className="flex">
						<iframe
							width="330"
							height="185"
							src="https://www.youtube.com/embed/GNPz-Dv5BjM"
							title="YouTube video player"
							frameBorder="0"
							className="lg:hidden block"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							// allowfullscreen
						></iframe>
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/GNPz-Dv5BjM"
							title="YouTube video player"
							frameBorder="0"
							className="hidden lg:block"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							// allowfullscreen
						></iframe>
					</div>
					<h2 className="text-2xl font-bold text-center text-white">
						Follow this image tutorial
					</h2>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								Click on 'Download Metamask'. A default account with an
								associated public Ethereum address will be created on the Main
								Network, which can be found on the main screen.
							</p>
							<img
								src="/img/step1_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								Click on “Download Now” and “Install MetaMask for Chrome”
							</p>
							<img
								src="/img/step2_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								Click on 'Create A Wallet' to create your MetaMask wallet.{' '}
							</p>
							<img
								src="/img/step3_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>

						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								You will type down the password you want for your MetaMask
								wallet.{' '}
							</p>

							<img
								src="/img/metamaskPassword.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								You will be given a seed phrase. Please write down this seed
								phrase on a piece of paper and store it in a secure location,
								never reveal this seed phrase to anyone.
							</p>

							<img
								src="/img/step4_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								Next, click on each word of your seed phrase in the correct
								order. Once you confirm it, your MetaMask account will be
								created.
							</p>
							<img
								src="/img/step5_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								When you click on the MetaMask logo on your browser’s extension,
								you will be able to see your wallet´s details. As you can see
								below, you have 0ETH and US$0 in your wallet and you are in the
								Main Ethereum Network, in order to mint you have to change your
								network to the Polygon Network in your wallet, see the next step
								to do it.
							</p>
							<img
								src="/img/step6_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-white">
								Image Credit: MetaMask
							</p>
							<p className="text-md font-bold text-center text-white mt-2">
								Tip: On the right top corner of your chrome browser, you will
								find a small puzzle piece, click on it and you will see your
								extensions, find the Metamask logo and click on the pin next to
								it, so it will always be visible.
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								Add Polygon Network to your wallet by clicking here.
							</p>{' '}
							<Button
								className={clsx(
									'p-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-transparent hover:text-orange-500 border-orange-500 border',
									Styles.button
								)}
								onClick={() => addMumbaiEthereumChain()}
							>
								Add Polygon to Metamask
							</Button>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-white mb-2">
								After adding Polygon to your wallet, click here to change your
								network to it.
							</p>{' '}
							<Button
								className={clsx(
									'p-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-transparent hover:text-orange-500 border-orange-500 border',
									Styles.button
								)}
								onClick={() =>
									switchEthereumChain(
										process.env.NEXT_PUBLIC_POLYGON_ID
											? process.env.NEXT_PUBLIC_POLYGON_ID
											: '0X89'
									)
								}
							>
								Change to Polygon Network
							</Button>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-center text-white w-full font-bold text-lg">
						Choose the currency you want to use:{' '}
					</h2>
					<div className="flex w-full items-center justify-center">
						<div
							className={clsx(
								{ ['bg-white text-orange-500']: !usdc },
								{ ['bg-transparent text-white']: usdc },
								'px-4 py-2 font-bold text-md border border-white cursor-pointer'
							)}
							onClick={() => setUSDC(false)}
						>
							MATIC
						</div>
						<div
							className={clsx(
								{ ['bg-transparent text-white']: !usdc },
								{ ['bg-white text-orange-500']: usdc },
								'px-4 py-2 font-bold text-md border border-white cursor-pointer'
							)}
							onClick={() => setUSDC(true)}
						>
							USDC
						</div>
					</div>
				</div>
				{usdc ? (
					<>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								2. Funding your wallet with USDC
							</h2>
							<p className="text-md font-bold  text-center text-white ">
								To fund your wallet with cryptotokens (USDC), it is necessary to
								use a third-party exchange. There are several exchanges, and
								each has different options to buy, such as Credit Card, Debit
								Card, or Bank Transfer.
							</p>
							<p className="text-md font-bold  text-center text-white ">
								Here are some examples of exchanges in different regions:{' '}
							</p>
							<h2 className="text-2xl font-bold mt-2 text-center text-white">
								Top 5 Exchanges
							</h2>
							<table className="min-w-full divide-y divide-gray-200 mb-4 bg-overlay rounded-md text-white">
								<thead className="text-white text-xl">
									<tr>
										<th className="py-4 ">Global</th>
										<th className="py-4  border-x border-white">USA</th>
										<th className="py-4">Europe</th>
									</tr>
								</thead>
								<tbody className="text-white">
									{exchanges.map((exchange: any, index: number) => {
										return (
											<React.Fragment key={index}>
												<tr key={index}>
													<th scope="col" className="py-">
														<a
															href={exchange.global.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.global.name}
														</a>
													</th>
													<th
														scope="col"
														className="py-4 border-x border-white"
													>
														<a
															href={exchange.usa.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.usa.name}
														</a>
													</th>
													<th scope="col" className="py-4">
														<a
															href={exchange.europe.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.europe.name}
														</a>
													</th>
												</tr>
											</React.Fragment>
										);
									})}
								</tbody>
							</table>
							<p className="text-md font-bold text-center text-white">
								Here are some tutorials to do it: <br />
								<a
									href="https://www.binance.com/en/how-to-buy/usd-coin"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary"
								>
									Buy USDC in Binance
								</a>
								<br />
								<a
									href="https://www.coinbase.com/es/how-to-buy/usdc"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary"
								>
									Buy Crypto in Coinbase
								</a>
								<br />
							</p>
							<p className="text-md font-bold text-left w-full text-white">
								Note 1: Remember Metamask is a decentralized wallet, it only
								works with cryptocurrencies.
							</p>
							<p className="text-md font-bold text-left w-full text-white">
								Note 2: Please take into account that some exchanges may not
								operate worldwide.
							</p>
							<p className="text-md font-bold text-left w-full text-white">
								Note 3: We are not related to these exchanges in any way.
							</p>
							<p className="text-md font-bold text-left w-full text-white ">
								Note 4: At the moment to transfer these USDC make sure you are
								transfering them to the MATIC network.
							</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								3. Minting your CoCo B.C. NFT Bottle Fraction
							</h2>
							<p className="text-md font-bold text-center w-full text-white">
								After fund your wallet, you have to go to the{' '}
								<Link href="/">
									<span className="text-primary cursor-pointer">
										CoCo Mint Page
									</span>
								</Link>{' '}
								and click 'Bottle Collections'.
							</p>
							<img
								className="h-80 md:block hidden"
								src="/img/menu.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/menu_mobile.png"
								alt=""
							/>
							<p className="text-md font-bold text-center w-full text-white">
								Choose the Bottle you want to mint and click weather 'Mint Now'
								if you want to go through the minting process or 'View Info' if
								you want to look at the details of the bottle. In this tutorial
								we are going to click 'Mint Now'.
							</p>
							<img
								className="h-80 hidden md:block"
								src="/img/menu2.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/menu2_mobile.png"
								alt=""
							/>
							<p className="text-md font-bold text-center w-full text-white">
								In order to mint, you have to fill the 'Quantity of NFTs' field
								with the quantity of NFTs you want to mint, then select the
								payment method, in this tutorial we are going to select 'USDC'
								as a payment method. Then you have to mint the 'Mint now!'
								button.
							</p>
							<img
								className="h-80 hidden md:block"
								src="/img/bottle1USDC.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/bottle1USDC_mobile.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-md font-bold text-white">
								Metamask pop-up will appear and you have to click on 'Confirm'
								{'. '}
							</p>
							<div className="flex xl:flex-row flex-col items-center justify-center gap-4 ">
								<img className="w-80" src="/img/txAccept.png" alt="" />
								<p className="text-md font-bold text-center w-full text-white mt-2 xl:w-1/3">
									Note: Always review the link and transaction you are
									interacting with before you 'Confirm' any operation.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-md font-bold text-white">
								When the transaction is done you will see a congratulations
								message{' '}
							</p>
							<img
								className="h-80 hidden md:block"
								src="/img/congratsBottle.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/congratsBottle_mobile.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								How look at your Bottle Fraction? <br />
							</h2>
							<p className="text-md font-bold text-center text-white">
								You can see them in any marketplace that you like. The most
								popular in Polygon is{' '}
								<a
									className="text-primary"
									target="_blank"
									href="http://opensea.io/"
								>
									Opensea
								</a>
								{', '}
								but there are plenty more. In all of them, you will have to 'log
								in' (Connect) with your wallet (MetaMask) and then go to your
								profile, to see all your assets.
							</p>
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Tip: We recommend buying a hardware wallet to store your digital
								assets. There are a few options on the market but we suggest
								Ledger or Trezor, since they are the ones with more experience.
							</p>{' '}
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Here are some tutorials on how to set up your hardware wallet.
							</p>{' '}
							<a
								href="https://www.ledger.com/academy/security/the-safest-way-to-use-metamask"
								target="_blank"
								className="text-primary font-bold"
							>
								Ledger Tutorial for Metamask by Ledger
							</a>
							<a
								href="https://metamask.zendesk.com/hc/en-us/articles/360020394612-How-to-connect-a-Trezor-or-Ledger-Hardware-Wallet"
								target="_blank"
								className="text-primary font-bold"
							>
								Trezor and Ledger Tutorial for Metamask by Metamask
							</a>
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Note:{' '}
								<span className="font-black">
									{' '}
									Always buy your hardware wallet directly from the manufacturer
									itself.
								</span>
							</p>
							<h2 className="text-center text-white w-full my-4 font-bold text-md">
								If you have any questions you can always contact us via:{' '}
							</h2>
							<div className="flex gap-4">
								<a
									className="text-primary w-12 m-0 flex items-center"
									target="_blank"
									href="https://twitter.com/CoCoBottleClub?s=09"
								>
									<img src="/img/twitter.png" className="w-12 m-0" alt="" />
								</a>

								<a
									className="text-primary w-12 m-0 flex items-center"
									target="_blank"
									href="https://discord.gg/jx79rnJX8t"
								>
									<img src="/img/discord.png" className="w-12 m-0" alt="" />
								</a>

								<a
									className="text-primary w-12 m-0"
									target="_blank"
									href="https://t.me/+TsL_34k_1C81MjI0"
								>
									<img src="/img/Telegram.png" className="w-12 m-0" alt="" />
								</a>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								2. Funding your wallet with MATIC
							</h2>
							<p className="text-md font-bold  text-center text-white ">
								To fund your wallet with cryptocurrency (MATIC), it is necessary
								to use a third-party exchange. There are several exchanges, and
								each has different options to buy, such as Credit Card, Debit
								Card, or Bank Transfer.
							</p>
							<p className="text-md font-bold  text-center text-white ">
								Here are some examples of exchanges in different regions:{' '}
							</p>
							<h2 className="text-2xl font-bold mt-2 text-center text-white">
								Top 5 Exchanges
							</h2>
							<table className="min-w-full divide-y divide-gray-200 mb-4 bg-overlay rounded-md text-white">
								<thead className="text-white text-xl">
									<tr>
										<th className="py-4 ">Global</th>
										<th className="py-4  border-x border-white">USA</th>
										<th className="py-4">Europe</th>
									</tr>
								</thead>
								<tbody className="text-white">
									{exchanges.map((exchange: any, index: number) => {
										return (
											<React.Fragment key={index}>
												<tr key={index}>
													<th scope="col" className="py-">
														<a
															href={exchange.global.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.global.name}
														</a>
													</th>
													<th
														scope="col"
														className="py-4 border-x border-white"
													>
														<a
															href={exchange.usa.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.usa.name}
														</a>
													</th>
													<th scope="col" className="py-4">
														<a
															href={exchange.europe.link}
															className={clsx(
																'xl:px-4 px-2 pl-3 py-3',
																'text-center text-md font-bold text-primary'
															)}
														>
															{exchange.europe.name}
														</a>
													</th>
												</tr>
											</React.Fragment>
										);
									})}
								</tbody>
							</table>
							<p className="text-md font-bold text-center text-white">
								Here are some tutorials to do it: <br />
								<a
									href="https://www.binance.com/en/support/faq/400c38f5e0cd4b46a1d0805c296b5582"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary"
								>
									Buy Crypto in Binance
								</a>
								<br />
								<a
									href="https://help.coinbase.com/en/coinbase/trading-and-funding/buying-selling-or-converting-crypto/how-do-i-buy-digital-currency"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary"
								>
									Buy Crypto in Coinbase
								</a>
								<br />
							</p>
							<p className="text-md font-bold text-center w-full text-white">
								Note 1: Remember Metamask is a decentralized wallet, it only
								works with cryptocurrencies.
							</p>
							<p className="text-md font-bold text-center w-full text-white">
								Note 2: Please take into account that some exchanges may not
								operate worldwide.
							</p>
							<p className="text-md font-bold text-center w-full text-white">
								Note 3: We are not related to these exchanges in any way.
							</p>

							{/* <img className="h-80 w-full" src="/img/mainPageImage" alt="" /> */}
						</div>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								3. Minting your CoCo B.C. NFT Bottle Fraction
							</h2>
							<p className="text-md font-bold text-center w-full text-white">
								After fund your wallet, you have to go to the{' '}
								<Link href="/">
									<span className="text-primary cursor-pointer">
										CoCo Mint Page
									</span>
								</Link>{' '}
								and click 'Bottle Collections'.
							</p>
							<img
								className="h-80 md:block hidden"
								src="/img/menu.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/menu_mobile.png"
								alt=""
							/>
							<p className="text-md font-bold text-center w-full text-white">
								Choose the Bottle you want to mint and click weather 'Mint Now'
								if you want to go through the minting process or 'View Info' if
								you want to look at the details of the bottle. In this tutorial
								we are going to click 'Mint Now'.
							</p>
							<img
								className="h-80 hidden md:block"
								src="/img/menu2.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/menu2_mobile.png"
								alt=""
							/>
							<p className="text-md font-bold text-center w-full text-white">
								In order to mint, you have to fill the 'Quantity of NFTs' field
								with the quantity of NFTs you want to mint, then select the
								payment method, in this tutorial we are going to select 'MATIC'
								as a payment method. Then you have to mint the 'Mint now!'
								button.
							</p>
							<img
								className="h-80 hidden md:block"
								src="/img/bottle1.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/bottle1_mobile.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-md font-bold text-white">
								Metamask pop-up will appear and you have to click on 'Confirm'
								{'. '}
							</p>
							<div className="flex xl:flex-row flex-col items-center justify-center gap-4 ">
								<img className="w-80" src="/img/txAccept.png" alt="" />
								<p className="text-md font-bold text-center w-full text-white mt-2 xl:w-1/3">
									Note: Always review the link and transaction you are
									interacting with before you 'Confirm' any operation.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-md font-bold text-white">
								When the transaction is done you will see a congratulations
								message{' '}
							</p>{' '}
							<img
								className="h-80 hidden md:block"
								src="/img/congratsBottle.png"
								alt=""
							/>
							<img
								className="w-96 md:hidden block"
								src="/img/congratsBottle_mobile.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl font-bold  text-center text-white">
								How look at your Bottle Fraction? <br />
							</h2>
							<p className="text-md font-bold text-center text-white">
								You can see them in any marketplace that you like. The most
								popular in Polygon is{' '}
								<a
									className="text-primary"
									target="_blank"
									href="http://opensea.io/"
								>
									Opensea
								</a>
								{', '}
								but there are plenty more. In all of them, you will have to 'log
								in' (Connect) with your wallet (MetaMask) and then go to your
								profile, to see all your assets.
							</p>
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Tip: We recommend buying a hardware wallet to store your digital
								assets. There are a few options on the market but we suggest
								Ledger or Trezor, since they are the ones with more experience.
							</p>{' '}
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Here are some tutorials on how to set up your hardware wallet.
							</p>{' '}
							<a
								href="https://www.ledger.com/academy/security/the-safest-way-to-use-metamask"
								target="_blank"
								className="text-primary font-bold"
							>
								Ledger Tutorial for Metamask by Ledger
							</a>
							<a
								href="https://metamask.zendesk.com/hc/en-us/articles/360020394612-How-to-connect-a-Trezor-or-Ledger-Hardware-Wallet"
								target="_blank"
								className="text-primary font-bold"
							>
								Trezor and Ledger Tutorial for Metamask by Metamask
							</a>
							<p className="text-md font-bold text-center w-full text-white mt-2">
								Note:{' '}
								<span className="font-black">
									{' '}
									Always buy your hardware wallet directly from the manufacturer
									itself.
								</span>
							</p>
							<h2 className="text-center text-white w-full my-4 font-bold text-md">
								If you have any questions you can always contact us via:{' '}
							</h2>
							<div className="flex gap-4">
								<a
									className="text-primary w-12 m-0 flex items-center"
									target="_blank"
									href="https://twitter.com/CoCoBottleClub?s=09"
								>
									<img src="/img/twitter.png" className="w-12 m-0" alt="" />
								</a>

								<a
									className="text-primary w-12 m-0 flex items-center"
									target="_blank"
									href="https://discord.gg/jx79rnJX8t"
								>
									<img src="/img/discord.png" className="w-12 m-0" alt="" />
								</a>

								<a
									className="text-primary w-12 m-0"
									target="_blank"
									href="https://t.me/+TsL_34k_1C81MjI0"
								>
									<img src="/img/Telegram.png" className="w-12 m-0" alt="" />
								</a>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
