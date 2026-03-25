import { it } from './it';
import { en } from './en';

export const translations = {
	it,
	en,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.it;
