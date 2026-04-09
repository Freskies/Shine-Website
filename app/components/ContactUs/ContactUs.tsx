'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';
import { IoMailOutline } from 'react-icons/io5';

export const ContactUs = () => {
	const { t } = useTranslation();

	return (
		<section id="contact" className="pt-6em pb-10em px-[1em] bg-bg-color">
			<div className="max-w-4xl mx-auto text-center">
				<div className="relative mb-[3em]">
					<h2 className="text-[3em] font-bold">{t.contact.title}</h2>
					<Underline/>
				</div>

				<div
					className="bg-white rounded-[2.5em] p-[2.5em] sm:p-[4em] shadow-xl border border-zinc-100 max-w-2xl mx-auto">
					<p className="text-[1.2em] text-zinc-700 mb-[2.5em] leading-relaxed font-medium">
						{t.contact.description}
					</p>

					<a
						href={`mailto:${t.footer.email}`}
						className="inline-flex items-center gap-[0.8em] bg-accent hover:bg-accent/90 text-white px-[3em] py-[1.2em] rounded-full font-bold text-[1.1em] transition-all transform hover:scale-105 shadow-lg"
					>
						<IoMailOutline size="24px"/>
						{t.contact.cta}
					</a>
				</div>
			</div>
		</section>
	);
};
