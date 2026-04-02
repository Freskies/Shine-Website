'use client';

import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { BookLesson } from '@/app/components/BookLesson/BookLesson';
import { useTranslation } from '@/app/hooks/useTranslation';
import { coursesData } from '@/app/data/courses';
import { instructors } from '@/app/data/instructors';
import { LogoWhatsapp } from 'react-ionicons'

export default function CourseDetailPage () {
	const { id } = useParams();
	const { t } = useTranslation();

	const course = coursesData.find(c => c.id === id);

	if (IS_MAINTENANCE_MODE)
		return <Maintenance/>;

	if (!course) {
		return <div className="flex flex-col min-h-screen">
			<Header/>
			<main className="grow flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-[3em] font-bold mb-[0.5em]">{t.courses.notFound as string}</h1>
					<p className="text-zinc-500">{t.courses.notFoundDescription as string}</p>
				</div>
			</main>
			<Footer/>
		</div>;
	}

	const title = t.courses[course.titleKey as keyof typeof t.courses] as string;
	const ageRange = course.ageRange;
	const fullTitle = `${title} ${ageRange}`;
	const schedule = `${course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days] as string).join('/')} ${course.time}`;
	const instructorInfo = instructors[course.instructor];
	const whatsappUrl = instructorInfo
		? `https://wa.me/${instructorInfo.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(`${t.bookLesson.whatsappMsg} ${fullTitle}`)}`
		: '#';

	return <div className="flex flex-col min-h-screen">
		<Header/>
		<main className="pt-header-height">
			<div className="max-w-240 mx-auto px-[1em] mb-[4em]">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[4em] items-start">
					<div
						className="flex flex-col h-full p-[2em] rounded-[2em] max-w-160">
						<h1 className="text-[3.5em] font-bold mb-[0.5em] leading-tight">
							<span className="whitespace-nowrap">{title}</span>
							{' '}
							<span className="whitespace-nowrap">{ageRange}</span>
						</h1>
						<div className="grow">
							<h2 className="text-[1.5em] font-bold mb-[1em]">{t.courses.description}</h2>
							<p className="text-zinc-600 leading-relaxed mb-[2em]">
								{t.courses.descriptions[course.descriptionKey as keyof typeof t.courses.descriptions]}
							</p>
						</div>
						<div className="mb-[2em]">
							<h2 className="text-[1.5em] font-bold mb-[1em]">{t.courses.schedule}</h2>
							<p className="text-zinc-600">{schedule}</p>
						</div>
					</div>
					<div className="flex flex-col gap-[2em]">
						<div
							className="bg-zinc-50 p-[2em] rounded-[2em] border border-zinc-100 flex flex-col mt-6">
							<h2 className="text-[1.5em] font-bold mb-[1em]">{t.courses.coach}</h2>
							<div className="flex items-center gap-[1em] mb-[1.5em]">
								<div
									className="w-[4em] h-[4em] bg-zinc-200 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
         <Image src="/temp/logo_shine_circle.avif" alt={course.instructor} fill className="object-cover"/>
								</div>
								<div>
									<p className="font-bold text-[1.2em]">{course.instructor}</p>
									<p className="text-zinc-500 text-[0.9em]">{t.courses.leadInstructor}</p>
								</div>
							</div>
							<p className="text-zinc-600 text-[0.9em] mb-[1.5em] flex-grow">
								Coach {course.instructor} {t.about.story.split('...')[0] === 'La nostra storia' ? 'è un esperto praticante di parkour.' : 'is an experienced parkour practitioner.'}
							</p>

							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-[0.5em] w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-[1em] rounded-xl font-bold transition-all shadow-sm"
							>
								<LogoWhatsapp color={'white'} height="20px" width="20px" />
								{t.bookLesson.whatsappContact}
							</a>
						</div>
					</div>
				</div>
			</div>
			<BookLesson courseName={fullTitle}/>
		</main>
		<Footer/>
	</div>;
}
