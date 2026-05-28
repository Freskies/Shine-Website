import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { Hero } from './_components/Hero/Hero';
import { FeaturedIn } from './_components/FeaturedIn/FeaturedIn';
import { Pricing } from './_components/Pricing/Pricing';
import { HomeBookLesson } from './_components/HomeBookLesson/HomeBookLesson';
import { FAQ } from './_components/FAQ/FAQ';
import { ContactUs } from './_components/ContactUs/ContactUs';
import { Courses } from './_components/Courses/Courses';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

import styles from './home.module.css';

export default function Home () {
	return <div className={styles.pageWrapper}>
		<Header/>
		<main>
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
