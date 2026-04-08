'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { useState } from 'react';
import { coursesData, CourseInfo } from '@/app/data/courses';
import { motion, AnimatePresence } from 'framer-motion';
import { Underline } from '../ui/Underline/Underline';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5'

export const HomeBookLesson = () => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	const steps = [
		{ id: 1, text: t.bookLesson.step1 },
		{ id: 2, text: t.bookLesson.step2 },
		{ id: 3, text: t.bookLesson.step3 }
	];

	const handleCourseSelect = (course: CourseInfo) => {
		setIsModalOpen(false);
		router.push(`/courses/${course.id}`);
	};

	return (
		<section id="book-lesson-home" className="py-[6em] px-[1em] bg-bg-color">
			<div className="max-w-200 mx-auto">
				<div className="relative mb-[3em] text-center">
					<h2 className="text-[3em] font-bold leading-tight">{t.bookLesson.title}</h2>
					<Underline/>
				</div>

				<div className="grid gap-[2em] mb-[4em]">
					{steps.map((step) => (
						<div key={step.id}
						     className="flex gap-[1.5em] items-center p-[2em] bg-white rounded-[2em] shadow-sm border border-zinc-100">
							<div
								className="bg-accent text-white w-[2.5em] h-[2.5em] rounded-full flex items-center justify-center font-bold shrink-0 text-[1.2em]">
								{step.id}
							</div>
							<div>
								<p className="text-[1.2em] font-medium text-zinc-800">{step.text}</p>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<button
						onClick={() => setIsModalOpen(true)}
						className="inline-block bg-accent hover:bg-accent/90 text-white px-[3em] py-[1.2em] rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
					>
						{t.bookLesson.cta}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<div className="fixed inset-0 z-100 flex items-center justify-center p-[1em]">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsModalOpen(false)}
							className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="bg-white w-full max-w-160 rounded-[2.5em] p-[2em] relative z-10 max-h-[90vh] overflow-y-auto"
						>
							<button
								onClick={() => setIsModalOpen(false)}
								className="absolute top-[1.5em] right-[1.5em] text-zinc-400 hover:text-zinc-800 transition-colors"
							>
								<IoCloseOutline size="24px" />
							</button>

							<h3 className="text-[2em] font-bold mb-[1.5em] text-center">{t.bookLesson.modalTitle}</h3>

							<div className="grid grid-cols-1 gap-[1em]">
								{coursesData.map((course) => {
									const courseTitle = t.courses[course.titleKey as keyof typeof t.courses] as string;
									const ageRange = course.ageRange;
									const title = `${courseTitle}`;
									return (
										<button
											key={course.id}
											onClick={() => handleCourseSelect(course)}
											className="p-[1.2em] rounded-[1.5em] text-left transition-all border-2 border-zinc-100 hover:border-accent hover:bg-accent/5 bg-zinc-50"
										>
											<p className="font-bold text-zinc-800">
												<span className="whitespace-nowrap">{title}</span>
												{' '}
												<span className="whitespace-nowrap">{ageRange}</span>
											</p>
											<p className="text-[0.9em] text-zinc-500">
												{course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days] as string).join('/')} {course.time}
											</p>
										</button>
									);
								})}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</section>
	);
};
