'use client';

import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

import styles from './map.module.css';

export default function MapPage () {
	const { t } = useTranslation();

	return <div className={styles.pageWrapper}>
		<Header/>
		<main className={styles.main}>
			<div className={styles.container}>
				<h1 className={styles.title}>{t.map.title}</h1>
				<div className={styles.mapPlaceholder}>
					<p className={styles.placeholderText}>Coming Soon</p>
				</div>
			</div>
		</main>
		<Footer/>
	</div>;
}
