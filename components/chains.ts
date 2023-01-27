const MATIC: any = {
	name: 'Matic',
	symbol: 'MATIC',
	decimals: 18,
};

export const CHAINS: {
	[chainId: number]: any;
} = {
	137: {
		urls: [
			process.env.infuraKey
				? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
				: '',
			'https://polygon-rpc.com',
		].filter((url) => url !== ''),
		name: 'Polygon Mainnet',
		nativeCurrency: MATIC,
		blockExplorerUrls: ['https://mumbai.polygonscan.com'],
		blockExplorer: 'https://polygonscan.com',
	},
	80001: {
		urls: [
			process.env.infuraKey
				? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}`
				: '',
		].filter((url) => url !== ''),
		name: 'Polygon Mumbai',
		nativeCurrency: MATIC,
		blockExplorerUrls: ['https://mumbai.polygonscan.com'],
		blockExplorer: 'https://mumbai.polygonscan.com',
	},
};
