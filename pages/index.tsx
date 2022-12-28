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
			<TestimonialsComponent />
			<CTAComponent />
			<WhyShouldComponent />
			<CollectionsLandingComponent />
		</>
	);
};
export default Home;
