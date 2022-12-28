import * as React from 'react';
import bottlesTestnet from 'bottles_mumbai.json';
import bottlesMainnet from 'bottles_polygon.json';
import { BottleToken } from 'components/collection/BottleToken';

const Bottle = () => {
	return <BottleToken />;
};

export async function getStaticPaths() {
	const bottles =
		process.env.NEXT_PUBLIC_POLYGON_ID == '137'
			? bottlesMainnet
			: bottlesTestnet;

	const NFTs = [];
	for (let i = 0; i < bottles.length; i++) {
		for (let j = 0; j < bottles[i].metadata.length; j++) {
			NFTs.push({
				metadata: bottles[i].metadata[j],
				address: bottles[i].address,
			});
		}
	}
	const paths = NFTs.map((b: any) => {
		return { params: { tokenId: b.metadata.id.toString(), id: b.address } };
	});

	console.log(paths);
	return {
		paths: paths,
		fallback: false, // can also be true or 'blocking'
	};
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
	// const { query } = useRouter();

	return {
		// Passed to the page component as props
		props: {},
	};
}

export default Bottle;
