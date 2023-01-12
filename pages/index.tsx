import {
	MainSectionComponent,
	HowWeDoItComponent,
	CTAComponent,
	WhyShouldComponent,
	LegalComponent,
	ArtistsComponent,
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
			<ArtistsComponent />
			{/* <ArtistsAndProjectsComponent /> */}
			<LegalComponent />
			<ContactUs />
		</>
	);
};
export default Home;
