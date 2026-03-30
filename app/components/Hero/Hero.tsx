'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import React from "react";
import Image from "next/image";

export const Hero = () => {
	const { t } = useTranslation();

	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const element = document.getElementById('courses');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return <section
		className="min-h-dvh flex flex-col items-center justify-center text-center px-[1em] py-[6em] relative overflow-hidden bg-black">
		<div className="absolute inset-0 z-0">
			<Image
				src="/temp/IMG_7604.webp"
				alt="Parkour Background"
				fill
				priority
				className="object-cover opacity-25"
			/>
			<div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-zinc-50 to-transparent"/>
		</div>
		<div className="max-w-240 relative z-10 text-white">
			<h1
				className="text-[3.5em] sm:text-[5em] font-bold leading-[1.1] mb-[0.4em] uppercase tracking-tight text-white whitespace-pre-line">
				{t.hero.title}
			</h1>
			<p className="text-[1.2em] sm:text-[1.5em] mb-[2em] max-w-160 mx-auto text-white/90">
				{t.hero.description}
			</p>
			<a href="#courses"
			   onClick={handleScroll}
			   className="inline-block bg-accent text-white px-[2.5em] py-[1.2em] rounded-full font-bold text-[1.1em] transition-transform hover:scale-105 active:scale-95">
				{t.hero.cta}
			</a>
		</div>

		<a href="#courses"
		   onClick={handleScroll}
		   className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-accent hover:opacity-70 transition-opacity animate-bounce"
		   aria-label="Scroll to courses">
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
			</svg>
		</a>
	</section>;
};
