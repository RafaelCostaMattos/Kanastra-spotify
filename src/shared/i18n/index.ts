import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from 'shared/constants/config.constant';

const resources = {
  en: {
    translation: require('./resources/en/translation.json'),
  },
  pt: {
    translation: require('./resources/pt/translation.json'),
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGE, 
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;