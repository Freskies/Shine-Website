'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { useLockBodyScroll } from '@/app/hooks/useLockBodyScroll';
import { useState } from 'react';
import { coursesData, CourseInfo } from '@/app/data/courses';
import { motion, AnimatePresence } from 'framer-motion';
import { Underline } from '../ui/Underline/Underline';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5'

import styles from './HomeBookLesson.module.css';

export const HomeBookLesson = () => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	useLockBodyScroll(isModalOpen);
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
		<section id="book-lesson-home" className={styles.homeBookSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t.bookLesson.title}</h2>
					<Underline/>
				</div>

				<div className={styles.stepsList}>
					{steps.map((step) => (
						<div key={step.id} className={styles.stepCard}>
							<div className={styles.stepNumber}>
								{step.id}
							</div>
							<div>
								<p className={styles.stepText}>{step.text}</p>
							</div>
						</div>
					))}
				</div>

				<div className={styles.ctaContainer}>
					<button
						onClick={() => setIsModalOpen(true)}
						className={styles.ctaButton}
					>
						{t.bookLesson.cta}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<div className={styles.modalOverlay}>
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
							className={styles.modalContent}
						>
							<button
								onClick={() => setIsModalOpen(false)}
								className={styles.modalClose}
							>
								<IoCloseOutline size="24px" />
							</button>

							<h3 className={styles.modalTitle}>{t.bookLesson.modalTitle}</h3>

							<div className={styles.courseList}>
								{coursesData.map((course) => {
									const courseTitle = t.courses[course.titleKey as keyof typeof t.courses] as string;
									const ageRange = `${course.ageRange} ${t.courses.years}`;
									const title = `${courseTitle}`;
									return (
										<button
											key={course.id}
											onClick={() => handleCourseSelect(course)}
											className={styles.courseOption}
										>
											<p className={styles.courseOptionTitle}>
												<span className={styles.whitespaceNowrap}>{title}</span>
												{' '}
												<span className={styles.whitespaceNowrap}>{ageRange}</span>
											</p>
											<p className={styles.courseOptionInfo}>
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
