'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export const Pricing = () => {
	const { t } = useTranslation();

	return <section className="py-[6em] px-[1em]">
		<div className="max-w-[60rem] mx-auto">
			<h2 className="text-[2.5em] font-bold text-center mb-[2em]">{t.pricing.title}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-[2em]">
				<div className="p-[2em] bg-white border border-zinc-100 rounded-[2em] shadow-sm flex flex-col items-center text-center">
					<h3 className="text-[1.5em] font-bold mb-[0.5em]">Single</h3>
					<p className="text-[2.5em] font-extrabold mb-[0.5em]">15€</p>
					<p>{t.pricing.singleLesson}</p>
				</div>
				<div className="p-[2em] bg-zinc-900 text-white rounded-[2em] shadow-xl flex flex-col items-center text-center relative overflow-hidden">
					<div className="absolute top-0 right-0 bg-red-600 text-white px-[1em] py-[0.2em] text-[0.8em] font-bold uppercase rotate-45 translate-x-[2em] translate-y-[1em] w-[10em]">Best Value</div>
					<h3 className="text-[1.5em] font-bold mb-[0.5em]">Multi</h3>
					<p className="text-[2.5em] font-extrabold mb-[0.5em]">70€</p>
					<p>{t.pricing.multiLesson}</p>
				</div>
			</div>
			<p className="text-center mt-[3em] italic">
				{t.pricing.paymentInfo}
			</p>
		</div>
	</section>;
};
