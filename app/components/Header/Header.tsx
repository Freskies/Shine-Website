'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useHeaderScroll } from './useHeaderScroll';
import { useNavbarClick } from './useNavbarClick';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';
import { motion } from 'framer-motion';
import React from "react";
import styles from './Header.module.css';

export const Header = () => {
	const { t } = useTranslation();
	const isScrolled = useHeaderScroll();
	const pathname = usePathname();
	const handleNavbarClick = useNavbarClick();

	const isHome = pathname === '/';
	const showScrolledState = !isHome || isScrolled;

	const navLinks = [
		{ href: '/', label: t.header.home },
		{ href: '/about', label: t.header.about },
		{ href: '/map', label: t.header.map },
	];

	if (!IS_MAINTENANCE_MODE) {
		navLinks.push({ href: '/1000back', label: t.header.backflip });
	}

	// noinspection LongLine
	return <header
		className={`${styles.header} ${showScrolledState ? styles.headerScrolled : styles.headerTransparent}`}>
		<div className={styles.container}>
			<Link href="/"
			      onClick={handleNavbarClick('/')}
			      className={`${styles.logoLink} ${showScrolledState ? styles.textBlack : styles.textWhite}`}>
				<Image
					src="/temp/logo_shine_circle.avif"
					alt="Shine Logo"
					width={40}
					height={40}
					className={`${styles.logoImage} ${showScrolledState ? '' : styles.logoInverted}`}
				/>
				<span className={styles.logoText}>SHINE</span>
			</Link>

			<nav
				className={`${styles.nav} ${showScrolledState ? styles.navTextDark : styles.navTextWhite}`}>
				{navLinks.map(({ href, label }) => {
					const isEvent = href === '/1000back';
					return (
						<Link
							key={href}
							href={href}
							onClick={handleNavbarClick(href)}
							className={isEvent ? styles.navButton : styles.navLink}
						>
							{label}
							{pathname === href && !isEvent && (
								<motion.div
									layoutId="nav-underline"
									className={styles.underline}
									transition={{ type: 'spring', stiffness: 380, damping: 30 }}
								/>
							)}
						</Link>
					);
				})}
			</nav>
		</div>
	</header>;
};
