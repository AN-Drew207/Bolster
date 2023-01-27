import * as React from 'react';

const FAQS = () => {
	return (
		<div className="flex flex-col min-h-[100vh] md:px-36 px-4 pt-36 pb-24 bg-overlay">
			<h2 className="text-white md:text-3xl text-xl RalewayBold font-bold">
				FAQs
			</h2>
			<div className="flex flex-col gap-4 mt-10">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							What is Bolster?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							Bolster is a platform that offers NFTs, each with a stop value
							backed by luxury collectibles. Customers have the ability to
							redeem their NFT for the physical item, and Bolster ensures
							safekeeping of the physical item until redemption.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							How does the Backstop Value works?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							Our NFTs grant legal right to be redeemed for a physical
							collectible, such as a rare bottle of whiskey or watch. When the
							value of the NFT drops below the market value of the physical
							collectible, there is an economic incentive to purchase the NFT in
							order to redeem the collectible. This can either drive the value
							of the NFT back up or provide an opportunity to acquire the
							physical collectible at a discounted price.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							Where are the physical assets kept?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							Our physical assets are securely stored in specialized facilities
							that are tailored to the specific needs of each asset type. For
							example, a bottle of liquor is stored differently than a watch or
							painting. Rest assured, UK law protects your legal rights as the
							NFT holder and we are responsible for the safekeeping of the
							physical asset on your behalf.
							<br />
							<br /> Our current collection of whisky bottles is securely stored
							at the Hillington facility of{' '}
							<a
								href="https://www.lcb.co.uk"
								target="_blank"
								className="text-secondary"
							>
								London City Bond Ltd
							</a>{' '}
							, a leading provider of wine and spirit storage solutions.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							What do I own if I buy a NFT?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							When you acquire an NFT from our marketplace, you are gaining
							ownership of a one-of-a-kind digital asset, such as an original
							artwork or digital collectible. With this purchase, you also have
							the option to redeem the NFT for its corresponding physical
							collectible. However, it is important to note that redeeming the
							NFT will result in it being permanently destroyed, or "burned,"
							meaning you will no longer have access to the digital asset but
							will instead receive the physical collectible. If the NFT is part
							of a collection, you must own the entire collection in order to
							redeem them.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							Where can I view my purchases?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							You can view your NFT purchases in the "account" section of our
							platform. However, as NFTs are unique and fully owned by you, they
							can also be viewed on any marketplace that supports the display of
							NFTs.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							How can I redeem my NFTs for the physical item?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							To redeem your NFTs for the corresponding physical collectible,
							you must first own the entire collection of NFTs that represents
							the item. This can be one NFT or multiple. Once you have the full
							collection, you can contact us at{' '}
							<a href="mailto:redeem@nftbolster.com" className="text-secondary">
								redeem@nftbolster.com
							</a>{' '}
							and we will assist you in the redemption process through a
							personalized service.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							Why is Bolster Valuable?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							Bolster is valuable because we are a trusted third party that
							carefully curates, filters, and authenticates physical
							collectibles. We store them in specialized facilities and provide
							the technical and legal services for them to be linked to an NFT
							or a collection of NFTs. This gives collectors peace of mind that
							there is real value behind their digital collectibles. <br />
							<br /> For artists and NFT projects, we provide a unique offering
							that sets them apart and gives their collectors added confidence
							in the value of their NFTs by having physical assets rights
							attached to them.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							What happens to my NFT if I choose to redeem it?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							When you choose to redeem your NFT, it will be permanently
							destroyed, commonly referred to as "burning." This is because each
							NFT collection is backed by only one physical asset, and when that
							asset is redeemed, we lose control of it. As a result, the NFTs
							associated with that collection must also be destroyed to maintain
							the one-to-one relationship between digital and physical assets.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							Which blockchain network is used by Bolster?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							At the moment, Bolster NFTs are built on the Polygon blockchain
							network.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							What’s the best way to reach you?
						</h3>
						<p className="text-[15px] Montserrat text-white">
							If you are an artist:{' '}
							<a href="mailto:art@nftbolster.com" className="text-secondary">
								art@nftbolster.com
							</a>{' '}
							<br /> If you have an NFT project:{' '}
							<a
								href="mailto:project@nftbolster.com"
								className="text-secondary"
							>
								project@nftbolster.com
							</a>{' '}
							<br />
							If you are a collector:{' '}
							<a href="mailto:hello@nftbolster.com" className="text-secondary">
								hello@nftbolster.com
							</a>{' '}
							<br /> General inquiries:{' '}
							<a href="mailto:ask@nftbolster.com" className="text-secondary">
								ask@nftbolster.com
							</a>{' '}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default FAQS;
