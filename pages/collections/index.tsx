// import { useRouter } from 'next/router';
import * as React from 'react';
import { CollectionsLandingComponent } from 'components/landing/mainSection';

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
