'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import React from "react";
import Image from "next/image";
import { IoChevronDownOutline } from 'react-icons/io5'

import styles from './Hero.module.css';

export const Hero = () => {
	const { t } = useTranslation();

	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const element = document.getElementById('courses');
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	};

	return <section className={styles.hero}>
		<div className={styles.backgroundContainer}>
			<Image
				src="/temp/IMG_7604.webp"
				alt="Parkour Background"
				fill
				priority
				className={styles.backgroundImage}
			/>
			<div className={styles.gradientOverlay}/>
		</div>
		<div className={styles.content}>
			<h1 className={styles.title}>
				{t.hero.title}
			</h1>
			<p className={styles.description}>
				{t.hero.description}
			</p>
			<a href="#courses"
			   onClick={handleScroll}
			   className={styles.cta}>
				{t.hero.cta}
			</a>
		</div>

		<a href="#courses"
		   onClick={handleScroll}
		   className={styles.scrollButton}
		   aria-label="Scroll to courses">
			<IoChevronDownOutline size="32px" />
		</a>
	</section>;
};
