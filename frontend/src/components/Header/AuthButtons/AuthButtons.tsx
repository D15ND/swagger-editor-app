'use client';

import { Button } from '@gravity-ui/uikit';
import { ArrowRightFromSquare, LockOpen, PersonPlus } from '@gravity-ui/icons';
import { useT } from 'next-i18next/client';

type Props = {
  user?: boolean;
  go: (path: string) => void;
}

export default function AuthButtons({ user, go }: Props) {
  const { t } = useT('common');

  return user ? (
    <Button view="flat-danger" size="l" onClick={() => {}}>
      <Button.Icon>
        <ArrowRightFromSquare />
      </Button.Icon>
      {t('nav.signOut')}
    </Button>
  ) : (
    <>
      <Button view="flat" size="l" onClick={() => go('/signin')}>
        <Button.Icon>
          <LockOpen />
        </Button.Icon>
        {t('nav.signIn')}
      </Button>
      <Button view="action" size="l" onClick={() => go('/signup')}>
        <Button.Icon>
          <PersonPlus />
        </Button.Icon>
        {t('nav.signUp')}
      </Button>
    </>
  );
}
