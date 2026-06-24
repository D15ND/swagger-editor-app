import type { I18nConfig } from 'next-i18next/proxy';

const resourceLoader: I18nConfig['resourceLoader'] =
  process.env.NODE_ENV === 'development'
    ? async (lng, ns) => {
        const fs = await import('fs/promises');
        const path = await import('path');
        const content = await fs.readFile(
          path.resolve(process.cwd(), `src/i18n/locales/${lng}/${ns}.json`),
          'utf-8',
        );
        return JSON.parse(content);
      }
    : (lng, ns) => import(`./locales/${lng}/${ns}.json`);

export default resourceLoader;
