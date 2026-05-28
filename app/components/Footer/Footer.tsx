'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5'

import styles from './Footer.module.css';

export const Footer = () => {
	const { t } = useTranslation();

	return <footer className={styles.footer}>
		<div className={styles.container}>
			<div className={styles.column}>
				<div className={styles.columnInner}>
					<h3 className={styles.title}>SHINE A.S.D.</h3>
					<p className={styles.text}>
						{t.footer.emailLabel}: <a href={`mailto:${t.footer.email}`}
						                          className={styles.link}>{t.footer.email}</a>
					</p>
					<p className={styles.text}>{t.footer.fiscalCode}</p>
					<p className={styles.text}>{t.footer.vat}</p>
				</div>
			</div>

			<div className={styles.column}>
				<div className={styles.columnInner}>
					<h3 className={styles.title}>{t.footer.bankInfo}</h3>
					<p className={styles.text}>{t.footer.accountHolder}</p>
					<p className={`${styles.text} ${styles.iban}`}>{t.footer.iban}</p>
				</div>
			</div>

			<div className={styles.column}>
				<div className={styles.columnInner}>
					<h3 className={styles.title}>Social</h3>
					<div className={styles.socialIcons}>
						<a href="https://www.facebook.com/ShineSchoolOfMovement/" target="_blank" rel="noopener noreferrer"
						   className={styles.socialLink}>
							<IoLogoFacebook size="24px"/>
						</a>
						<a href="https://www.instagram.com/shine_school_of_movement/" target="_blank"
						   rel="noopener noreferrer"
						   className={styles.socialLink}>
							<IoLogoInstagram size="24px"/>
						</a>
						<a href="https://www.youtube.com/user/usethisnameWTF" target="_blank" rel="noopener noreferrer"
						   className={styles.socialLink}>
							<IoLogoYoutube size="24px"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>;
};
