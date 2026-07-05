'use client';

import { Card, ClipboardButton, Flex, Text } from '@gravity-ui/uikit';

import styles from './CurlDisplay.module.css';

type Props = {
  command: string;
  onCopy?: (success: boolean) => void;
};

export default function CurlDisplay({ command, onCopy }: Props) {
  return (
    <Card view="outlined" size="l" className={styles.card}>
      <Flex direction="column" gap={2}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="header-1" as="h3">
            cURL
          </Text>
          <ClipboardButton text={command} size="m" onCopy={(_text, result) => onCopy?.(result)} />
        </Flex>
        <pre className={styles.code}>
          <code>{command}</code>
        </pre>
      </Flex>
    </Card>
  );
}
