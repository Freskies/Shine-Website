'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/app/hooks/useTranslation';
import React from "react";

import styles from './CourseCard.module.css';

export interface CourseData {
	id: string;
	ageRange: string;
	schedule: string;
	image: string;
	title: string | React.ReactNode;
}

export const CourseCard = ({ course }: { course: CourseData }) => {
	const { t } = useTranslation();

	return <Link href={`/courses/${course.id}`} className={styles.card}>
		<figure className={styles.figure}>
			<div className={styles.placeholder}/>
			<Image
				src={course.image}
				alt={typeof course.title === 'string' ? course.title : course.id}
				fill
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				className={styles.image}
			/>
		</figure>
		<figcaption className={styles.content}>
			<h3 className={styles.title}>{course.title}</h3>
			<p className={styles.schedule}>
				<span className={styles.scheduleLabel}>{t.courses.schedule}:</span> {course.schedule}
			</p>
			<span className={styles.cta}>
				{t.courses.cta} →
			</span>
		</figcaption>
	</Link>;
};
