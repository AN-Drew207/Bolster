// import { useRouter } from 'next/router';
import * as React from 'react';
import bottlesTestnet from 'bottles_mumbai.json';
import bottlesMainnet from 'bottles_polygon.json';
import { CollectionComponent } from 'components/collection/CollectionComponent';

const Bottle = () => {
	return <CollectionComponent />;
};

export async function getStaticPaths() {
	const bottles =
		process.env.NEXT_PUBLIC_POLYGON_ID == '137'
			? bottlesMainnet.filter((bottle: any) => bottle.metadata.length == 1)
			: bottlesTestnet.filter((bottle: any) => bottle.metadata.length == 1);
	const paths = bottles.map((b: any) => {
		return { params: { id: b.address } };
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
