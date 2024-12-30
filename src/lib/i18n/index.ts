import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';
const supportedLocales = ['en', 'fr', 'pl'];

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));
register('pl', () => import('./locales/pl.json'));

const getInitialLocale = () => {
	if (!browser) return defaultLocale;

	const browserLocale = window.navigator.language.split('-')[0];
	return supportedLocales.includes(browserLocale) ? browserLocale : defaultLocale;
};

init({
	fallbackLocale: defaultLocale,
	initialLocale: getInitialLocale()
});