'use client';

import { Button } from '@gravity-ui/uikit';
import { ArrowRightFromSquare, LockOpen, PersonPlus } from '@gravity-ui/icons';

type Props = {
  user?: boolean;
  go: (path: string) => void;
}

export default function AuthButtons({ user, go }: Props) {
  return user ? (
    <Button view="flat-danger" size="l" onClick={() => {}}>
      <Button.Icon>
        <ArrowRightFromSquare />
      </Button.Icon>
      Sign Out
    </Button>
  ) : (
    <>
      <Button view="flat" size="l" onClick={() => go('/signin')}>
        <Button.Icon>
          <LockOpen />
        </Button.Icon>
        Sign In
      </Button>
      <Button view="action" size="l" onClick={() => go('/signup')}>
        <Button.Icon>
          <PersonPlus />
        </Button.Icon>
        Sign Up
      </Button>
    </>
  );
}
