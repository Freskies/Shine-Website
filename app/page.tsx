import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { FeaturedIn } from './components/FeaturedIn/FeaturedIn';
import { Pricing } from './components/Pricing/Pricing';
import { HomeBookLesson } from './components/HomeBookLesson/HomeBookLesson';
import { FAQ } from './components/FAQ/FAQ';
import { ContactUs } from './components/ContactUs/ContactUs';
import { Courses } from './components/Courses/Courses';
import { Maintenance } from './components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from './utils/maintenance';

export default function Home () {
	if (IS_MAINTENANCE_MODE)
		return <Maintenance/>;

	return <div className="flex flex-col min-h-screen">
		<Header/>
		<main className="pb-[4em]">
			<Hero/>
			<FeaturedIn/>
			<Courses/>
			<Pricing/>
			<HomeBookLesson/>
			<FAQ/>
			<ContactUs/>
		</main>
		<Footer/>
	</div>;
}
