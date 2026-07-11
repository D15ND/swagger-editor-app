import { formatJson } from '../utils';
import styles from './SchemaBlock.module.css';
import { Text } from '@gravity-ui/uikit';

type SchemaBlockProps = {
  title: string;
  value: unknown;
};

export function SchemaBlock({ title, value }: SchemaBlockProps) {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className={styles.block}>
      <Text as="h4" variant="header-2">
        {title}
      </Text>
      <pre className={styles.code}>{formatJson(value)}</pre>
    </div>
  );
}
