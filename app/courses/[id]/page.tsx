'use client';

import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { BookLesson } from '@/app/components/BookLesson/BookLesson';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function CourseDetailPage () {
	const { id } = useParams();
	const { t } = useTranslation();

	if (IS_MAINTENANCE_MODE) {
		return <Maintenance/>;
	}

	return <div className="flex flex-col min-h-screen">
		<Header/>
		<main className="pt-[6em]">
			<div className="max-w-[60rem] mx-auto px-[1em] mb-[4em]">
				<div className="relative h-[25em] rounded-[2em] overflow-hidden mb-[2em]">
					<div className="absolute inset-0 bg-zinc-200 animate-pulse -z-10"/>
					<Image
						src="/next.svg"
						alt="Course Image Placeholder"
						fill
						className="object-cover"
					/>
				</div>
				<h1 className="text-[3.5em] font-bold mb-[0.5em]">Course: {id}</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[4em]">
					<div>
						<h2 className="text-[1.5em] font-bold mb-[1em]">Description</h2>
						<p className="text-zinc-600 leading-relaxed mb-[2em]">
							Detailed description for {id} course. Parkour is about moving efficiently through your environment.
							In this course, we focus on age-appropriate movements and safety.
						</p>
						<h2 className="text-[1.5em] font-bold mb-[1em]">{t.courses.schedule}</h2>
						<p className="text-zinc-600">Placeholder Schedule Info</p>
					</div>
					<div className="bg-zinc-50 p-[2em] rounded-[2em] border border-zinc-100">
						<h2 className="text-[1.5em] font-bold mb-[1em]">The Coach</h2>
						<div className="flex items-center gap-[1em] mb-[1.5em]">
							<div className="w-[4em] h-[4em] bg-zinc-200 rounded-full overflow-hidden relative">
								<Image src="/logo_shine_circle.avif" alt="Coach" fill className="object-cover"/>
							</div>
							<div>
								<p className="font-bold text-[1.2em]">Coach Name</p>
								<p className="text-zinc-500 text-[0.9em]">Lead Instructor</p>
							</div>
						</div>
						<p className="text-zinc-600 text-[0.9em]">Coach bio placeholder. History with pk formation, shine and
							parkour in general.</p>
					</div>
				</div>
			</div>
			<BookLesson courseName={`Course: ${id}`}/>
		</main>
		<Footer/>
	</div>;
}
