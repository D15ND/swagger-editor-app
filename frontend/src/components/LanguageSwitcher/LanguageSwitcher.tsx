'use client';

import Link from 'next/link';
import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';

export default function LanguageSwitcher() {
  const locales = useLocaleSwitch();

  return (
    <nav style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: 16 }}>
      {locales.map(({ code, href, isActive }) => (
        <Link
          key={code}
          href={href}
          style={{ fontWeight: isActive ? 700 : 400 }}
          {...(isActive ? { 'aria-current': 'page' as const } : {})}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
