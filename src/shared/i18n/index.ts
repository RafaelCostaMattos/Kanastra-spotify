import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'shared/constants/config.constant';

const stored =
  (typeof window !== 'undefined' &&
    localStorage.getItem(LANGUAGE_STORAGE_KEY)) ||
  '';
const browser =
  (typeof navigator !== 'undefined' && navigator.language.split('-')[0]) ||
  DEFAULT_LANGUAGE;
const urlLang =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('lang')
    : undefined;
const initial =
  urlLang && SUPPORTED_LANGUAGES.includes(urlLang)
    ? urlLang
    : SUPPORTED_LANGUAGES.includes(stored)
    ? stored
    : SUPPORTED_LANGUAGES.includes(browser)
    ? browser
    : DEFAULT_LANGUAGE;

const resources = {
  en: {
    translation: require('./resources/en/translation.json'),
  },
  pt: {
    translation: require('./resources/pt/translation.json'),
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: initial,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
});

export const setAppLanguage = (lng: string) => {
  if (!SUPPORTED_LANGUAGES.includes(lng)) return;
  i18next.changeLanguage(lng);
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  const params = new URLSearchParams(window.location.search);
  params.set('lang', lng);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  if (newUrl !== window.location.pathname + window.location.search) {
    window.history.replaceState(null, '', newUrl);
  }
};

export default i18next;
