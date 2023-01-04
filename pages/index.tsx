import {
	OfferComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
	CTAComponent,
	WhyShouldComponent,
	LegalComponent,
	TypeOfBolsterComponent,
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
			<TypeOfBolsterComponent />
			<WhyShouldComponent />
			<LegalComponent />
		</>
	);
};
export default Home;
