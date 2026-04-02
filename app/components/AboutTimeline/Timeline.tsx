'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TimelineProps {
	currentYear: number;
}

const START_YEAR = 2009;
const END_YEAR = 2026;

export const Timeline: React.FC<TimelineProps> = ({ currentYear }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const view = searchParams.get('view');
	const [isMounted, setIsMounted] = useState(false);
	const [draftYear, setDraftYear] = useState(currentYear);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const showAll = view === 'all';

	const setShowAll = (all: boolean) => {
		const params = new URLSearchParams(searchParams.toString());
		if (all) {
			params.set('view', 'all');
		} else {
			params.delete('view');
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	// Sincronizza il draftYear quando cambia l'anno corrente (navigazione esterna)
	useEffect(() => {
		setDraftYear(currentYear);
	}, [currentYear]);

	const years = useMemo(() => {
		const result = [];
		for (let i = START_YEAR; i <= END_YEAR; i++) {
			result.push(i);
		}
		return result;
	}, []);

	const getVisibleYears = (center: number) => {
		if (showAll) return years;

		let start = center - 3;
		let end = center + 3;

		if (start < START_YEAR) {
			start = START_YEAR;
			end = START_YEAR + 6;
		} else if (end > END_YEAR) {
			end = END_YEAR;
			start = END_YEAR - 6;
		}

		const visible = [];
		for (let i = start; i <= end; i++) {
			visible.push(i);
		}
		return visible;
	};

	const visibleYears = getVisibleYears(currentYear);
	const sliderMin = showAll ? START_YEAR : visibleYears[0];
	const sliderMax = showAll ? END_YEAR : visibleYears[visibleYears.length - 1];

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDraftYear(parseInt(e.target.value, 10));
	};

	const handleSliderRelease = () => {
		const params = new URLSearchParams(searchParams.toString());
		const query = params.toString() ? `?${params.toString()}` : '';
		router.push(`/about/${draftYear}${query}`);
	};

	const goToPrevious = () => {
		if (currentYear > START_YEAR) {
			const params = new URLSearchParams(searchParams.toString());
			const query = params.toString() ? `?${params.toString()}` : '';
			router.push(`/about/${currentYear - 1}${query}`);
		}
	};

	const goToNext = () => {
		if (currentYear < END_YEAR) {
			const params = new URLSearchParams(searchParams.toString());
			const query = params.toString() ? `?${params.toString()}` : '';
			router.push(`/about/${currentYear + 1}${query}`);
		}
	};

	if (!isMounted) return null;

	return (
		<div className="w-full flex flex-col items-center gap-8 py-12 px-4 select-none">
			{/* Toggle Visualizzazione */}
			<div className="flex items-center gap-4 bg-zinc-100 p-1 rounded-full text-sm font-medium">
				<button
					onClick={() => setShowAll(false)}
					className={`px-4 py-2 rounded-full transition-all ${!showAll ? 'bg-white shadow-sm text-accent' : 'text-zinc-500 hover:text-accent'}`}
				>
					Focus Periodo
				</button>
				<button
					onClick={() => setShowAll(true)}
					className={`px-4 py-2 rounded-full transition-all ${showAll ? 'bg-white shadow-sm text-accent' : 'text-zinc-500 hover:text-accent'}`}
				>
					Tutta la Storia
				</button>
			</div>

			<div className="w-full max-w-4xl flex items-center gap-4">
				{/* Pulsante Indietro */}
				<button
					onClick={goToPrevious}
					disabled={currentYear <= START_YEAR}
					className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					&lt;
				</button>

				<div className="flex-1 flex flex-col gap-6">
					{/* Label Anni */}
					<div className="flex justify-between items-end h-12 relative px-[10px]">
						{visibleYears.map((year) => {
							const isActive = year === draftYear;
							// Calcolo posizione percentuale per allineamento label
							const left = ((year - sliderMin) / (sliderMax - sliderMin)) * 100;
							
							// Se siamo in modalità "Mostra tutto", usiamo posizionamento assoluto per le label che ci stanno
							// In modalità "Focus", usiamo flex justify-between semplice
							if (showAll) {
								// In modalità "Tutta la Storia", mostriamo solo alcune etichette se sono troppe o usiamo una logica di densità
								// Per semplicità e chiarezza, le distribuiamo in base alla larghezza
								return (
									<div
										key={year}
										style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
										className={`absolute bottom-0 transition-all duration-300 ${isActive ? 'text-accent text-3xl font-black' : 'text-zinc-400 text-sm hidden md:block'}`}
									>
										{year}
									</div>
								);
							}

							return (
								<div
									key={year}
									className={`transition-all duration-300 flex flex-col items-center ${isActive ? 'text-accent text-3xl font-black scale-110' : 'text-zinc-400 text-lg font-medium'}`}
								>
									{year}
								</div>
							);
						})}
					</div>

					{/* Slider */}
					<div className="relative w-full h-2 flex items-center">
						<input
							type="range"
							min={sliderMin}
							max={sliderMax}
							value={draftYear}
							onChange={handleSliderChange}
							onMouseUp={handleSliderRelease}
							onTouchEnd={handleSliderRelease}
							className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all active:[&::-webkit-slider-thumb]:scale-120 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all active:[&::-moz-range-thumb]:scale-120"
							style={{
								background: `linear-gradient(to right, #763E3F ${((draftYear - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e4e4e7 0%)`
							}}
						/>
					</div>
				</div>

				{/* Pulsante Avanti */}
				<button
					onClick={goToNext}
					disabled={currentYear >= END_YEAR}
					className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					&gt;
				</button>
			</div>
		</div>
	);
};
