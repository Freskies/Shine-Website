'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';

import styles from './Pricing.module.css';

export const Pricing = () => {
	const { t } = useTranslation();

	return <section data-scroll-target="pricing" className={styles.pricingSection}>
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>{t.pricing.title}</h2>
				<Underline/>
			</div>

			<div className={styles.card}>
				<div className={styles.cardInner}>
					<div className={styles.tableSection}>
						<h3 className={styles.tableTitle}>{t.pricing.table.title}</h3>
						<div className={styles.tableWrapper}>
							<div className={styles.tableContainer}>
								<table className={styles.table}>
									<thead className={styles.thead}>
									<tr>
										<th className={`${styles.th} ${styles.thLabel}`}>{t.pricing.table.lessonsLabel}</th>
										<th className={styles.th}>{t.pricing.table.col1}</th>
										<th className={styles.th}>{t.pricing.table.col2}</th>
									</tr>
									</thead>
									<tbody className={styles.tbody}>
									<tr className={styles.trBody}>
										<td className={`${styles.td} ${styles.tdLabel}`}>{t.pricing.table.priceLabel}</td>
										<td className={styles.td}>{t.pricing.table.price1}</td>
										<td className={styles.td}>{t.pricing.table.price2}</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className={styles.infoSection}>
						<p className={styles.infoPrimary}>
							{t.pricing.paymentInfo}
						</p>
						<p className={styles.infoSecondary}>
							{t.pricing.paymentMethod}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>;
};
