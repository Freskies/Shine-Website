'use client';

import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function AboutPage() {
	const { t } = useTranslation();

	return <div className="flex flex-col min-h-screen">
		<Header />
		<main className="pt-[6em] pb-[4em] px-[1em]">
			<div className="max-w-[50rem] mx-auto">
				<h1 className="text-[3em] font-bold mb-[1em]">{t.about.title}</h1>
				
				<section className="mb-[4em]">
					<h2 className="text-[2em] font-bold mb-[0.5em]">La nostra storia</h2>
					<p className="text-zinc-600 leading-relaxed">{t.about.story}</p>
				</section>

				<section className="mb-[4em]">
					<h2 className="text-[2em] font-bold mb-[0.5em]">Storia del Parkour</h2>
					<p className="text-zinc-600 leading-relaxed">{t.about.parkourStory}</p>
				</section>

				<section className="mb-[4em]">
					<h2 className="text-[2em] font-bold mb-[0.5em]">Perché fare Parkour?</h2>
					<p className="text-zinc-600 leading-relaxed">{t.about.whyParkour}</p>
				</section>

				<section className="mb-[4em]">
					<h2 className="text-[2em] font-bold mb-[0.5em]">La nostra palestra</h2>
					<p className="text-zinc-600 leading-relaxed">{t.about.gym}</p>
				</section>
			</div>
		</main>
		<Footer />
	</div>;
}
