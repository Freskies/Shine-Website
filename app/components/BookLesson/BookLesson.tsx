'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { useLockBodyScroll } from '@/app/hooks/useLockBodyScroll';
import { useState } from 'react';
import { coursesData, CourseInfo } from '@/app/data/courses';
import { instructors } from '@/app/data/instructors';
import { motion, AnimatePresence } from 'framer-motion';
import { Underline } from '@/app/(pages)/(home)/_components/ui/Underline/Underline';
import Image from 'next/image';
import { IoDocumentTextOutline, IoCalendarOutline, IoCloseOutline, IoLogoWhatsapp } from 'react-icons/io5'

import styles from './BookLesson.module.css';

export const BookLesson = ({ courseName }: { courseName?: string }) => {
	const { t } = useTranslation();
	const [bookingType, setBookingType] = useState<'manual' | 'online'>('manual');
	const [isModalOpen, setIsModalOpen] = useState(false);
	useLockBodyScroll(isModalOpen);
	const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(
		courseName ? (coursesData.find(c => {
			const title = `${t.courses[c.titleKey as keyof typeof t.courses] as string} ${c.ageRange}`;
			return title === courseName;
		}) || null) : null
	);

	const handleCourseSelect = (course: CourseInfo) => {
		setSelectedCourse(course);
	};

	const instructor = selectedCourse ? instructors[selectedCourse.instructor] : null;
	const selectedCourseTitle = selectedCourse ? `${t.courses[selectedCourse.titleKey as keyof typeof t.courses] as string} ${selectedCourse.ageRange} ${t.courses.years}` : '';

	const defaultWhatsappNumber = "393452288118"; // Numero di default per Shine Parkour se non c'è corso selezionato

	const whatsappUrl = selectedCourse && instructor
		? `https://wa.me/${instructor.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(`${t.bookLesson.whatsappMsg} ${selectedCourseTitle}`)}`
		: `https://wa.me/${defaultWhatsappNumber}?text=${encodeURIComponent(t.bookLesson.whatsappMsg)}`;

	const steps = [
		{
			id: 1,
			text: t.bookLesson.step1,
			action: (
				<a
					href="/documents/Tesseramento%20Shine%202025-2026.pdf"
					download
					className={styles.actionButton}
				>
					<IoDocumentTextOutline size="20px"/>
					{t.bookLesson.downloadPdf}
				</a>
			)
		},
		{
			id: 2,
			text: t.bookLesson.step2,
			action: (
				<a
					href="/documents/Richiesta%20certificato%20medico%202025-2026.pdf"
					download
					className={styles.actionButton}
				>
					<IoDocumentTextOutline size="20px"/>
					{t.bookLesson.downloadRequest}
				</a>
			)
		},
		{
			id: 3,
			text: t.bookLesson.step3,
			action: (
				<a
					href={`mailto:${t.footer.email}`}
					className={styles.emailLink}
				>
					{t.footer.email}
				</a>
			)
		},
		{
			id: 4,
			text: t.bookLesson.step4,
			action: (
				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.actionButton}
				>
					<IoLogoWhatsapp size="20px"/>
					{t.bookLesson.whatsappContact}
				</a>
			)
		}
	];

	return (
		<section id="book-lesson" className={styles.bookSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t.bookLesson.title}</h2>
				</div>

				<div className={styles.card}>
					<div className={styles.toggleContainer}>
						<div className={styles.toggle}>
							<button
								onClick={() => setBookingType('manual')}
								className={styles.toggleButton}
							>
								{bookingType === 'manual' && (
									<motion.span
										layoutId="booking-toggle"
										className={styles.toggleBackground}
										transition={{ type: 'spring', stiffness: 380, damping: 30 }}
									/>
								)}
								<span
									className={`relative z-10 ${bookingType === 'manual' ? styles.toggleActive : styles.toggleInactive}`}>{t.bookLesson.manual}</span>
							</button>
							<button
								onClick={() => setBookingType('online')}
								className={styles.toggleButton}
							>
								{bookingType === 'online' && (
									<motion.span
										layoutId="booking-toggle"
										className={styles.toggleBackground}
										transition={{ type: 'spring', stiffness: 380, damping: 30 }}
									/>
								)}
								<span
									className={`relative z-10 ${bookingType === 'online' ? styles.toggleActive : styles.toggleInactive}`}>{t.bookLesson.online}</span>
							</button>
						</div>
					</div>

					<AnimatePresence mode="wait">
						{bookingType === 'manual' ? (
							<motion.div
								key="manual"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								className={styles.manualSteps}
							>
								{steps.map((step) => (
									<div key={step.id} className={`${styles.card} ${styles.step}`} style={{ margin: 0, background: 'white' }}>
										<div className={styles.stepNumber}>
											{step.id}
										</div>
										<div>
											<p className={styles.stepText}>{step.text}</p>
											{step.action}
										</div>
									</div>
								))}
							</motion.div>
						) : (
							<motion.div
								key="online"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								className={`${styles.card} ${styles.onlineBooking}`} style={{ margin: 0, background: 'white', padding: '4em' }}
							>
								<p className={styles.onlineTitle} style={{ color: '#71717a', fontStyle: 'italic', fontWeight: 'normal' }}>Coming Soon - Online Booking</p>
								<div className="flex justify-center">
									<IoCalendarOutline color={'#e5e7eb'} size="48px"/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
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
								<IoCloseOutline size="24px"/>
							</button>

							<h3 className={styles.modalTitle} style={{ textAlign: 'center' }}>{t.bookLesson.modalTitle}</h3>

							<div className={styles.courseList} style={{ marginBottom: '2em' }}>
								{coursesData.map((course) => {
									const title = `${t.courses[course.titleKey as keyof typeof t.courses] as string} ${course.ageRange}`;
									const isSelected = selectedCourse?.id === course.id;
									return (
										<button
											key={course.id}
											onClick={() => handleCourseSelect(course)}
											className={`${styles.courseOption} ${isSelected ? styles.courseOptionActive : ''}`}
										>
											<p className={`${styles.courseOptionTitle} ${isSelected ? styles.toggleActive : ''}`} style={{ color: isSelected ? 'var(--accent)' : '' }}>{title}</p>
											<p className={styles.courseOptionInstructor}>
												{course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days] as string).join('/')} {course.time}
											</p>
										</button>
									);
								})}
							</div>

							{selectedCourse && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									className="border-t border-zinc-100 pt-[2em]"
								>
									<div className="flex flex-col md:flex-row gap-[1.5em] items-center text-center md:text-left">
										<div
											className="w-[5em] h-[5em] bg-zinc-100 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-white shadow-md">
											<Image src={instructor?.image || "/temp/logo_shine_circle.avif"} alt={selectedCourse.instructor} fill
											       sizes="80px"
											       className="object-cover"/>
										</div>
										<div>
											<p className="text-zinc-500 text-[0.9em] uppercase tracking-wider font-bold">{t.courses.schedule as string}</p>
											<p className="text-[1.1em] font-medium mb-[0.5em]">
												{selectedCourse.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days] as string).join('/')} {selectedCourse.time}
											</p>
											<p className="text-zinc-500 text-[0.9em] uppercase tracking-wider font-bold">Istruttore</p>
											<p className="text-[1.1em] font-medium">{selectedCourse.instructor}</p>
										</div>
									</div>

									<div className="mt-[2em]">
										<a
											href={whatsappUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-[0.5em] w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-800 py-[1.2em] rounded-full font-bold transition-all shadow-md"
										>
											<IoLogoWhatsapp size="20px"/>
											{t.bookLesson.whatsappContact}
										</a>
									</div>
								</motion.div>
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</section>
	);
};
