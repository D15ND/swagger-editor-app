'use client';

import { useRef, useState } from 'react';
import { Flex, Button, Container, Drawer } from '@gravity-ui/uikit';
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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
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

      <Drawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        placement="right"
        size="auto"
        initialFocus={closeBtnRef}
      >
        <Flex direction="column" gap="4" className={styles.drawerBody}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              ref={closeBtnRef}
              view="flat"
              size="l"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <Button.Icon>
                <Xmark />
              </Button.Icon>
            </Button>
          </Flex>
          <Flex as="nav" direction="column" gap="2">
            {user && (
              <LocalizedLink
                href="/history"
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                <Clock className={styles.navIcon} />
                <span>{t('nav.history')}</span>
              </LocalizedLink>
            )}
            <LocalizedLink
              href="/about"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen className={styles.navIcon} />
              <span>{t('nav.about')}</span>
            </LocalizedLink>
          </Flex>

          <Flex direction="column" gap="2" className={styles.panelActions}>
            <LanguageSwitcher />
            <AuthLinks isAuth={!!user} signOut={signOut} onClick={() => setMenuOpen(false)} />
          </Flex>
        </Flex>
      </Drawer>
    </header>
  );
}
