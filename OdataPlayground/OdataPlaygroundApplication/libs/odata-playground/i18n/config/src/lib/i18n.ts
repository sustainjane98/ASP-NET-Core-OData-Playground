import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    detection: {
      order: ['navigator', 'path'],
      caches: [],
      htmlTag: document.documentElement,
      convertDetectedLanguage: 'Iso15897',
    },
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'en',
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
