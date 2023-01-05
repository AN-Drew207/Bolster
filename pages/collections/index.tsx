// import { useRouter } from 'next/router';
import { CollectionsLandingComponent } from 'components/collection/BottlesComponent/BottlesCollections';
import * as React from 'react';
const Bottle = () => {
	return (
		<div className="flex flex-col pt-16 bg-overlay">
			{' '}
			<CollectionsLandingComponent />
		</div>
	);
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
	// const { query } = useRouter();

	return {
		// Passed to the page component as props
		props: {},
	};
}

export default Bottle;
