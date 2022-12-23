import * as React from 'react';
import type { AppProps } from 'next/app';
import clsx from 'clsx';
// import { Provider } from 'next-auth/client';
import { ThemeContext, ThemeType } from 'context';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'styles/global-tailwind.css';
import 'styles/globals.scss';
import 'styles/fonts.scss';
import 'styles/styles-ant.scss';
import 'styles/index.scss';
import 'styles/fontawesome/fontawesome.css';
import Head from 'next/head';
import AppLayout from 'components/common/Layouts';
/* import { Images } from 'consts'; */
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { Footer } from 'components/footer';
function MyApp({
	Component,
	pageProps,
}: AppProps & { Component: any }): JSX.Element {
	const [theme, setTheme] = React.useState<ThemeType>('light');
	const queryClientRef = React.useRef<QueryClient | null>(null);

	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<>
			<Head>
				<title>Bolster</title>
				<meta name="description" content="" />
				<meta name="msapplication-TileColor" content="#e68fa7" />
				<meta name="theme-color" content="#e68fa7" />

				<link rel="icon" type="image/x-icon" href="Isotype_Gold.png" />
				<meta property="og:title" content="Bolster" />
				<meta property="og:description" content="" />
				<meta property="og:image:width" content="300" />
				<meta property="og:image:height" content="200" />
				<meta property="og:title" content="Bolster" />
				<meta property="og:site_name" content="Bolster" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<QueryClientProvider client={queryClientRef.current}>
				<Provider store={store}>
					<ThemeContext.Provider value={{ theme, setTheme }}>
						<div
							className={clsx(
								'font-montserrat min-h-screen text-gray-800',
								'transition-colors duration-1000',
								theme
							)}
						>
							<AppLayout />

							<Component {...pageProps} />
							<Footer />
						</div>
					</ThemeContext.Provider>
				</Provider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
