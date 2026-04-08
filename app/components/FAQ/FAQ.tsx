'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoChevronDownOutline, IoOpenOutline } from 'react-icons/io5';

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
				<div className="flex flex-col sm:flex-row sm:items-center gap-[1em]">
					<span>{t.faq.a5}</span>
					<button
						type="button"
						onClick={handlePriceScroll}
						className="inline-flex items-center gap-[0.6em] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 px-[1.2em] py-[0.6em] rounded-full text-[0.9em] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 w-fit"
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
		<section id="faq" className="py-[6em] px-[1em] bg-bg-color">
			<div className="max-w-4xl mx-auto">
				<div className="relative mb-[3em] text-center">
					<h2 className="text-[3em] font-bold leading-tight">{t.faq.title}</h2>
					<Underline />
				</div>

				<div className="space-y-[1em]">
					{faqs.map((faq, index) => {
						const panelId = `faq-panel-${index}`;
						const buttonId = `faq-button-${index}`;
						const isOpen = openIndex === index;
						return (
							<div
								key={index}
								className="bg-white rounded-[1.5em] shadow-sm border border-zinc-100 overflow-hidden"
							>
								<button
									id={buttonId}
									aria-controls={panelId}
									aria-expanded={isOpen}
									onClick={() => toggle(index)}
									className="w-full text-left p-[1.2em] sm:p-[1.5em] flex items-center justify-between gap-[1em] hover:bg-zinc-50 focus:outline-none"
								>
									<span className="text-[1.1em] sm:text-[1.2em] font-bold text-accent">{faq.q}</span>
									<span className={`transition-transform text-zinc-500 ${isOpen ? 'rotate-180' : ''}`}>
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
											className="overflow-hidden"
										>
											<div className="px-[1.2em] sm:px-[1.5em] pb-[1.2em] sm:pb-[1.5em] text-zinc-700 leading-relaxed text-[1.05em]">
												<div className="border-t border-zinc-100 pt-[1em]">
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
