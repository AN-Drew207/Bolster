import {
	OfferComponent,
	CollectionsLandingComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
	CTAComponent,
} from 'components/landing/mainSection';
import * as React from 'react';

const Home = () => {
	return (
		<>
			<MainSectionComponent />
			<OfferComponent />
			<HowWeDoItComponent />
			<TestimonialsComponent />
			<CTAComponent />
			<CollectionsLandingComponent />
		</>
	);
};
export default Home;
