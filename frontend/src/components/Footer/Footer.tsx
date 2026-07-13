import { getT } from 'next-i18next/server';
import FooterClient from './FooterClient';

export default async function Footer() {
  const { t, lng } = await getT('common');

  const menuItems = [
    {
      text: 'RS School',
      href: 'https://rs.school/',
      target: '_blank',
      rel: 'noreferrer',
    },
    {
      text: t('nav.about'),
      href: `/${lng}/about`,
    },
  ];

  const copyright = '\u00A9 2026 Swagger Editor App.';

  return <FooterClient menuItems={menuItems} copyright={copyright} />;
}
