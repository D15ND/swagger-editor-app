import { Card, Text } from '@gravity-ui/uikit';
import styles from './ServerResponse.module.css';

type Props = {
  status: number;
  body: string;
  headers: Record<string, string>;
  error: string | null;
};

export default function ServerResponse({ status, body, headers, error }: Props) {
  if (error) {
    return (
      <Card view="outlined" size="l" className={styles.card}>
        <Text variant="header-1" as="h4" color="danger">
          Error
        </Text>
        <Text variant="body-2" color="danger" className={styles.mono}>
          {error}
        </Text>
      </Card>
    );
  }

  return (
    <Card view="outlined" size="l" className={styles.card}>
      <Text variant="header-1" as="h4">
        Server response
      </Text>

      <Text variant="body-2" className={styles.mono}>
        Status: {status}
      </Text>

      {body && (
        <div className={styles.block}>
          <Text variant="subheader-1" as="h5">
            Response body
          </Text>
          <pre className={styles.pre}>
            <code>{body}</code>
          </pre>
        </div>
      )}

      <div className={styles.block}>
        <Text variant="subheader-1" as="h5">
          Response headers
        </Text>
        <dl className={styles.list}>
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className={styles.row}>
              <dt className={styles.key}>{key}:</dt>
              <dd className={styles.value}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
