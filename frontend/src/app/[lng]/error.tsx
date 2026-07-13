'use client';

// Error handler — route-level boundary, renders inside layout

import { Button, Flex, Text } from '@gravity-ui/uikit';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
      style={{ minHeight: 320, padding: 40 }}
    >
      <Text variant="header-1">Something went wrong</Text>
      <Text variant="body-1" color="secondary" style={{ maxWidth: 480, textAlign: 'center' }}>
        {error.message}
      </Text>
      <Button view="action" onClick={reset}>
        Try again
      </Button>
    </Flex>
  );
}
