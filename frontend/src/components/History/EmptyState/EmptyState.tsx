'use client';

import { useT } from 'next-i18next/client';
import { Card, Flex, Text, Button, Icon } from '@gravity-ui/uikit';
import { Clock } from '@gravity-ui/icons';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './EmptyState.module.css';

export default function EmptyState() {
  const { t } = useT('history');

  return (
    <Card className={styles.card} view="outlined" size="l">
      <Flex direction="column" alignItems="center" className={styles.inner}>
        <Icon data={Clock} size={48} className={styles.icon} />
        <Text variant="header-1" as="h2">
          {t('emptyTitle')}
        </Text>
        <Text variant="body-2" className={styles.hint}>
          {t('emptyHint')}
        </Text>
        <Flex gap="3" className={styles.links}>
          <LocalizedLink href="/">
            <Button view="action" size="l">
              {t('goToEditor')}
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/">
            <Button view="outlined" size="l">
              {t('goToViewer')}
            </Button>
          </LocalizedLink>
        </Flex>
      </Flex>
    </Card>
  );
}
