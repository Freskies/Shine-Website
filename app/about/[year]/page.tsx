import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { Timeline } from '@/app/components/AboutTimeline/Timeline';
import * as Years from '@/app/components/AboutTimeline/years';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function AboutYearPage({ params }: { params: Promise<{ year: string }> }) {
	const { year: yearStr } = await params;
	const year = parseInt(yearStr, 10);

	if (isNaN(year) || year < 2009 || year > 2026) {
		notFound();
	}

	const YearComponent = (Years as any)[`Year${year}`];

	if (!YearComponent) {
		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="pt-[6em] flex-1">
				<Suspense>
					<Timeline currentYear={year} />
				</Suspense>
				<div className="max-w-[50rem] mx-auto px-4 pb-20">
					<YearComponent />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export async function generateStaticParams() {
	const years = [];
	for (let i = 2009; i <= 2026; i++) {
		years.push({ year: i.toString() });
	}
	return years;
}
