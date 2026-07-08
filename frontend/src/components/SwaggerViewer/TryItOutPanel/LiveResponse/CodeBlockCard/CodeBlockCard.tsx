'use client';

import { Card, ClipboardButton, Flex, Text } from '@gravity-ui/uikit';
import styles from './CodeBlockCard.module.css';

type Props = {
  title: string;
  code: string;
  as?: 'h3' | 'h4';
  onCopy?: (success: boolean) => void;
};

export default function CodeBlockCard({ title, code, as = 'h4', onCopy }: Props) {
  return (
    <Card view="outlined" size="l" className={styles.card}>
      <Flex direction="column" gap={2}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="header-1" as={as}>{title}</Text>
          <ClipboardButton text={code} size="m" onCopy={onCopy ? (_text, result) => onCopy(result) : undefined} />
        </Flex>
        <pre className={styles.pre}><code>{code}</code></pre>
      </Flex>
    </Card>
  );
}
