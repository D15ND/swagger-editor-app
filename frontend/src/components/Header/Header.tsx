'use client';

import { useState } from 'react';
import { Flex, Button, Container } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { Bars, Xmark, Clock, BookOpen } from '@gravity-ui/icons';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import LocalizedLink from '@/components/LocalizedLink';
import AuthLinks from './AuthLinks';
import styles from './Header.module.css';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useT('common');

  return (
    <header className={styles.header}>
      <div className={styles.backdrop} />
      <Container maxWidth="xl" className={styles.container}>
        <Flex alignItems="center" justifyContent="space-between">
          <Logo />

          <Flex as="nav" className={styles.navDesktop} alignItems="center" gap="6">
            {user && (
              <LocalizedLink href="/history" className={styles.navLink}>
                <Clock className={styles.navIcon} />
                <span>{t('nav.history')}</span>
              </LocalizedLink>
            )}
            <LocalizedLink href="/about" className={styles.navLink}>
              <BookOpen className={styles.navIcon} />
              <span>{t('nav.about')}</span>
            </LocalizedLink>
          </Flex>
          <Flex className={styles.actions} alignItems="center" gap="2">
            <Flex className={styles.desktopControls} alignItems="center" gap="2">
              <ThemeToggle />
              <LanguageSwitcher />
              <AuthLinks isAuth={!!user} signOut={signOut} />
            </Flex>

            <Flex className={styles.mobileToggle} alignItems="center" gap="1">
              <ThemeToggle />
              <Button
                view="flat"
                size="l"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <Button.Icon>{menuOpen ? <Xmark /> : <Bars />}</Button.Icon>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>

      {menuOpen && (
        <div className={styles.panel}>
          <Flex as="nav" direction="column" gap="2">
            {user && (
              <LocalizedLink href="/history" className={styles.navLink}>
                <Clock className={styles.navIcon} />
                <span>{t('nav.history')}</span>
              </LocalizedLink>
            )}
            <LocalizedLink href="/about" className={styles.navLink}>
              <BookOpen className={styles.navIcon} />
              <span>{t('nav.about')}</span>
            </LocalizedLink>
          </Flex>

          <Flex direction="column" gap="2" className={styles.panelActions}>
            <AuthLinks isAuth={!!user} signOut={signOut} />
          </Flex>
        </div>
      )}
    </header>
  );
}
