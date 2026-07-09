'use client';

import { useT } from 'next-i18next/client';

import type { SchemaFormat } from '../types';
import styles from './swagger-editor.module.css';

type SwaggerEditorProps = {
  source: string;
  format: SchemaFormat;
  errors: string[];
  onChange: (value: string) => void;
};

export function SwaggerEditor({ source, errors, onChange }: SwaggerEditorProps) {
  const { t } = useT('swaggerEditor');

  return (
    <textarea
      className={styles.textarea}
      value={source}
      spellCheck={false}
      aria-label={t('aria.editor')}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
