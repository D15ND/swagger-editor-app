'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Flex, Button } from '@gravity-ui/uikit';
import { Bars, Xmark, ArrowRightFromSquare, LockOpen, PersonPlus, Clock, BookOpen } from '@gravity-ui/icons';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const params = useParams<{ lng: string }>();
  const lng = params?.lng || 'en';

  // TODO: replace with const { user } = useAuth()
  // const user = null;
  const user = true;

  const go = (path: string) => router.push(`/${lng}${path}`);

  return (
    <header className={styles.header}>
      <div className={styles.backdrop} />
      <Flex className={styles.container} alignItems="center" justifyContent="space-between">
        <Logo />

        <Flex as="nav" className={styles.navDesktop} alignItems="center" gap="6">
          {user && (
            <LocalizedLink href="/history" className={styles.navLink}>
              <Clock className={styles.navIcon} />
              <span>History</span>
            </LocalizedLink>
          )}
          <LocalizedLink href="/about" className={styles.navLink}>
            <BookOpen className={styles.navIcon} />
            <span>About</span>
          </LocalizedLink>
        </Flex>

        <Flex className={styles.actions} alignItems="center" gap="2">
          <Flex className={styles.desktopControls} alignItems="center" gap="2">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <Button view="flat-danger" size="l" onClick={() => {}}>
                <Button.Icon>
                  <ArrowRightFromSquare />
                </Button.Icon>
                Sign Out
              </Button>
            ) : (
              <>
                <Button view="flat" size="l" onClick={() => go('/signin')}>
                  <Button.Icon>
                    <LockOpen />
                  </Button.Icon>
                  Sign In
                </Button>
                <Button view="action" size="l" onClick={() => go('/signup')}>
                  <Button.Icon>
                    <PersonPlus />
                  </Button.Icon>
                  Sign Up
                </Button>
              </>
            )}
          </Flex>

          <Flex className={styles.mobileToggle} alignItems="center" gap="1">
            <ThemeToggle />
            <Button view="flat" size="l" onClick={() => setMenuOpen((v) => !v)}>
              <Button.Icon>{menuOpen ? <Xmark /> : <Bars />}</Button.Icon>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {menuOpen && (
        <div className={styles.panel}>
          <Flex as="nav" direction="column" gap="2">
            {user && (
              <LocalizedLink href="/history" className={styles.navLink}>
                <Clock className={styles.navIcon} />
                <span>History</span>
              </LocalizedLink>
            )}
            <LocalizedLink href="/about" className={styles.navLink}>
              <BookOpen className={styles.navIcon} />
              <span>About</span>
            </LocalizedLink>
          </Flex>

          <Flex direction="column" gap="2" className={styles.panelActions}>
            {user ? (
              <Button view="flat-danger" size="l" onClick={() => {}}>
                <Button.Icon>
                  <ArrowRightFromSquare />
                </Button.Icon>
                Sign Out
              </Button>
            ) : (
              <>
                <Button view="flat" size="l" onClick={() => go('/signin')}>
                  <Button.Icon>
                    <LockOpen />
                  </Button.Icon>
                  Sign In
                </Button>
                <Button view="action" size="l" onClick={() => go('/signup')}>
                  <Button.Icon>
                    <PersonPlus />
                  </Button.Icon>
                  Sign Up
                </Button>
              </>
            )}
          </Flex>
        </div>
      )}
    </header>
  );
}
