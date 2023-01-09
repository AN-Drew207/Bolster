import * as React from 'react';

const FAQS = () => {
	const items = [
		{
			title: 'What is Bolster?',
			answer: `Bolster is a platform that offers NFT, created by artists, with a stop value backed by luxury collectibles. Customers have the ability to reissue the NFT for the physical version. This means that the consumer will own the physical item and Bolster will keep it safe until the reissue process takes place. 
We use the Polygon Blockchain to guarantee proof of authenticity and maintain traceability of all transactions.`,
		},
		{
			title: 'How do you guarantee the Backstop Value?',
			answer: `Since the NFTs represent the legal rights to the physical asset, if the value of the NFT declines, there is an incentive in the market to maintain demand and maintain value.`,
		},
		{
			title: 'Where do you keep the physcal assets?',
			answer: `All of our assets are securely stored in separate asset-specific facilities. Storing a bottle of liquor is not the same as storing a watch or a painting. 
But don't worry about that, UK law protects you, your NFT is your right to your asset, we just look after it for you!`,
		},
		{
			title: 'How can I redeem my NFTs for the physical item?',
			answer: `Once you own the entire collection of NFTs that represents an item (it can be 1 NFT or several). 
In the “account” section you will be able to make the exchange, process in which we will contact you to deliver the asset.
`,
			note: 'Just write tu us at redeem@nftbolster.com and we will start a personal service ',
		},
		{
			title: 'How does Bolster make a living?',
			answer: `Think of us as a store/warehouse, meaning everything that supports the value of the NFTs is under our control, it is ours. 
Once you buy it, we take care of it for you, until you gather all the collection and decide to redeem it.`,
		},
		{
			title: 'Which blockchain network is used for Bolster NFTs?',
			answer: `We work on the Polygon Blockchain`,
		},
		{
			title: 'What happens to my NFT if I choose to redeem it?',
			answer: `Your NFTs will be burned, each collection is backed up by 1 physical asset, and only 1. So when someone reedems them (NFTs) for the asset we lose control of the physical asset and so the NFTs are burned.`,
		},
	];
	return (
		<div className="flex flex-col min-h-[100vh] px-36 pt-36 pb-24 bg-overlay">
			<h2 className="text-white text-3xl RalewayBold font-bold">FAQS</h2>
			<div className="flex flex-col gap-4 mt-10">
				{items.map(({ title, answer }) => {
					return (
						<div className="flex flex-col gap-2">
							<h3 className="text-[15px] RalewarBold text-white font-bold">
								&#8226; {title}
							</h3>
							<p className="text-[15px] Montserrat text-white">{answer}</p>
						</div>
					);
				})}
				<div className="flex flex-col gap-2">
					<h3 className="text-[15px] RalewarBold text-white font-bold">
						&#8226; What’s the best way to reach you?
					</h3>
					<p className="text-[15px] Montserrat text-white">
						If you are an artist:{' '}
						<span className="text-secondary">art@nftbolster.com</span> <br /> If
						you have an NFT project:{' '}
						<span className="text-secondary">project@nftbolster.com</span>{' '}
						<br />
						If you are a collector:{' '}
						<span className="text-secondary">
							hello@nftbolster.com
						</span> <br /> General inquiries:{' '}
						<span className="text-secondary">ask@nftbolster.com</span>{' '}
					</p>
				</div>
			</div>
		</div>
	);
};
export default FAQS;
