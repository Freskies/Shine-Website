'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoChevronDownOutline, IoOpenOutline } from 'react-icons/io5';

import styles from './FAQ.module.css';

export const FAQ = () => {
	const { t } = useTranslation();
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const handlePriceScroll = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
		e.preventDefault();
		const element = document.querySelector('[data-scroll-target="pricing"]') as HTMLElement | null;
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const faqs = [
		{ q: t.faq.q1, a: t.faq.a1 },
		{ q: t.faq.q2, a: t.faq.a2 },
		{ q: t.faq.q3, a: t.faq.a3 },
		{ q: t.faq.q4, a: t.faq.a4 },
		{
			q: t.faq.q5,
			a: (
				<div className={styles.answerLinkContainer}>
					<span>{t.faq.a5}</span>
					<button
						type="button"
						onClick={handlePriceScroll}
						className={styles.ctaButton}
					>
						{t.faq.cta}
						<IoOpenOutline size="18px" />
					</button>
				</div>
			)
		},
	];

	const toggle = (idx: number) => setOpenIndex(prev => (prev === idx ? null : idx));

	return (
		<section id="faq" className={styles.faqSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t.faq.title}</h2>
					<Underline />
				</div>

				<div className={styles.faqList}>
					{faqs.map((faq, index) => {
						const panelId = `faq-panel-${index}`;
						const buttonId = `faq-button-${index}`;
						const isOpen = openIndex === index;
						return (
							<div
								key={index}
								className={styles.faqItem}
							>
								<button
									id={buttonId}
									aria-controls={panelId}
									aria-expanded={isOpen}
									onClick={() => toggle(index)}
									className={styles.faqButton}
								>
									<span className={styles.question}>{faq.q}</span>
									<span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
										<IoChevronDownOutline size="22px" />
									</span>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											id={panelId}
											role="region"
											aria-labelledby={buttonId}
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.2, ease: "easeInOut" }}
											className={styles.answerWrapper}
										>
											<div className={styles.answerContent}>
												<div className={styles.answerInner}>
													{faq.a}
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
