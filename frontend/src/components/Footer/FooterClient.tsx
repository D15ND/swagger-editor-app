'use client';

import { Container } from '@gravity-ui/uikit';
import { Footer as GravityFooter, MobileFooter } from '@gravity-ui/navigation';
import styles from './Footer.module.css';

type FooterMenuItem = {
  text: string;
  href: string;
  target?: string;
  rel?: string;
};

type FooterClientProps = {
  menuItems: FooterMenuItem[];
  copyright: string;
};

export default function FooterClient({ menuItems, copyright }: FooterClientProps) {
  return (
    <div className={styles.wrapper}>
      <Container maxWidth="xl">
        <GravityFooter
          className={`${styles.footerBase} ${styles.desktop}`}
          menuItems={menuItems}
          copyright={copyright}
          withDivider={false}
        />
        <MobileFooter
          className={`${styles.footerBase} ${styles.mobile}`}
          menuItems={menuItems}
          copyright={copyright}
          withDivider={false}
        />
      </Container>
    </div>
  );
}
