'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export const Footer = () => {
	const { t } = useTranslation();

	return <footer className="bg-zinc-950 text-white py-[4em] px-[1em]">
		<div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[3em]">
			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">SHINE A.S.D.</h3>
				<p>{t.footer.fiscalCode}</p>
				<p>{t.footer.vat}</p>
			</div>

			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">{t.footer.bankInfo}</h3>
				<p>{t.footer.accountHolder}</p>
				<p>{t.footer.iban}</p>
			</div>

			<div>
				<h3 className="text-white font-bold text-[1.2em] mb-[1em]">Social</h3>
				<div className="flex flex-col gap-[0.5em]">
					<a href="https://www.facebook.com/ShineSchoolOfMovement/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
					<a href="https://www.instagram.com/shine_school_of_movement/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
					<a href="https://www.youtube.com/user/usethisnameWTF" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
				</div>
			</div>
		</div>
	</footer>;
};
