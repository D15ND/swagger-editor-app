'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DEFAULT_LNG } from '@/i18n/locales';

type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string };

export default function LocalizedLink({ href, children, ...rest }: LocalizedLinkProps) {
  const params = useParams<{ lng: string }>();
  const lng = params?.lng || DEFAULT_LNG;
  const localizedHref = href.startsWith('/') ? `/${lng}${href}` : href;

  // Gravity UI Button forwards internal props (component) to rendered element
  const { component: _c, ...linkProps } = rest as Record<string, unknown>;

  return (
    <Link href={localizedHref} {...linkProps}>
      {children}
    </Link>
  );
}
