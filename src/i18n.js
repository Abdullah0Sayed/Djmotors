import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import ar from './locales/ar.json';
import en from './locales/en.json';


i18n.use(initReactI18next).use(languageDetector).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  detection: {
    order: ['htmlTag' , 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
    caches: ['cookie']
  },
  fallbackLng: 'ar',
});

export default i18n;