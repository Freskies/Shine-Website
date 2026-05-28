'use client';

import React from 'react';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import OurStory from './_components/OurStory';
import * as Years from './_components/AboutTimeline/years';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

import styles from './about.module.css';

const START_YEAR = 2009;
const END_YEAR = 2026;

export default function AboutPage () {
	const yearsArray = Array.from(
		{ length: END_YEAR - START_YEAR + 1 },
		(_, i) => START_YEAR + i
	);

	return (
		<div className={styles.aboutPage}>
			<Header/>

			<main className={styles.main}>
				{IS_MAINTENANCE_MODE ? (
					<Maintenance/>
				) : (
					<>
						{/* Sezione Introduzione */}
						<section className={styles.introSection}>
							<h1 className={styles.title}>
								La Nostra Storia
							</h1>
							<p className={styles.description}>
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
					</>
				)}
			</main>

			<Footer/>
		</div>
	);
}
