'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { Underline } from '../ui/Underline/Underline';

export const Pricing = () => {
	const { t } = useTranslation();

	return <section data-scroll-target="pricing" className="py-[6em] px-[1em] bg-bg-color">
		<div className="max-w-180 mx-auto">
			<div className="relative mb-[3em] text-center">
				<h2 className="text-[3em] font-bold">{t.pricing.title}</h2>
				<Underline/>
			</div>

			<div
				className="bg-accent/10 text-black rounded-[2.5em] p-[2.5em] sm:p-[4em] text-center shadow-xl border border-accent/20">
				<div className="mx-auto">
					<div className="mb-[2em]">
						<h3 className="text-[2em] font-bold mb-[1em]">{t.pricing.table.title}</h3>
						<div className="mx-auto max-w-100">
							<div className="overflow-hidden rounded-xl ring-1 ring-accent/30 shadow-lg">
								<table className="w-full text-center">
									<thead className="bg-accent text-white text-[1.2em]">
									<tr>
										<th
											className="px-2 py-3 sm:py-4 font-semibold opacity-80 text-[0.7em] uppercase tracking-wider">{t.pricing.table.lessonsLabel}</th>
										<th className="px-2 py-3 sm:py-4 font-semibold">{t.pricing.table.col1}</th>
										<th className="px-2 py-3 sm:py-4 font-semibold">{t.pricing.table.col2}</th>
									</tr>
									</thead>
									<tbody className="text-[1.5em] font-bold">
									<tr className="border-t border-accent/20">
										<td
											className="px-2 py-3 sm:py-4 bg-accent/10 opacity-70 text-[0.6em] uppercase tracking-wider font-semibold">{t.pricing.table.priceLabel}</td>
										<td className="px-2 py-3 sm:py-4">{t.pricing.table.price1}</td>
										<td className="px-2 py-3 sm:py-4">{t.pricing.table.price2}</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="space-y-[1em] text-[1.1em] sm:text-[1.2em]">
						<p className="font-semibold">
							{t.pricing.paymentInfo}
						</p>
						<p className="opacity-80">
							{t.pricing.paymentMethod}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>;
};
