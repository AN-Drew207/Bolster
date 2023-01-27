import React from 'react';
import { LeftCircleFilled, LoadingOutlined } from '@ant-design/icons';
// import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CHAINS } from 'components/chains';
import { AddressText } from 'components/common/specialFields/SpecialFields';
import { Button } from 'components/common/button';
import clsx from 'clsx';

const NFTDetailIDComponent: React.FC<any> = ({
	id,
	data,
	address,
	back,
	addCart,
	selected,
}) => {
	// const dispatch = useAppDispatch();

	return (
		<>
			{id !== undefined ? (
				<div className="min-h-screen w-full flex flex-col xl:px-36 md:px-10 sm:px-6 px-4 pb-24 bg-overlay">
					<div
						className="flex w-full text-lg items-center gap-2 text-white"
						onClick={() => back()}
					>
						<div className="flex items-center gap-2 cursor-pointer w-min">
							<LeftCircleFilled className="w-8 h-8" />
						</div>
					</div>
					<div className="w-full flex xl:flex-row flex-col h-full gap-4 justify-center">
						<div className="flex flex-col gap-2">
							<div className="flex relative items-center sticky top-20 justify-center xl:w-[500px] w-[320px] rounded-md bg-primary cursor-pointer relative overflow-hidden border border-gray-500">
								{data.image && (
									<img src={data.image} className="w-full h-full" alt="" />
								)}
								{data.animation_url && (
									<video
										src={data.animation_url}
										className="w-full h-full"
										autoPlay
										loop
									/>
								)}
							</div>
						</div>
						<div className="flex flex-col xl:w-[500px] gap-6 w-full pt-4">
							<div className="flex flex-col  w-full">
								<div className="flex justify-between">
									<h1 className="text-white uppercase md:text-4xl text-3xl font-bold">
										{data.name}
									</h1>
									<Button
										className={clsx(
											'z-10 border border-secondary bg-secondary RalewayBold font-bold px-4 py-2 text-[14px] text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
											'!rounded-full hover:text-secondary ml-4'
										)}
										onClick={() => addCart()}
									>
										{!selected ? 'Add to Cart' : 'Remove from Cart'}
									</Button>
								</div>
							</div>

							<div className="flex flex-col">
								<div className="flex items-center gap-4 py-2 border border-overlay-border bg-primary rounded-xl mt-4 relative">
									<p className="absolute top-2 right-4 text-white opacity-75 text-[11px]">
										TOKEN INFO
									</p>
									<div className="flex flex-col w-full">
										<h2 className="text-white font-bold text-lg border-b border-overlay-border pb-2 px-6">
											Token Details:
										</h2>
										<div className="w-full flex justify-between py-2 border-b border-overlay-border px-6">
											<p className="text-lg font-[400] text-white ">
												Blockchain:
											</p>
											<p className="text-white  font-[400] text-lg">
												{
													CHAINS[
														process.env.NEXT_PUBLIC_POLYGON_ID
															? (process.env.NEXT_PUBLIC_POLYGON_ID as any)
															: ''
													]?.name
												}
											</p>
										</div>
										<div className="w-full flex justify-between py-2 border-b border-overlay-border px-6">
											<p className="text-lg font-[400] text-white ">
												Token ID:
											</p>
											<p className="text-white  font-[400] text-lg">{id}</p>
										</div>
										{/* <div className="w-full flex justify-between py-2 border-b border-overlay-border px-6">
											<p className="text-lg font-[400] text-white ">
												Balance:
											</p>
											<p className="text-white  font-[400] text-lg">
												{NFTs.balanceCards[id]?.balance}
											</p>
										</div> */}
										<div className="w-full flex justify-between py-2 border-b border-overlay-border px-6">
											<p className="text-lg font-[400] text-white ">
												Token Standard:
											</p>
											<p className="text-white  font-[400] text-lg">ERC 721</p>
										</div>
										<div className="w-full flex justify-between py-2 border-b border-overlay-border px-6">
											<p className="text-lg font-[400] text-white ">
												Contract:
											</p>
											<a
												href={
													CHAINS[
														process.env.NEXT_PUBLIC_POLYGON_ID
															? (process.env.NEXT_PUBLIC_POLYGON_ID as any)
															: ''
													]?.blockExplorer +
													'/address/' +
													address
												}
												target="_blank"
												rel="noreferrer"
												className="text-secondary font-[400] text-lg flex items-center gap-1"
											>
												<AddressText text={address}></AddressText>{' '}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
													/>
												</svg>
											</a>
										</div>
										<div className="w-full flex justify-between pt-2 px-6 flex-col">
											<p className="text-lg font-[400] text-white ">
												Attibutes
											</p>
											<div className="flex flex-wrap gap-2 items-center justify-center">
												{data.attributes.map((attr: any) => {
													return (
														<div className="flex flex-col items-center justify-center min-w-[132px] h-20 bg-primary border-secondary border rounded-xl px-6">
															<h2 className="text-[14px] text-white font-bold text-center">
																{attr.value}
															</h2>
															<h2 className="text-[10px] text-white opacity-75 font-bold text-center">
																{attr.trait_type}
															</h2>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-4 py-2 border border-overlay-border bg-primary rounded-xl mt-4 relative">
									<div className="flex flex-col w-full">
										<h2 className="text-white font-bold text-lg border-b border-overlay-border pb-2 px-6">
											Token Description:
										</h2>
										<div className="w-full flex flex-col items-center justify-center py-2 px-6 gap-1">
											{data.description.split('\n').map((item: any) => {
												return (
													<p className="text-white text-sm font-[400] text-lg w-full text-justify">
														{item}
													</p>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="h-screen w-full bg-overlay flex items-center justify-center text-3xl text-white">
					<LoadingOutlined />
				</div>
			)}
		</>
	);
};

export default NFTDetailIDComponent;
