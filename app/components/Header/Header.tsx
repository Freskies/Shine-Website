'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useHeaderScroll } from './useHeaderScroll';
import { useNavbarClick } from './useNavbarClick';
import { motion } from 'framer-motion';
import React from "react";

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

	// noinspection LongLine
	return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
		showScrolledState
			? 'bg-white/80 backdrop-blur-md border-b border-zinc-200'
			: 'bg-transparent border-b border-transparent'
	} py-4`}>
		<div className="max-w-7xl mx-auto px-[1em] h-[3em] flex items-center justify-between">
			<Link href="/"
			      onClick={handleNavbarClick('/')}
			      className={`flex items-center gap-[0.5em] transition-colors ${showScrolledState ? 'text-black' : 'text-white'}`}>
				<Image
					src="/logo_shine_circle.avif"
					alt="Shine Logo"
					width={40}
					height={40}
					className={`rounded-full transition-all duration-300 ${(showScrolledState ? '' : 'brightness-0 invert')}`}
				/>
				<span className="font-bold text-[1.2em] hidden sm:block">SHINE</span>
			</Link>

			<nav
				className={`flex gap-[1.5em] font-medium transition-colors ${showScrolledState ? 'text-zinc-900' : 'text-white'}`}>
				{navLinks.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						onClick={handleNavbarClick(href)}
						className="hover:opacity-70 transition-opacity relative py-1"
					>
						{label}
						{pathname === href && (
							<motion.div
								layoutId="nav-underline"
								className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
								transition={{ type: 'spring', stiffness: 380, damping: 30 }}
							/>
						)}
					</Link>
				))}
			</nav>
		</div>
	</header>;
};
