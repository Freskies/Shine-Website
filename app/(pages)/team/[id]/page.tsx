'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

import styles from './member.module.css';

export default function TeamDetailPage() {
	const { id } = useParams();
	const { t } = useTranslation();

	return <div className={styles.pageWrapper}>
		<Header />
		<main className={styles.main}>
			{IS_MAINTENANCE_MODE ? (
				<Maintenance />
			) : (
				<div className={styles.container}>
					<div className={styles.grid}>
						<div className={styles.imageWrapper}>
							<div className={styles.placeholder} />
							<Image
								src="/temp/logo_shine_circle.avif"
								alt="Team Member Placeholder"
								fill
								className={styles.image}
							/>
						</div>
						<div className={styles.content}>
							<h1 className={styles.name}>{id}</h1>
							<p className={styles.role}>Team Member</p>

							<section className={styles.section}>
								<h2 className={styles.sectionTitle}>History with Parkour</h2>
								<p className={styles.text}>History with pk formation, shine and parkour in general placeholder.</p>
							</section>

							<section className={styles.section}>
								<h2 className={styles.sectionTitle}>Role in Shine</h2>
								<p className={styles.text}>Description of their role and contribution to the association.</p>
							</section>
						</div>
					</div>
				</div>
			)}
		</main>
		<Footer />
	</div>;
}
