'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
	const { t } = useTranslation();

	return <footer className="bg-zinc-950 text-white py-[4em] px-[1em]">
		<div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-[3em]">
			<div className="flex flex-col gap-[1em]">
				<Link href="/" className="flex items-center gap-[0.5em] hover:opacity-80 transition-opacity">
					<Image
						src="/temp/logo_shine_circle.avif"
						alt="Shine Logo"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span className="font-bold text-[1.2em]">SHINE</span>
				</Link>
				<p className="text-zinc-400 text-sm max-w-[200px]">
					{t.hero.description}
				</p>
			</div>

			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">SHINE A.S.D.</h3>
				<p className="text-zinc-400">{t.footer.fiscalCode}</p>
				<p className="text-zinc-400">{t.footer.vat}</p>
			</div>

			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">{t.footer.bankInfo}</h3>
				<p className="text-zinc-400">{t.footer.accountHolder}</p>
				<p className="text-zinc-400 break-all">{t.footer.iban}</p>
			</div>

			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">Social</h3>
				<div className="flex gap-[1em]">
					<a href="https://www.facebook.com/ShineSchoolOfMovement/" target="_blank" rel="noopener noreferrer"
					   className="text-zinc-400 hover:text-white transition-colors">
						<Facebook size={24}/>
					</a>
					<a href="https://www.instagram.com/shine_school_of_movement/" target="_blank" rel="noopener noreferrer"
					   className="text-zinc-400 hover:text-white transition-colors">
						<Instagram size={24}/>
					</a>
					<a href="https://www.youtube.com/user/usethisnameWTF" target="_blank" rel="noopener noreferrer"
					   className="text-zinc-400 hover:text-white transition-colors">
						<Youtube size={24}/>
					</a>
				</div>
			</div>
		</div>
	</footer>;
};
