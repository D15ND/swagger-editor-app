import Link from 'next/link';
import { headers } from 'next/headers';

type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string };

export default async function LocalizedLink({ href, children, ...rest }: LocalizedLinkProps) {
  const headerList = await headers();
  const lng = headerList.get('x-i18next-current-language') || 'en';
  const localizedHref = href.startsWith('/') ? `/${lng}${href}` : href;

  return (
    <Link href={localizedHref} {...rest}>
      {children}
    </Link>
  );
}
