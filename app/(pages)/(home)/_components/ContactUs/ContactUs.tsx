'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';
import { IoMailOutline } from 'react-icons/io5';

import styles from './ContactUs.module.css';

export const ContactUs = () => {
	const { t } = useTranslation();

	return (
		<section id="contact" className={styles.contactSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t.contact.title}</h2>
					<Underline/>
				</div>

				<div className={styles.card}>
					<p className={styles.description}>
						{t.contact.description}
					</p>

					<a
						href={`mailto:${t.footer.email}`}
						className={styles.ctaButton}
					>
						<IoMailOutline size="24px"/>
						{t.contact.cta}
					</a>
				</div>
			</div>
		</section>
	);
};
