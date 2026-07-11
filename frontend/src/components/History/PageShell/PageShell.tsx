import { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import styles from './PageShell.module.css';

type Props = {
  t: (key: string) => string;
  children: ReactNode;
};

export default function PageShell({ t, children }: Props) {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <Text as="h1" variant="header-2" className={styles.title}>
          {t('title')}
        </Text>
        <Text variant="body-1" color="secondary">
          {t('subtitle')}
        </Text>
        {children}
      </div>
    </main>
  );
}
