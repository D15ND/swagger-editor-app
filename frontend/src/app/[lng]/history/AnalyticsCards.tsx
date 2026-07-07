'use client';

import { Flex, Text, Card } from '@gravity-ui/uikit';
import { formatDuration } from '@/lib/history';
import styles from './history.module.css';

type Props = {
  totalRequests: string;
  successful: number;
  errored: number;
  totalTime: number;
  avgDuration: number;
  successfulLabel: string;
  failedLabel: string;
  totalTimeLabel: string;
  avgDurationLabel: string;
};

export default function AnalyticsCards({
  totalRequests,
  successful,
  errored,
  totalTime,
  avgDuration,
  successfulLabel,
  failedLabel,
  totalTimeLabel,
  avgDurationLabel,
}: Props) {
  return (
    <>
      <Text variant="body-1" color="secondary">
        {totalRequests}
      </Text>

      <Flex gap="3" className={styles.cards}>
        <Card view="outlined" size="l" className={styles.card}>
          <Text variant="caption-1" color="secondary">
            {successfulLabel}
          </Text>
          <Text variant="header-1">{successful}</Text>
        </Card>
        <Card view="outlined" size="l" className={styles.card}>
          <Text variant="caption-1" color="secondary">
            {failedLabel}
          </Text>
          <Text variant="header-1" color={errored > 0 ? 'danger' : undefined}>
            {errored}
          </Text>
        </Card>
        <Card view="outlined" size="l" className={styles.card}>
          <Text variant="caption-1" color="secondary">
            {totalTimeLabel}
          </Text>
          <Text variant="header-1">{formatDuration(totalTime)}</Text>
        </Card>
        <Card view="outlined" size="l" className={styles.card}>
          <Text variant="caption-1" color="secondary">
            {avgDurationLabel}
          </Text>
          <Text variant="header-1">{formatDuration(avgDuration)}</Text>
        </Card>
      </Flex>
    </>
  );
}
