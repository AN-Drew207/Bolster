export const addMumbaiEthereumChain = async () => {
	await (window as any).ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [
			{
				chainId: '0x13881', // A 0x-prefixed hexadecimal string
				chainName: 'Mumbai Testnet',
				nativeCurrency: {
					name: 'MATIC',
					symbol: 'MATIC', // 2-6 characters long
					decimals: 18,
				},
				rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
				blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
			},
		],
	});
};

export const addPolygonEthereumChain = async () => {
	await (window as any).ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [
			{
				chainId: '0x89', // A 0x-prefixed hexadecimal string
				chainName: 'Polygon Network',
				nativeCurrency: {
					name: 'MATIC',
					symbol: 'MATIC', // 2-6 characters long
					decimals: 18,
				},
				rpcUrls: ['https://polygon-rpc.com'],
				blockExplorerUrls: ['https://explorer.matic.network/'],
			},
		],
	});
};

export const switchEthereumChain = async (chainId: string) => {
	await (window as any).ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: chainId }],
	});
};
