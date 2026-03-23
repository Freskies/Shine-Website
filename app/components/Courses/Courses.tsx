'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { coursesData } from '@/app/data/courses';
import { CourseCard } from '../CourseCard/CourseCard';

export const Courses = () => {
	const { t } = useTranslation();

	const courses = coursesData.map(course => ({
		id: course.id,
		title: `${t.courses[course.titleKey as keyof typeof t.courses]} ${course.ageRange}`,
		ageRange: course.ageRange,
		schedule: course.schedule,
		image: course.bannerImage
	}));

	return (
		<section id="courses" className="py-[6em] px-[1em] max-w-7xl mx-auto">
			<h2 className="text-[3em] font-bold text-center mb-[1.5em]">{t.courses.title}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5em]">
				{courses.map(course => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</section>
	);
};
