'use client';

import { useEffect, useState } from 'react';
import { Button } from '@gravity-ui/uikit';
import { Sun, Moon } from '@gravity-ui/icons';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Button view="flat" size="l" className={styles.toggle} onClick={toggleTheme}>
      <Button.Icon>
        {mounted ? (theme === 'dark' ? <Sun /> : <Moon />) : <Sun />}
      </Button.Icon>
    </Button>
  );
}
