import {
	OfferComponent,
	CollectionsLandingComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
	CTAComponent,
	WhyShouldComponent,
} from 'components/landing/mainSection';
import * as React from 'react';

const Home = () => {
	return (
		<>
			<MainSectionComponent />
			<OfferComponent />
			<HowWeDoItComponent />
			<CTAComponent />
			<WhyShouldComponent />
			<TestimonialsComponent />
			<CollectionsLandingComponent />
		</>
	);
};
export default Home;
