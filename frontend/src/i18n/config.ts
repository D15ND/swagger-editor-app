import type { I18nConfig } from 'next-i18next/proxy';
import resourceLoader from './loader';

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'ru'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'home'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  resourceLoader,
};

export default i18nConfig;
