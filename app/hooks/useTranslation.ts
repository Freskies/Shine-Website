'use client';

import { useState, useEffect } from 'react';
import { translations, Language, TranslationKeys } from '../i18n/translations';

export const useTranslation = () => {
	const [lang, setLang] = useState<Language>('it');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const updateLang = () => {
			const browserLang = navigator.language.split('-')[0];
			if (browserLang === 'en' || browserLang === 'it')
				setLang(browserLang as Language);
		};

		updateLang();
		// Posticipiamo setMounted per evitare il warning di setState sincrono nell'effetto
		const frame = requestAnimationFrame(() => {
			setMounted(true);
		});
		window.addEventListener('languagechange', updateLang);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('languagechange', updateLang);
		};
	}, [setMounted]);

	const t = (mounted ? translations[lang] : translations.it) as TranslationKeys;

	return { t, lang, setLang };
};
