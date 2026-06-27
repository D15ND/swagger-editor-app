'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe } from '@gravity-ui/icons';
import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { current, next, href } = useLocaleSwitch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Link href={href(next())} className={styles.link}>
      <Globe className={styles.icon} />
      {mounted && <span className={styles.label}>{current.toUpperCase()}</span>}
    </Link>
  );
}
