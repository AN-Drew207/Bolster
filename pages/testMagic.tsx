import useMagicLink from 'hooks/useMagicLink';
// import { NFTStorage, File, Blob } from 'nft.storage';
import React from 'react';

export default function Upload() {
	// const [files, setFiles] = React.useState<any>(null);

	// const submit = async () => {
	// 	if (files && files.length) {
	// 		const client = new NFTStorage({
	// 			token:
	// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI0MTlhMTNFNTlmMTc0NzYxNGY0NDY0M2E4N0I4ODAyZTI5ODIxNDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjY3MjYwMzkwNiwibmFtZSI6Im15a2V5In0.9jGKxAgfAg_11cBG4Y2we35u6xjsq1oAi83rUY8j9m8',
	// 		});

	// 		const cid = await client.storeDirectory(files);
	// 		console.log(cid, 'ipfs');
	// 	}
	// };

	// const bottleContract = '0xd7Cc834dfeCAb531AE810FA2e0335363Aa56DAa9';

	const {
		login,
		signMessage,
		disconnect,
		showWallet,
		sendTransaction,
		account,
		// mint,
	} = useMagicLink();

	return (
		<div className="app h-screen flex flex-col gap-4 items-center w-full relative py-40 text-white">
			<h2 className="text-white text-center">Magic Connect</h2>
			{!account && (
				<button onClick={login} className="button-row">
					Sign In
				</button>
			)}

			{account && (
				<>
					<button onClick={showWallet} className="button-row">
						Show Wallet
					</button>
					<button onClick={sendTransaction} className="button-row">
						Send Transaction
					</button>
					<button onClick={signMessage} className="button-row">
						Sign Message
					</button>
					<button onClick={disconnect} className="button-row">
						Disconnect
					</button>
					<button
						// onClick={() =>
						// 	mint(
						// 		bottleContract,
						// 		2,
						// 		process.env.NEXT_PUBLIC_WMATIC_ADDRESS
						// 			? process.env.NEXT_PUBLIC_WMATIC_ADDRESS
						// 			: ''
						// 	)
						// }
						className="button-row"
					>
						Send Transaction
					</button>
				</>
			)}
		</div>
	);
}
