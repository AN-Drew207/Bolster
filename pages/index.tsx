import {
	CollectionsLandingComponent,
	MainSectionComponent,
} from 'components/landing/mainSection';
import * as React from 'react';

const Home = () => {
	return (
		<>
			<MainSectionComponent />
			<CollectionsLandingComponent />
		</>
	);
};
export default Home;
