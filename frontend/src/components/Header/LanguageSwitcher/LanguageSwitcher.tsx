'use client';

import Link from 'next/link';
import { Globe } from '@gravity-ui/icons';
import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { current, next, href } = useLocaleSwitch();

  return (
    <Link href={href(next())} className={styles.link}>
      <Globe className={styles.icon} />
      <span className={styles.label}>{current.toUpperCase()}</span>
    </Link>
  );
}
