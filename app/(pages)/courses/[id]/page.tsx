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
import { IoLogoWhatsapp } from 'react-icons/io5'

import styles from './course.module.css';

export default function CourseDetailPage () {
	const { id } = useParams();
	const { t } = useTranslation();

	const course = coursesData.find(c => c.id === id);

	if (!course) {
		return <div className={styles.pageWrapper}>
			<Header/>
			<main className={styles.notFoundContainer}>
				<div className={styles.notFoundContent}>
					<h1 className={styles.notFoundTitle}>{t.courses.notFound as string}</h1>
					<p className={styles.notFoundText}>{t.courses.notFoundDescription as string}</p>
				</div>
			</main>
			<Footer/>
		</div>;
	}

	const title = t.courses[course.titleKey as keyof typeof t.courses] as string;
	const ageRange = `${course.ageRange} ${t.courses.years}`;
	const fullTitle = `${title} ${ageRange}`;
	const schedule = `${course.daysKeys.map(day => t.courses.days[day as keyof typeof t.courses.days] as string).join('/')} ${course.time}`;
	const instructorInfo = instructors[course.instructor];
	const instructorTranslation = t.courses.instructors[course.instructor as keyof typeof t.courses.instructors];
	const whatsappUrl = instructorInfo
		? `https://wa.me/${instructorInfo.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(`${t.bookLesson.whatsappMsg} ${fullTitle}`)}`
		: '#';

	return <div className={styles.pageWrapper}>
		<Header/>
		<main className={styles.main}>
			<div className={styles.contentContainer}>
				<div className={styles.grid}>
					<div className={styles.courseInfo}>
						<h1 className={styles.courseTitle}>
							<span className={styles.whitespaceNowrap}>{title}</span>
							{' '}
							<span className={styles.whitespaceNowrap}>{ageRange}</span>
						</h1>
						<div className="grow">
							<h2 className={styles.sectionTitle}>{t.courses.description}</h2>
							<p className={styles.descriptionText}>
								{t.courses.descriptions[course.descriptionKey as keyof typeof t.courses.descriptions]}
							</p>
						</div>
						<div>
							<h2 className={styles.sectionTitle}>{t.courses.schedule}</h2>
							<p className={styles.scheduleText}>{schedule}</p>
						</div>
					</div>
					<div className={styles.sidebar}>
						<div className={styles.coachCard}>
							<h2 className={styles.sectionTitle}>{t.courses.coach}</h2>
							<div className={styles.coachHeader}>
								<div className={styles.coachImageContainer}>
         <Image src={instructorInfo?.image || "/temp/logo_shine_circle.avif"} alt={course.instructor} fill sizes="64px" className="object-cover"/>
								</div>
								<div>
									<p className={styles.coachName}>{course.instructor}</p>
									<p className={styles.coachRole}>{instructorTranslation?.description || t.courses.leadInstructor}</p>
								</div>
							</div>
							<p className={styles.coachBio}>
								{instructorTranslation?.extendedDescription || (t.about.story.split('...')[0] === 'La nostra storia' ? `Coach ${course.instructor} è un esperto praticante di parkour.` : `Coach ${course.instructor} is an experienced parkour practitioner.`)}
							</p>

							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.whatsappButton}
							>
								<IoLogoWhatsapp color={'white'} size="20px" />
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
