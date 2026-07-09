'use client';

import { useT } from 'next-i18next/client';
import styles from '../SwaggerEditor/swagger-editor.module.css';

type ErrorBoxProps = {
  errors: string[];
};

export function ErrorBox({ errors }: ErrorBoxProps) {
  const { t } = useT('swaggerEditor');

  if (errors.length === 0) return null;

  return (
    <div className={styles.errorBox}>
      <h2>{t('errors.title')}</h2>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
