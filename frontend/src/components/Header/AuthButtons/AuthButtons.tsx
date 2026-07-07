'use client';

import { Button } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { ArrowRightFromSquare, LockOpen, PersonPlus } from '@gravity-ui/icons';

type Props = {
  isAuth: boolean;
  go: (path: string) => void;
  signOut: () => void;
};

export default function AuthButtons({ isAuth, go, signOut }: Props) {
  const { t } = useT('common');

  return isAuth ? (
    <Button view="flat-danger" size="l" onClick={signOut}>
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
