import type { I18nConfig } from 'next-i18next/proxy';
import resourceLoader from './loader';
import { DEFAULT_LNG, supportedLngs } from './locales';

const i18nConfig: I18nConfig = {
  supportedLngs,
  fallbackLng: DEFAULT_LNG,
  defaultNS: 'common',
  ns: ['common', 'home', 'about', 'auth', 'notFound', 'swaggerEditor'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  resourceLoader,
};

export default i18nConfig;
