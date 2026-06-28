'use client';

import { Container } from '@gravity-ui/uikit';
import { Footer as GravityFooter, MobileFooter } from '@gravity-ui/navigation';
import { useT } from 'next-i18next/client';
import { useParams } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useT('common');
  const params = useParams<{ lng: string }>();
  const lng = params?.lng || 'en';

  const menuItems = [
    {
      text: 'RS School',
      href: 'https://rs.school/',
      target: '_blank',
      rel: 'noreferrer',
    },
    {
      text: t('nav.about') as string,
      href: `/${lng}/about`,
    },
  ];

  const copyright = `\u00A9 2026 Swagger Editor App.`;

  return (
    <div className={styles.wrapper}>
      <Container maxWidth="xl">
        <GravityFooter
          className={styles.desktop}
          menuItems={menuItems}
          copyright={copyright}
          withDivider={false}
        />
        <MobileFooter
          className={styles.mobile}
          menuItems={menuItems}
          copyright={copyright}
          withDivider={false}
        />
      </Container>
    </div>
  );
}
