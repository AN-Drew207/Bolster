import {
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
			<WhyShouldComponent />

			<HowWeDoItComponent />
			{/* <TestimonialsComponent /> */}
			<CTAComponent />
			<TypeOfBolsterComponent />
			{/* <ArtistsAndProjectsComponent /> */}
			<LegalComponent />
			<ContactUs />
		</>
	);
};
export default Home;
