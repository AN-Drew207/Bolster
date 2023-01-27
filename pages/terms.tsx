import Link from 'next/link';
import * as React from 'react';

const Terms = () => {
	return (
		<div className="flex flex-col min-h-[100vh] md:px-36 px-4 pt-36 pb-24 bg-overlay">
			<h2 className="text-white md:text-3xl text-xl RalewayBold font-bold">
				Terms and Conditions
			</h2>
			<div className="flex flex-col gap-4 mt-10">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							1. THESE TERMS
						</h3>
						<p className="text-[15px] Montserrat text-white">
							1.1 These are the terms and conditions on which we supply
							collectible physical assets to you.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							1.2 Please read these terms carefully. These terms tell you who we
							are, how we will provide Assets to you, what to do if there is a
							problem and other important information. If you think that there
							is a mistake in these terms, please contact us to discuss.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							2. ABOUT US AND HOW TO CONTACT US
						</h3>
						<p className="text-[15px] Montserrat text-white">
							2.1 We are Bottlebits Ltd., a company registered in England with
							company number 13033712 and having its registered address at Flat
							9 Kingfisher House, 6 Melbury Road, London, England, W14 8LN (“
							<span className="font-bold">Bottlebits</span>”, “
							<span className="font-bold">we</span>”, “
							<span className="font-bold">us</span>” and “
							<span className="font-bold">our</span>”).
						</p>
						<p className="text-[15px] Montserrat text-white">
							2.2 Our VAT number is:{' '}
							<span className="font-bold">379994212</span>
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							3. INTERPRETATION
						</h3>
						<p className="text-[15px] Montserrat text-white">
							3.1 In these terms, the following words shall have the meanings
							given to them below: <br />
							<br />“<span className="font-bold">Asset</span>” means a
							collectible physical asset, e.g. rare spirit, wine, luxury watch,
							etc. that’s listed on our site; <br />
							<br /> “<span className="font-bold">NFT</span>” means a
							Non-Fungible Token, a unique digital asset developed in a
							blockchain technology.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							4. HOW TO CONTACT US
						</h3>
						<p className="text-[15px] Montserrat text-white">
							4.1 You can contact us in the following ways:
							<br /> (a) by email at:{' '}
							<a href="mailto:ask@nftbolster.com" className="text-secondary">
								ask@nftbolster.com;
							</a>{' '}
							<br />
							(b) through the contact form available on our website.
						</p>
						<p className="text-[15px] Montserrat text-white">
							4.2 When we use the words "writing" or "written" in these terms,
							this includes emails.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							5. OUR CONTRACT WITH YOU
						</h3>
						<p className="text-[15px] Montserrat text-white">
							5.1 If you have purchased all NFT(s) in an Asset, you may exchange
							the NFT(s) for the Asset and become the owner of the Asset.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							5.2 To do so, you must notify us by email at redeem@nftbolster.com
							and you will receive personal service to find out the best
							solution for your redemption. Please consider that all applicable
							duties, taxes and transportation will be paid by you. They are
							simple passthrough, and we will be transparent about the cost.
						</p>{' '}
						<p className="text-[15px] Montserrat text-white">
							5.3 Our acceptance of your order will take place when we email you
							to accept it (“Order Confirmation”), at which point a contract for
							the supply of the Asset will come into existence between you and
							us.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							6. PRICE
						</h3>
						<p className="text-[15px] Montserrat text-white">
							6.1 The price of the Asset shall be the total price you paid for
							the NFT(s).
						</p>
						<p className="text-[15px] Montserrat text-white">
							6.2 Additional costs will apply depending on how you wish for the
							Asset to be delivered (as detailed in section 5.2)
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							7. DELIVERY
						</h3>
						<p className="text-[15px] Montserrat text-white">
							7.1 We will make every effort to deliver the Asset to you within
							10 working days of the date of our Order Confirmation. In the
							event of any unforeseen delay outside of our control, we will
							inform you of the delay, the reason for it, and of the revised
							estimated delivery date in writing or by telephone.
						</p>
						<p className="text-[15px] Montserrat text-white">
							7.2 If you have requested delivery of the Asset to your address,
							delivery will be completed when we deliver that Asset to you in
							accordance with your instructions. You may be asked to provide our
							driver with a form of ID (passport or photocard driving licence).
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							8. TITLE AND RISK
						</h3>
						<p className="text-[15px] Montserrat text-white">
							8.1 The Asset will be your responsibility from completion of
							delivery.
						</p>
						<p className="text-[15px] Montserrat text-white">
							8.2 Ownership of the Asset will only pass to you when we receive
							payment in full of all sums due in respect of the Asset, and any
							other goods or services that we have supplied to you.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							9. ACCEPTANCE OF ASSET
						</h3>
						<p className="text-[15px] Montserrat text-white">
							9.1 The Asset that we provide to you must be as described, fit for
							purpose and of satisfactory quality, as stated in the metadata of
							the corresponding NFT(s).{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							9.2 It is your responsibility to check the Asset on or as soon as
							reasonably possible after its delivery to you.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							9.3 If the Asset you have received does not conform with the
							contract, you can contact us within 30 days after the delivery of
							the Asset to cancel the contract and request a refund. In such
							circumstances, we will provide you with instructions as to where
							the Asset should be returned to.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							9.4 Due to the nature of the goods, we shall have no legal
							responsibility to you for any fault or deterioration in any Asset
							we sell to you which arises after its delivery to you as a result
							of fair wear and tear, wilful damage, accident, negligence by you
							or any third party, or from your handling or storing the Asset
							inappropriately.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							9.5 In the case of fine spirits and wines, they may age and
							develop in a non-uniform manner, we will not have any
							responsibility for subjective judgements such as in respect of
							quality or drinkability.{' '}
						</p>
						<p className="text-[15px] Montserrat text-white">
							9.6 Nothing in these terms affects your legal rights. If you are
							in the UK, you can find detailed information on the Citizens
							Advice website www.adviceguide.org.uk or by calling 03454 04 05
							06.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							10. LIABILITY
						</h3>
						<p className="text-[15px] Montserrat text-white">
							10.1 Except in relation to the situations described in clause 10.3
							below, if we fail to comply with these terms, we are responsible
							for loss or damage you suffer that is a foreseeable result of our
							breaking this contract although our responsibility to you will not
							exceed the price of the products purchased.
						</p>
						<p className="text-[15px] Montserrat text-white">
							10.2 We will never be responsible for any loss or damage that is
							not foreseeable. Loss or damage is foreseeable if either it is
							obvious that it will happen or if, at the time the contract was
							made, both we and you knew it might happen, for example, if you
							discussed it with us during the sales process.
						</p>
						<p className="text-[15px] Montserrat text-white">
							10.3 We do not exclude or limit in any way our liability to you
							where it would be unlawful to do so. This includes liability for:
							<ul className="md:ml-6 ml-4">
								<li className="text-[15px] Montserrat text-white">
									(a) death or personal injury caused by our negligence or the
									negligence of our employees, agents or subcontractors;
								</li>{' '}
								<li className="text-[15px] Montserrat text-white">
									(b) fraud or fraudulent misrepresentation;{' '}
								</li>
								<li className="text-[15px] Montserrat text-white">
									(c) breach of your legal rights in relation to the products,
									including the right to receive products which are: as
									described and match information we provided to you; of
									satisfactory quality; fit for any particular purpose made
									known to us; and{' '}
								</li>
								<li className="text-[15px] Montserrat text-white">
									(d) defective products which you are protected against under
									applicable consumer protection law.
								</li>
							</ul>
						</p>
						<p className="text-[15px] Montserrat text-white">
							10.4 We only supply the products for domestic and private use. If
							you use the products for any commercial, business or re-sale
							purpose we will have no liability to you for any loss of profit,
							loss of business, business interruption, or loss of business
							opportunity.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							11. YOUR PRIVACY
						</h3>
						<p className="text-[15px] Montserrat text-white">
							11.1 Please see our{' '}
							<Link href="privacy">
								<span className="text-secondary cursor-pointer">
									{' '}
									Privacy Policy
								</span>
							</Link>{' '}
							which provides information about how we use your personal
							information. Please ensure that all of the information you give to
							us on our website including any username and password is kept
							safe, secure and confidential.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							12. COMPLAINTS
						</h3>
						<p className="text-[15px] Montserrat text-white">
							12.1 If you have a complaint or dispute with us relating to your
							purchase, in the first instance, please contact us via
							ask@nftbolster.com and we will attempt to resolve the complaint or
							dispute informally.
						</p>
						<p className="text-[15px] Montserrat text-white">
							12.2 If we are unable to resolve your complaint or dispute with
							you informally, we will suggest an appropriate consumer focused
							mediation or arbitration dispute resolution service based on the
							nature of the complaint or dispute and your location.
						</p>
						<p className="text-[15px] Montserrat text-white">
							12.3 Whilst you are under no obligation to resolve your complaint
							or dispute using this service, we would hope that you will use
							this service as we consider this the most cost effective and
							appropriate way to resolve complaints and disputes with our users.
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<h3 className="text-[15px] RalewarBold text-white font-bold">
							13. OTHER IMPORTANT TERMS
						</h3>
						<p className="text-[15px] Montserrat text-white">
							13.1 These terms are between you and us. No other person shall
							have any rights to enforce any of these terms.
						</p>
						<p className="text-[15px] Montserrat text-white">
							13.2 Each of the paragraphs of these terms operates separately. If
							any court or relevant authority decides that any of them are
							unlawful, the remaining paragraphs will remain in full force and
							effect.
						</p>
						<p className="text-[15px] Montserrat text-white">
							13.3 If we do not insist immediately that you do anything you are
							required to do under these terms, or if we delay in taking steps
							against you in respect of your breaking this contract, that does
							not mean that you do not have to do those things and it will not
							prevent us taking steps against you at a later date.
						</p>
						<p className="text-[15px] Montserrat text-white">
							13.4 We may vary these terms at any time. Please note, however,
							that if we do so, the terms which are in force at the time you
							make a purchase will apply in respect of that purchase.
						</p>
						<p className="text-[15px] Montserrat text-white">
							13.5 These terms are governed by English law.
						</p>
						<p className="text-[15px] Montserrat text-white">
							13.6 You can bring legal proceedings in respect of the products in
							the English courts. If you live in Scotland or Northern Ireland,
							you can bring legal proceedings in respect of the products in
							either the English courts or the courts of the country in which
							you reside.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Terms;
