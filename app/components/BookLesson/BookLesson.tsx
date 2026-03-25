'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { useState } from 'react';
import { coursesData, CourseInfo } from '@/app/data/courses';
import { instructors } from '@/app/data/instructors';
import { motion, AnimatePresence } from 'framer-motion';
import { Underline } from '../ui/Underline/Underline';
import Image from 'next/image';

export const BookLesson = ({ courseName }: { courseName?: string }) => {
	const { t } = useTranslation();
	const [bookingType, setBookingType] = useState<'manual' | 'online'>('manual');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(
		courseName ? (coursesData.find(c => {
			const title = `${t.courses[c.titleKey as keyof typeof t.courses]} ${c.ageRange}`;
			return title === courseName;
		}) || null) : null
	);

	const steps = [
		{
			id: 1,
			text: t.bookLesson.step1,
			action: (
				<a
					href="/tesseramento.pdf"
					download
					className="inline-flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 px-4 py-2 rounded-lg transition-colors mt-2 font-semibold"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
					     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
						<polyline points="7 10 12 15 17 10"/>
						<line x1="12" x2="12" y1="15" y2="3"/>
					</svg>
					{t.bookLesson.downloadPdf}
				</a>
			)
		},
		{
			id: 2,
			text: t.bookLesson.step2,
			action: (
				<a
					href="mailto:info@shineparkour.it"
					className="text-accent hover:underline mt-1 inline-block font-medium"
				>
					info@shineparkour.it
				</a>
			)
		},
		{
			id: 3,
			text: t.bookLesson.step3,
		}
	];

	const handleCourseSelect = (course: CourseInfo) => {
		setSelectedCourse(course);
	};

	const instructor = selectedCourse ? instructors[selectedCourse.instructor] : null;
	const selectedCourseTitle = selectedCourse ? `${t.courses[selectedCourse.titleKey as keyof typeof t.courses]} ${selectedCourse.ageRange}` : '';

	const whatsappUrl = selectedCourse && instructor
		? `https://wa.me/${instructor.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(`${t.bookLesson.whatsappMsg} ${selectedCourseTitle}`)}`
		: '#';

	return (
		<section id="book-lesson" className="py-[6em] px-[1em] bg-zinc-50">
			<div className="max-w-[50rem] mx-auto">
				<div className="text-center mb-[2em]">
					<h2 className="text-[2.5em] font-bold mb-[0.5em] leading-tight">{t.bookLesson.title}</h2>
				</div>

				<div className="bg-zinc-100 rounded-[2em] p-[2em] border border-zinc-200 mb-[2em] overflow-hidden">
					<div className="mb-[1.5em]">
						<div className="relative bg-zinc-200 p-1 rounded-full w-fit mx-auto flex">
							<button
								onClick={() => setBookingType('manual')}
								className="relative px-[2em] py-[0.6em] rounded-full font-bold"
							>
								{bookingType === 'manual' && (
									<motion.span
										layoutId="booking-toggle"
										className="absolute inset-0 bg-accent rounded-full z-0"
										transition={{ type: 'spring', stiffness: 380, damping: 30 }}
									/>
								)}
								<span
									className={`relative z-10 ${bookingType === 'manual' ? 'text-white' : 'text-zinc-600'}`}>{t.bookLesson.manual}</span>
							</button>
							<button
								onClick={() => setBookingType('online')}
								className="relative px-[2em] py-[0.6em] rounded-full font-bold"
							>
								{bookingType === 'online' && (
									<motion.span
										layoutId="booking-toggle"
										className="absolute inset-0 bg-accent rounded-full z-0"
										transition={{ type: 'spring', stiffness: 380, damping: 30 }}
									/>
								)}
								<span
									className={`relative z-10 ${bookingType === 'online' ? 'text-white' : 'text-zinc-600'}`}>{t.bookLesson.online}</span>
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
								className="grid gap-[2em] mb-[2em]"
							>
								{steps.map((step) => (
									<div key={step.id}
									     className="flex gap-[1.5em] items-center p-[2em] bg-white rounded-[2em] shadow-sm border border-zinc-100">
										<div
											className="bg-accent text-white w-[2.5em] h-[2.5em] rounded-full flex items-center justify-center font-bold flex-shrink-0 text-[1.2em]">
											{step.id}
										</div>
										<div>
											<p className="text-[1.2em] font-medium text-zinc-800">{step.text}</p>
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
								className="bg-white rounded-[2em] p-[4em] text-center border border-zinc-100 shadow-sm mb-[2em]"
							>
								<p className="text-zinc-500 italic">Coming Soon - Online Booking</p>
							</motion.div>
						)}
					</AnimatePresence>

					<div className="text-center">
						<button
							onClick={() => setIsModalOpen(true)}
							className="inline-block bg-accent hover:bg-accent/90 text-white px-[3em] py-[1.2em] rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
						>
							{t.bookLesson.cta}
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-[1em]">
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
							className="bg-white w-full max-w-[40rem] rounded-[2.5em] p-[2em] relative z-10 max-h-[90vh] overflow-y-auto"
						>
							<button
								onClick={() => setIsModalOpen(false)}
								className="absolute top-[1.5em] right-[1.5em] text-zinc-400 hover:text-zinc-800 transition-colors"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
								     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<line x1="18" y1="6" x2="6" y2="18"/>
									<line x1="6" y1="6" x2="18" y2="18"/>
								</svg>
							</button>

							<h3 className="text-[2em] font-bold mb-[1.5em] text-center">{t.bookLesson.modalTitle}</h3>

							<div className="grid grid-cols-1 gap-[1em] mb-[2em]">
								{coursesData.map((course) => {
									const title = `${t.courses[course.titleKey as keyof typeof t.courses]} ${course.ageRange}`;
									const isSelected = selectedCourse?.id === course.id;
									return (
										<button
											key={course.id}
											onClick={() => handleCourseSelect(course)}
											className={`p-[1.2em] rounded-[1.5em] text-left transition-all border-2 ${
												isSelected
													? 'border-accent bg-accent/5'
													: 'border-zinc-100 hover:border-zinc-200 bg-zinc-50'
											}`}
										>
											<p className={`font-bold ${isSelected ? 'text-accent' : 'text-zinc-800'}`}>{title}</p>
											<p className="text-[0.9em] text-zinc-500">
												{course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days]).join('/')} {course.time}
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
											<Image src="/logo_shine_circle.avif" alt={selectedCourse.instructor} fill
											       className="object-cover"/>
										</div>
										<div>
											<p className="text-zinc-500 text-[0.9em] uppercase tracking-wider font-bold">{t.courses.schedule}</p>
											<p className="text-[1.1em] font-medium mb-[0.5em]">
												{selectedCourse.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days]).join('/')} {selectedCourse.time}
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
											className="flex items-center justify-center gap-[0.5em] w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-[1.2em] rounded-full font-bold transition-all shadow-md"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
											     fill="currentColor">
												<path
													d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
											</svg>
											Contatta su WhatsApp
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
