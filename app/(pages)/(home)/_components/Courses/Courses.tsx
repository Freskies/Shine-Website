'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { coursesData } from '@/app/data/courses';
import { CourseCard } from '../CourseCard/CourseCard';
import { Underline } from '../ui/Underline/Underline';

import styles from './Courses.module.css';

export const Courses = () => {
	const { t } = useTranslation();

	const courses = coursesData.map(course => {
		const title = t.courses[course.titleKey as keyof typeof t.courses] as string;
		const ageRange = `${course.ageRange} ${t.courses.years}`;
		return {
			id: course.id,
			title: <span className={styles.blockLeadingTight}>
				<span className={styles.whitespaceNowrap}>{title}</span>
				{' '}
				<span className={styles.whitespaceNowrap}>{ageRange}</span>
			</span>,
			ageRange: ageRange,
			schedule: `${course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days]).join('/')} ${course.time}`,
			image: course.bannerImage
		};
	});

	return (
		<section id="courses" className={styles.coursesSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t.courses.title}</h2>
					<Underline/>
				</div>
				<ul className={styles.courseList}>
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
