import { formatJson } from '../utils';
import styles from './SchemaBlock.module.css';

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
      <h4>{title}</h4>
      <pre className={styles.code}>{formatJson(value)}</pre>
    </div>
  );
}
