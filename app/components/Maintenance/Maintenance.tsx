'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

import styles from './Maintenance.module.css';

interface MaintenanceProps {
	title?: string;
	description?: string;
}

export const Maintenance = ({ title, description }: MaintenanceProps) => {
	const { t } = useTranslation();

	return <div className={styles.maintenance}>
		<div className={styles.container}>
			<h1 className={styles.title}>{title || t.maintenance.title}</h1>
			<p className={styles.description}>
				{description || t.maintenance.description}
			</p>
			<div className={styles.contactBox}>
				<p className={styles.contactLabel}>{t.maintenance.contact}</p>
				<a
					href="tel:+393318718139"
					className={styles.phoneLink}
				>
					+39 331 871 8139
				</a>
			</div>
		</div>
	</div>
};
