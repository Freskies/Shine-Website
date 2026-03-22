'use client';

import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function MapPage() {
	const { t } = useTranslation();

	return <div className="flex flex-col min-h-screen">
		<Header />
		<main className="pt-[6em] pb-[4em] px-[1em]">
			<div className="max-w-[80rem] mx-auto">
				<h1 className="text-[3em] font-bold mb-[1em] text-center">{t.map.title}</h1>
				<div className="bg-zinc-100 rounded-[2em] h-[40em] flex items-center justify-center border-2 border-dashed border-zinc-300">
					<p className="text-zinc-500 text-[1.2em]">Map Placeholder</p>
				</div>
			</div>
		</main>
		<Footer />
	</div>;
}
