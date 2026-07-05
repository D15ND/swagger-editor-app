'use client';

import { Button } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { ArrowRightFromSquare, LockOpen, PersonPlus } from '@gravity-ui/icons';
import LocalizedLink from '@/components/LocalizedLink';

type Props = {
  isAuth: boolean;
  signOut: () => void;
  onClick?: () => void;
};

export default function AuthLinks({ isAuth, signOut, onClick }: Props) {
  const { t } = useT('common');

  return isAuth ? (
    <Button view="flat-danger" size="l" onClick={() => { onClick?.(); signOut(); }}>
      <Button.Icon>
        <ArrowRightFromSquare />
      </Button.Icon>
      {t('nav.signOut')}
    </Button>
  ) : (
    <>
      <Button component={LocalizedLink} href="/signin" view="flat" size="l" onClick={onClick}>
        <Button.Icon>
          <LockOpen />
        </Button.Icon>
        {t('nav.signIn')}
      </Button>
      <Button component={LocalizedLink} href="/signup" view="action" size="l" onClick={onClick}>
        <Button.Icon>
          <PersonPlus />
        </Button.Icon>
        {t('nav.signUp')}
      </Button>
    </>
  );
}
