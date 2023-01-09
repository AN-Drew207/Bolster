import {
	OfferComponent,
	MainSectionComponent,
	HowWeDoItComponent,
	CTAComponent,
	WhyShouldComponent,
	LegalComponent,
	TypeOfBolsterComponent,
	ContactUs,
} from 'components/landing/mainSection';
import * as React from 'react';

const Home = () => {
	return (
		<>
			<MainSectionComponent />
			<OfferComponent />
			<HowWeDoItComponent />
			{/* <TestimonialsComponent /> */}
			<CTAComponent />
			<TypeOfBolsterComponent />
			{/* <ArtistsAndProjectsComponent /> */}
			<WhyShouldComponent />
			<LegalComponent />
			<ContactUs />
		</>
	);
};
export default Home;
