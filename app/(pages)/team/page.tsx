'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

import styles from './team.module.css';

export default function TeamPage() {
	const { t } = useTranslation();

	const team = [
		{ id: 'coach-1', name: 'Coach 1', role: 'Head Coach' },
		{ id: 'coach-2', name: 'Coach 2', role: 'Instructor' },
		{ id: 'coach-3', name: 'Coach 3', role: 'Instructor' },
	];

	return <div className={styles.pageWrapper}>
		<Header />
		<main className={styles.main}>
			{IS_MAINTENANCE_MODE ? (
				<Maintenance />
			) : (
				<div className={styles.container}>
					<h1 className={styles.title}>{t.team.title}</h1>
					<div className={styles.teamGrid}>
						{team.map((member) => (
							<Link href={`/team/${member.id}`} key={member.id} className={styles.memberLink}>
								<div className={styles.imageContainer}>
									<div className={styles.placeholder} />
									<Image
										src="/temp/logo_shine_circle.avif"
										alt={member.name}
										fill
										className={styles.image}
									/>
								</div>
								<h3 className={styles.memberName}>{member.name}</h3>
								<p className={styles.memberRole}>{member.role}</p>
							</Link>
						))}
					</div>
				</div>
			)}
		</main>
		<Footer />
	</div>;
}
