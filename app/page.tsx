'use client';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { FeaturedIn } from './components/FeaturedIn/FeaturedIn';
import { Pricing } from './components/Pricing/Pricing';
import { BookLesson } from './components/BookLesson/BookLesson';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Maintenance } from './components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from './utils/maintenance';
import { useTranslation } from './hooks/useTranslation';
import { coursesData } from './data/courses';

export default function Home () {
	const { t } = useTranslation();

	const courses = coursesData.map(course => ({
		id: course.id,
		title: `${t.courses[course.titleKey as keyof typeof t.courses]} ${course.ageRange}`,
		ageRange: course.ageRange,
		schedule: course.schedule,
		image: course.bannerImage
	}));

	if (IS_MAINTENANCE_MODE) {
		return <Maintenance/>;
	}

	return <div className="flex flex-col min-h-screen">
		<Header/>
		<main>
			<Hero/>
			<FeaturedIn/>
			<section id="courses" className="py-[6em] px-[1em] max-w-[80rem] mx-auto">
				<h2 className="text-[3em] font-bold text-center mb-[1.5em]">{t.courses.title}</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5em]">
					{courses.map(course => (
						<CourseCard key={course.id} course={course}/>
					))}
				</div>
			</section>
			<Pricing/>
			<BookLesson/>
		</main>
		<Footer/>
	</div>;
}
