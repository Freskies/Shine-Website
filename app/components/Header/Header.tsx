'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

export const Header = () => {
	const { t } = useTranslation();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
		isScrolled 
			? 'bg-white/80 backdrop-blur-md border-b border-zinc-200' 
			: 'bg-transparent border-b border-transparent'
	} py-4`}>
		<div className="max-w-[80rem] mx-auto px-[1em] h-[3em] flex items-center justify-between">
			<Link href="/" className={`flex items-center gap-[0.5em] transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
				<Image
					src="/logo_shine_circle.avif"
					alt="Shine Logo"
					width={40}
					height={40}
					className="rounded-full"
				/>
				<span className="font-bold text-[1.2em] hidden sm:block">SHINE</span>
			</Link>

			<nav className={`flex gap-[1.5em] font-medium transition-colors ${isScrolled ? 'text-zinc-900' : 'text-white'}`}>
				<Link href="/" className="hover:opacity-70 transition-opacity">
					{t.header.home}
				</Link>
				<Link href="/about" className="hover:opacity-70 transition-opacity">
					{t.header.about}
				</Link>
				<Link href="/team" className="hover:opacity-70 transition-opacity">
					{t.team.title}
				</Link>
				<Link href="/map" className="hover:opacity-70 transition-opacity">
					{t.header.map}
				</Link>
			</nav>
		</div>
	</header>;
};
