'use client';

import { Card, Flex, Text, Button, Icon } from '@gravity-ui/uikit';
import { Lock } from '@gravity-ui/icons';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './AuthRequired.module.css';

type Props = {
  title: string;
  hint: string;
  signIn: string;
  lng: string;
};

export default function AuthRequired({ title, hint, signIn, lng }: Props) {
  return (
    <Card view="outlined" size="l" className={styles.authCard}>
      <Flex direction="column" alignItems="center" gap="3">
        <Icon data={Lock} size={48} className={styles.authIcon} />
        <Text variant="header-1" as="h2">
          {title}
        </Text>
        <Text variant="body-2" color="secondary" className={styles.authHint}>
          {hint}
        </Text>
        <LocalizedLink href={`/${lng}/signin`}>
          <Button view="action" size="l">
            {signIn}
          </Button>
        </LocalizedLink>
      </Flex>
    </Card>
  );
}
