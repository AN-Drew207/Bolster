/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import { Button } from 'components/common/button/button';
import Styles from './styles.module.scss';
import Web3 from 'web3';
import Link from 'next/link';

export const TutorialCollection = () => {
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
					'flex flex-col items-center py-24 lg:w-1/2 w-full lg:pl-8 px-10 gap-8 relative',
					'justify-center'
				)}
			>
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-center text-secondary w-full my-4 font-bold text-md">
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
					<h2 className="text-center text-secondary w-full my-4 font-bold text-md">
						How to buy a CoCo B.C. membership:
					</h2>
					<h2 className="text-2xl font-bold  text-left text-secondary">
						1. Getting your Decentralized Wallet
					</h2>
					<p className="text-md font-bold text-center text-secondary">
						Click in 'Download Metamask'. A default account with an associated
						public Ethereum address will be created on the Main Network. Your
						Metamask Ethereum address can be found on the main screen and it
						starts with 0x.
					</p>
					<Button
						className={clsx(
							'p-4 rounded-xl bg-orange-500 text-secondary font-bold hover:bg-transparent hover:text-orange-500 border-orange-500 border',
							Styles.button
						)}
					>
						<a href={'https://metamask.io/download/'} target="_blank">
							Download Metamask
						</a>
					</Button>
					<h2 className="text-2xl font-bold text-center text-secondary">
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
					<h2 className="text-2xl font-bold text-center text-secondary">
						Follow this image tutorial
					</h2>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								Click on 'Download Metamask'. A default account with an
								associated public Ethereum address will be created on the Main
								Network, which can be found on the main screen.
							</p>
							<img
								src="/img/step1_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								Click on “Download Now” and “Install MetaMask for Chrome”
							</p>
							<img
								src="/img/step2_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								Click on 'Create A Wallet' to create your MetaMask wallet.{' '}
							</p>
							<img
								src="/img/step3_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>

						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								You will type down the password you want for your MetaMask
								wallet.{' '}
							</p>

							<img
								src="/img/metamaskPassword.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								You will be given a seed phrase. Please write down this seed
								phrase on a piece of paper and store it in a secure location,
								never reveal this seed phrase to anyone.
							</p>

							<img
								src="/img/step4_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								Next, click on each word of your seed phrase in the correct
								order. Once you confirm it, your MetaMask account will be
								created.
							</p>
							<img
								src="/img/step5_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-md font-bold  text-center text-secondary mb-2">
								When you click on the MetaMask logo on your browser’s extension,
								you will be able to see your wallet´s details. As you can see
								below, you have 0ETH and US$0 in your wallet, that takes us to
								the next point — funding your wallet
							</p>
							<img
								src="/img/step6_metamask.png"
								className={clsx(Styles.tutoImage)}
								alt=""
							/>
							<p className="text-sm font-bold  text-left mt-1 text-secondary">
								Image Credit: MetaMask
							</p>
							<p className="text-md font-bold text-center text-secondary mt-2">
								Tip: On the right top corner of your chrome browser, you will
								find a small puzzle piece, click on it and you will see your
								extensions, find the Metamask logo and click on the pin next to
								it, so it will always be visible.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<h2 className="text-2xl font-bold  text-center text-secondary">
						2. Funding your wallet with ETH
					</h2>
					<p className="text-md font-bold  text-center text-secondary ">
						To fund your wallet with cryptocurrency (ETH), it is necessary to
						use a third-party exchange. There are several exchanges, and each
						has different options to buy, such as Credit Card, Debit Card, or
						Bank Transfer.
					</p>
					<p className="text-md font-bold  text-center text-secondary ">
						Here are some examples of exchanges in different regions:{' '}
					</p>
					<h2 className="text-2xl font-bold mt-2 text-center text-secondary">
						Top 5 Exchanges
					</h2>
					<table className="min-w-full divide-y divide-gray-200 mb-4 bg-overlay rounded-md text-secondary">
						<thead className="text-secondary text-xl">
							<tr>
								<th className="py-4 ">Global</th>
								<th className="py-4  border-x border-white">USA</th>
								<th className="py-4">Europe</th>
							</tr>
						</thead>
						<tbody className="text-secondary">
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
											<th scope="col" className="py-4 border-x border-white">
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
					<p className="text-md font-bold text-center text-secondary">
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
					<p className="text-md font-bold text-center w-full text-secondary">
						Note 1: Remember Metamask is a decentralized wallet, it only works
						with cryptocurrencies.
					</p>
					<p className="text-md font-bold text-center w-full text-secondary">
						Note 2: Please take into account that some exchanges may not operate
						worldwide.
					</p>
					<p className="text-md font-bold text-center w-full text-secondary">
						Note 3: We are not related to these exchanges in any way.
					</p>

					{/* <img className="h-80 w-full" src="/img/mainPageImage" alt="" /> */}
				</div>
				<div className="flex flex-col items-center gap-2">
					<h2 className="text-2xl font-bold  text-center text-secondary">
						3. Minting your CoCo B.C. NFT membership
					</h2>
					<p className="text-md font-bold text-center w-full text-secondary">
						After fund your wallet, you have to go to the{' '}
						<Link href="/">
							<span className="text-primary cursor-pointer">
								CoCo Mint Page
							</span>
						</Link>{' '}
						and click 'Membership Mint'.
					</p>
					<img className="h-80" src="/img/menu.png" alt="" />
					<p className="text-md font-bold text-center w-full text-secondary">
						Then click 'Connect Wallet'.
					</p>
					<img className="h-80" src="/img/connectWallet.png" alt="" />
					<p className="text-md font-bold text-secondary">
						A pop-up with your wallets will appear, select the one you want to
						connect and click 'Next'.
					</p>
					<img className="h-80" src="/img/connectingWallet.png" alt="" />
					<p className="text-md font-bold text-secondary">
						Click 'Connect' and wait.
					</p>
					<img className="h-80" src="/img/connectingWallet2.png" alt="" />
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-md font-bold text-center text-secondary">
						If you are on our whitelist, you will see the screen below. Put the
						number of memberships you want to mint and then click on the 'Mint
						Now' button.
					</p>
					<img className="h-80" src="/img/mainPageImage.png" alt="" />
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-md font-bold text-secondary">
						Metamask pop-up will appear and you have to click on 'Confirm'
						{'. '}
					</p>
					<div className="flex xl:flex-row flex-col items-center justify-center gap-4 ">
						<img className="w-80" src="/img/txAccept.png" alt="" />
						<p className="text-md font-bold text-center w-full text-secondary mt-2 xl:w-1/3">
							Note: Always review the link and transaction you are interacting
							with before you 'Confirm' any operation.
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-md font-bold text-secondary">
						When the transaction is done you will see a congratulations message{' '}
					</p>
					<img className="h-80" src="/img/congrats.png" alt="" />
				</div>
				<div className="flex flex-col items-center gap-2">
					<h2 className="text-2xl font-bold  text-center text-secondary">
						How look at your membership? <br />
					</h2>
					<p className="text-md font-bold text-center text-secondary">
						You can see them in any marketplace that you like. Some of the most
						popular are{' '}
						<a
							className="text-primary"
							target="_blank"
							href="http://opensea.io/"
						>
							Opensea
						</a>
						{' and '}
						<a
							className="text-primary"
							target="_blank"
							href="http://opensea.io/"
						>
							Looksrare
						</a>
						{', '}
						but there are plenty more. In all of them, you will have to 'log in'
						(Connect) with your wallet (MetaMask) and then go to your profile,
						to see all your assets.
					</p>
					<p className="text-md font-bold text-center w-full text-secondary mt-2">
						Tip: We recommend buying a hardware wallet to store your digital
						assets. There are a few options on the market but we suggest Ledger
						or Trezor, since they are the ones with more experience.
					</p>{' '}
					<p className="text-md font-bold text-center w-full text-secondary mt-2">
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
					<p className="text-md font-bold text-center w-full text-secondary mt-2">
						Note:{' '}
						<span className="font-black">
							{' '}
							Always buy your hardware wallet directly from the manufacturer
							itself.
						</span>
					</p>
					<h2 className="text-center text-secondary w-full my-4 font-bold text-md">
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
			</div>
		</div>
	);
};
