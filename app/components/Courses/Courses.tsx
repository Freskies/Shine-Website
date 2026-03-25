'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { coursesData } from '@/app/data/courses';
import { CourseCard } from '../CourseCard/CourseCard';
import { Underline } from '../ui/Underline/Underline';

export const Courses = () => {
	const { t } = useTranslation();

	const courses = coursesData.map(course => ({
		id: course.id,
		title: `${t.courses[course.titleKey as keyof typeof t.courses]} ${course.ageRange}`,
		ageRange: course.ageRange,
		schedule: `${course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days]).join('/')} ${course.time}`,
		image: course.bannerImage
	}));

	return (
		<section id="courses" className="py-[6em] bg-second/5 overflow-hidden relative">
			<div className="max-w-7xl mx-auto px-[1em] relative z-10">
				<div className="relative mb-[3em] text-center">
					<h2 className="text-[3em] font-bold">{t.courses.title}</h2>
					<Underline/>
				</div>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5em]">
					{courses.map(course => (
						<li key={course.id}>
							<CourseCard course={course}/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
