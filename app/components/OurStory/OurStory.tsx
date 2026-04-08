'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OurStoryContextType {
	activeYear: number;
	setActiveYear: React.Dispatch<React.SetStateAction<number>>
	years: number[];
	showAll: boolean;
	setShowAll: (show: boolean) => void;
}

const OurStoryContext = createContext<OurStoryContextType | undefined>(undefined);

const useOurStory = () => {
	const context = useContext(OurStoryContext);
	if (!context)
		throw new Error('OurStory components must be used within <OurStory />');
	return context;
};

interface OurStoryProps {
	children: ReactNode;
	initialYear?: number;
	years: number[];
}

export const OurStory = ({ children, initialYear, years }: OurStoryProps) => {
	const [activeYear, setActiveYear] = useState(initialYear || years[0]);
	const [showAll, setShowAll] = useState(false);

	const value = useMemo(() => ({
		activeYear,
		setActiveYear,
		years,
		showAll,
		setShowAll
	}), [activeYear, years, showAll]);

	return (
		<OurStoryContext.Provider value={value}>
			<section className="w-full py-16 overflow-hidden">
				{children}
			</section>
		</OurStoryContext.Provider>
	);
};

const Timeline = () => {
	const { activeYear, setActiveYear, years, showAll, setShowAll } = useOurStory();
	const [localYear, setLocalYear] = useState(activeYear);
	const startYear = years[0];
	const endYear = years[years.length - 1];

	useEffect(() => {
		setLocalYear(activeYear);
	}, [activeYear]);

	const getVisibleYears = (center: number) => {
		if (showAll) return years;
		const minStart = startYear;
		const maxStart = endYear - 6;
		const start = Math.min(Math.max(center - 3, minStart), maxStart);
		return Array.from({ length: 7 }, (_, i) => start + i);
	};

	const visibleYears = getVisibleYears(activeYear);
	const sliderMin = showAll ? startYear : visibleYears[0];
	const sliderMax = showAll ? endYear : visibleYears[visibleYears.length - 1];

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalYear(parseInt(e.target.value, 10));
	};

	const handleSliderCommit = () => {
		setActiveYear(localYear);
	};

	const goToPrevious = () => {
		if (activeYear > startYear)
			setActiveYear(prev => prev - 1);
	};

	const goToNext = () => {
		if (activeYear < endYear)
			setActiveYear(prev => prev + 1);
	};

	return (
		<div className="w-full flex flex-col items-center gap-8 py-12 px-4 select-none">
			{/* Toggle Visualizzazione */}
			<div className="flex items-center bg-zinc-100 p-1 rounded-full text-sm font-medium relative w-fit">
				<button
					onClick={() => setShowAll(false)}
					className={`px-4 py-2 rounded-full transition-all relative z-10 min-w-30 ${(showAll ? 'text-zinc-500 hover:text-accent' : 'text-accent')}`}
				>
					Focus Periodo
				</button>
				<button
					onClick={() => setShowAll(true)}
					className={`px-4 py-2 rounded-full transition-all relative z-10 min-w-30 ${showAll ? 'text-accent' : 'text-zinc-500 hover:text-accent'}`}
				>
					Tutta la Storia
				</button>

				{/* Background Animato del Toggle */}
				<motion.div
					initial={false}
					animate={{
						x: showAll ? '100%' : 0,
					}}
					transition={{ type: 'spring', stiffness: 500, damping: 35 }}
					className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm rounded-full pointer-events-none"
				/>
			</div>

			<div className="w-full max-w-4xl flex items-center gap-4">
				{/* Pulsante Indietro */}
				<button
					onClick={goToPrevious}
					disabled={activeYear <= startYear}
					className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					&lt;
				</button>

				<div className="flex-1 flex flex-col gap-6">
					{/* Label Anni */}
					<div className="flex justify-between items-end h-12 relative px-2.5 overflow-hidden">
						<AnimatePresence mode="popLayout" initial={false}>
							{visibleYears.map((year) => {
								const isActive = year === localYear;
								// Calcolo posizione percentuale per allineamento label
								const left = ((year - sliderMin) / (sliderMax - sliderMin)) * 100;

								if (showAll)
									return (
										<motion.div
											key={`all-${year}`}
											initial={{ opacity: 0, y: 10 }}
											animate={{
												opacity: 1,
												y: 0,
												left: `${left}%`,
												translateX: '-50%'
											}}
											exit={{ opacity: 0, y: 10 }}
											transition={{ type: 'spring', stiffness: 300, damping: 30 }}
											className={`absolute bottom-0 ${isActive ? 'text-accent text-3xl font-black z-20' : 'text-zinc-400 text-sm hidden md:block z-10'}`}
										>
											{year}
										</motion.div>
									);

								return (
									<motion.div
										key={`focus-${year}`}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{
											opacity: 1,
											scale: 1,
											x: 0
										}}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
										className="flex-1 flex flex-col items-center"
									>
										<div
											className={`transition-all duration-300 ${isActive ? 'text-accent text-3xl font-black scale-110' : 'text-zinc-400 text-lg font-medium'}`}
										>
											{year}
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>

					{/* Slider */}
					<div className="relative w-full h-2 flex items-center">
						<input
							type="range"
							min={sliderMin}
							max={sliderMax}
							value={localYear}
							onChange={handleSliderChange}
							onMouseUp={handleSliderCommit}
							onTouchEnd={handleSliderCommit}
							onKeyUp={handleSliderCommit}
							className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all active:[&::-webkit-slider-thumb]:scale-120 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all active:[&::-moz-range-thumb]:scale-120"
							style={{
								background: `linear-gradient(to right, #763E3F ${((localYear - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e4e4e7 0%)`
							}}
						/>
					</div>
				</div>

				{/* Pulsante Avanti */}
				<button
					onClick={goToNext}
					disabled={activeYear >= endYear}
					className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					&gt;
				</button>
			</div>
		</div>
	);
};

const Content = ({ children }: { children: ReactNode }) => {
	const { years, activeYear } = useOurStory();
	const activeIndex = years.indexOf(activeYear);

	return (
		<div className="relative w-full overflow-hidden px-4 md:px-8">
			<div
				className="flex transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{children}
			</div>
		</div>
	);
};

interface YearArticleProps {
	year: number;
	children: ReactNode;
}

const YearArticle = ({ year, children }: YearArticleProps) => {
	const { activeYear } = useOurStory();
	const isActive = activeYear === year;

	return (
		<article
			className={`min-w-full px-4 transition-opacity duration-700 ${
				isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}
			aria-hidden={!isActive}
		>
			<div className="max-w-3xl mx-auto">
				<h2 className="text-4xl font-black mb-8 text-zinc-900">
					{year}
				</h2>
				<div className="prose prose-zinc lg:prose-xl">
					{children}
				</div>
			</div>
		</article>
	);
};

OurStory.Timeline = Timeline;
OurStory.Content = Content;
OurStory.YearArticle = YearArticle;

export default OurStory;
