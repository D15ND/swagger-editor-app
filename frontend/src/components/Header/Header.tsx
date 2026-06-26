'use client';

import { useState } from 'react';
import { Bars, Xmark, LockOpen, PersonPlus, Clock, BookOpen } from '@gravity-ui/icons';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: replace with const { user } = useAuth()
  // const user = null;
  const user = true;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.navDesktop}>
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
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopControls}>
            <ThemeToggle />
            <LanguageSwitcher />

            {user ? (
              <button className={styles.btnSignOut}>
                <LockOpen />
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <LocalizedLink href="/signin" className={styles.btnSignIn}>
                  <LockOpen />
                  <span>Sign In</span>
                </LocalizedLink>
                <LocalizedLink href="/signup" className={styles.btnSignUp}>
                  <PersonPlus />
                  <span>Sign Up</span>
                </LocalizedLink>
              </>
            )}
          </div>

          <div className={styles.mobileToggle}>
            <button className={styles.hamburger} onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <Xmark /> : <Bars />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.panel}>
          <nav className={styles.navPanel}>
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
          </nav>

          <div className={styles.panelActions}>
            <ThemeToggle />
            <LanguageSwitcher />

            {user ? (
              <button className={styles.btnSignOut}>
                <LockOpen />
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <LocalizedLink href="/signin" className={styles.btnSignIn}>
                  <LockOpen />
                  <span>Sign In</span>
                </LocalizedLink>
                <LocalizedLink href="/signup" className={styles.btnSignUp}>
                  <PersonPlus />
                  <span>Sign Up</span>
                </LocalizedLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
