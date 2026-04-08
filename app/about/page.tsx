'use client';

import React from 'react';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import OurStory from '@/app/components/OurStory';
import * as Years from '@/app/components/AboutTimeline/years';

const START_YEAR = 2009;
const END_YEAR = 2026;

export default function AboutPage () {
	const yearsArray = Array.from(
		{ length: END_YEAR - START_YEAR + 1 },
		(_, i) => START_YEAR + i
	);

	return (
		<div className="flex flex-col min-h-screen">
			<Header/>

			<main className="flex-1 pt-[6em]">
				{/* Sezione Introduzione */}
				<section className="max-w-4xl mx-auto px-4 py-20 text-center">
					<h1 className="text-5xl md:text-7xl font-black mb-8 text-zinc-900">
						La Nostra Storia
					</h1>
					<p className="text-xl text-zinc-600 leading-relaxed">
						Dalle prime acrobazie in strada alla creazione di una delle community di parkour più grandi
						d&#39;Italia.
						Scopri il percorso che ha reso Shine quello che è oggi.
					</p>
				</section>

				{/* Sezione Timeline */}
				<OurStory years={yearsArray} initialYear={START_YEAR}>
					<OurStory.Timeline/>
					<OurStory.Content>
						{yearsArray.map((year) => {
							const yearKey = `Year${year}` as keyof typeof Years;
							const YearComponent = Years[yearKey];
							if (!YearComponent) return null;

							return (
								<OurStory.YearArticle key={year} year={year}>
									<YearComponent/>
								</OurStory.YearArticle>
							);
						})}
					</OurStory.Content>
				</OurStory>
			</main>

			<Footer/>
		</div>
	);
}
