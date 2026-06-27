import type { I18nConfig } from 'next-i18next/proxy';
import resourceLoader from './loader';
import { supportedLngs } from './locales';

const i18nConfig: I18nConfig = {
  supportedLngs,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'home', 'about'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  resourceLoader,
};

export default i18nConfig;
