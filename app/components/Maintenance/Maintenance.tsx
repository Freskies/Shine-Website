'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export const Maintenance = () => {
	const { t } = useTranslation();

	return <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center bg-white">
		<div className="max-w-md w-full">
			<h1 className="text-4xl font-bold mb-6 text-zinc-900">{t.maintenance.title}</h1>
			<p className="text-lg text-zinc-600 mb-8 leading-relaxed">
				{t.maintenance.description}
			</p>
			<div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100 shadow-sm">
				<p className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">{t.maintenance.contact}</p>
				<a
					href="tel:+393318718139"
					className="text-2xl font-bold text-zinc-900 hover:text-orange-600 transition-colors underline"
				>
					+39 331 871 8139
				</a>
			</div>
		</div>
	</div>
};
