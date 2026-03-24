'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/app/hooks/useTranslation';

export interface CourseData {
	id: string;
	ageRange: string;
	schedule: string;
	image: string;
	title: string;
}

export const CourseCard = ({ course }: { course: CourseData }) => {
	const { t } = useTranslation();

	// noinspection LongLine
	return <Link href={`/courses/${course.id}`}
	             className="group block bg-white border border-zinc-100 rounded-[1.5em] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
		<div className="relative h-[15em] overflow-hidden">
			<div className="absolute inset-0 bg-zinc-200 animate-pulse -z-10"/>
			<Image
				src={course.image}
				alt={course.title}
				fill
				className="object-cover group-hover:scale-110 transition-transform duration-500"
			/>
			<div
				className="absolute top-[1em] right-[1em] bg-second/80 backdrop-blur-md text-white px-[1em] py-[0.5em] rounded-full text-[0.8em] font-bold">
				{t.courses.ageRange}: {course.ageRange}
			</div>
		</div>
		<div className="p-[1.5em]">
			<h3 className="text-[1.3em] font-bold mb-[0.5em] group-hover:text-accent transition-colors">{course.title}</h3>
			<p className="text-black text-[0.9em] mb-[1.5em] flex items-center gap-[0.5em]">
				<span className="font-semibold">{t.courses.schedule}:</span> {course.schedule}
			</p>
			<span className="text-[0.9em] font-bold border-b-2 border-black group-hover:border-accent transition-colors">
				{t.courses.cta} →
			</span>
		</div>
	</Link>;
};
