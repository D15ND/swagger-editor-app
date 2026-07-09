'use client';

import { useT } from 'next-i18next/client';
import styles from '../SwaggerEditor/swagger-editor.module.css';
import { Text } from '@gravity-ui/uikit';

type ErrorBoxProps = {
  errors: string[];
};

export function ErrorBox({ errors }: ErrorBoxProps) {
  const { t } = useT('swaggerEditor');

  if (errors.length === 0) return null;

  return (
    <div className={styles.errorBox}>
      <Text as="h2">{t('errors.title')}</Text>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
