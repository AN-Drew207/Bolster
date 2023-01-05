import {
	OfferComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	TestimonialsComponent,
	CTAComponent,
	WhyShouldComponent,
	LegalComponent,
	TypeOfBolsterComponent,
	// ArtistsAndProjectsComponent,
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
			{/* <ArtistsAndProjectsComponent /> */}
			<WhyShouldComponent />
			<LegalComponent />
		</>
	);
};
export default Home;
