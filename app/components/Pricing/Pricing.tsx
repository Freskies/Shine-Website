'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';

export const Pricing = () => {
	const { t } = useTranslation();

	return <section id="pricing" className="py-[6em] px-[1em]">
		<div className="max-w-240 mx-auto">
			<div className="relative mb-[3em] text-center">
				<h2 className="text-[3em] font-bold">{t.pricing.title}</h2>
				<Underline/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-[2em]">
				<div
					className="p-[2em] bg-second text-white rounded-[2em] flex flex-col items-center text-center transition-all duration-300">
					<h3 className="text-[1.5em] font-bold mb-[0.5em]">{t.pricing.single}</h3>
					<p className="text-[2.5em] font-extrabold mb-[0.5em]">15€</p>
					<p className="text-white/90">{t.pricing.singleLesson}</p>
				</div>
				<div
					className="p-[2em] bg-accent text-white rounded-[2em] flex flex-col items-center text-center relative overflow-hidden transition-all duration-300">
					<h3 className="text-[1.5em] font-bold mb-[0.5em]">{t.pricing.monthly}</h3>
					<p className="text-[2.5em] font-extrabold mb-[0.5em]">70€</p>
					<p className="text-white/90">{t.pricing.monthlyDescription}</p>
				</div>
			</div>
			<p className="text-center mt-[3em] italic">
				{t.pricing.paymentInfo}
			</p>
		</div>
	</section>;
};
