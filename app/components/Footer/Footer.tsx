'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { LogoFacebook, LogoInstagram, LogoYoutube } from 'react-ionicons'

export const Footer = () => {
	const { t } = useTranslation();

	return <footer className="bg-zinc-950 text-white py-[4em] px-[1em]">
		<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[3em]">
			<div className="flex md:justify-center">
				<div className="w-full md:w-fit">
					<h3 className="text-white font-bold text-[1.2em] mb-[1em]">SHINE A.S.D.</h3>
					<p className="text-zinc-400">{t.footer.fiscalCode}</p>
					<p className="text-zinc-400">{t.footer.vat}</p>
				</div>
			</div>

			<div className="flex md:justify-center">
				<div className="w-full md:w-fit">
					<h3 className="text-white font-bold text-[1.2em] mb-[1em]">{t.footer.bankInfo}</h3>
					<p className="text-zinc-400">{t.footer.accountHolder}</p>
					<p className="text-zinc-400 break-all">{t.footer.iban}</p>
				</div>
			</div>

			<div className="flex md:justify-center">
				<div className="w-full md:w-fit">
					<h3 className="text-white font-bold text-[1.2em] mb-[1em]">Social</h3>
					<div className="flex gap-[1.2em]">
						<a href="https://www.facebook.com/ShineSchoolOfMovement/" target="_blank" rel="noopener noreferrer"
						   className="text-zinc-400 hover:text-white transition-colors flex items-center">
							<LogoFacebook color={'currentColor'} height="24px" width="24px"/>
						</a>
						<a href="https://www.instagram.com/shine_school_of_movement/" target="_blank" rel="noopener noreferrer"
						   className="text-zinc-400 hover:text-white transition-colors flex items-center">
							<LogoInstagram color={'currentColor'} height="24px" width="24px"/>
						</a>
						<a href="https://www.youtube.com/user/usethisnameWTF" target="_blank" rel="noopener noreferrer"
						   className="text-zinc-400 hover:text-white transition-colors flex items-center">
							<LogoYoutube color={'currentColor'} height="24px" width="24px"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>;
};
