import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
