'use client';

import { useState, useEffect } from 'react';
import { translations, Language, TranslationKeys } from '../i18n/translations';

export const useTranslation = () => {
	const [lang, setLang] = useState<Language>('it');

	useEffect(() => {
		const updateLang = () => {
			const browserLang = navigator.language.split('-')[0];
			if (browserLang === 'en' || browserLang === 'it')
				setLang(browserLang as Language);
			// DEBUG ONLY
			setLang('it');
		};

		updateLang();
		window.addEventListener('languagechange', updateLang);
		return () => window.removeEventListener('languagechange', updateLang);
	}, [setLang]);

	const t = translations[lang] as TranslationKeys;

	return { t, lang, setLang };
};
