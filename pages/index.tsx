import {
	OfferComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
	CTAComponent,
	WhyShouldComponent,
	LegalComponent,
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
			<LegalComponent />
			<TestimonialsComponent />
		</>
	);
};
export default Home;
