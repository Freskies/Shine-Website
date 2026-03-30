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
					<h1 className="text-[3em] font-bold mb-[0.5em]">{t.courses.notFound}</h1>
					<p className="text-zinc-500">{t.courses.notFoundDescription}</p>
				</div>
			</main>
			<Footer/>
		</div>;
	}

	const title = `${t.courses[course.titleKey as keyof typeof t.courses]} ${course.ageRange}`;
	const schedule = `${course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days]).join('/')} ${course.time}`;
	const instructorInfo = instructors[course.instructor];
	const whatsappUrl = instructorInfo
		? `https://wa.me/${instructorInfo.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(`${t.bookLesson.whatsappMsg} ${title}`)}`
		: '#';

	return <div className="flex flex-col min-h-screen">
		<Header/>
		<main className="pt-header-height">
			<div className="max-w-240 mx-auto px-[1em] mb-[4em]">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[4em] items-start">
					<div
						className="flex flex-col h-full p-[2em] rounded-[2em] max-w-160">
						<h1 className="text-[3.5em] font-bold mb-[0.5em] leading-tight">{title}</h1>
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
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
								     fill="currentColor">
									<path
										d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
								</svg>
								{t.bookLesson.whatsappContact}
							</a>
						</div>
					</div>
				</div>
			</div>
			<BookLesson courseName={title}/>
		</main>
		<Footer/>
	</div>;
}
