import {
	OfferComponent,
	CollectionsLandingComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
} from 'components/landing/mainSection';
import * as React from 'react';

const Home = () => {
	return (
		<>
			<MainSectionComponent />
			<OfferComponent />
			<HowWeDoItComponent />
			<TestimonialsComponent />
			<CollectionsLandingComponent />
		</>
	);
};
export default Home;
