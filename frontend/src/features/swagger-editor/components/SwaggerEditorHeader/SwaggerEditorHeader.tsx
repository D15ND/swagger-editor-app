'use client';

import { useState } from 'react';
import { Button } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';

import type { SchemaFormat } from '../../types';
import styles from '../SwaggerEditor/swagger-editor.module.css';

type SwaggerEditorHeaderProps = {
  format: SchemaFormat;
  isValid: boolean;
  canSave: boolean;
  onConvert: () => void;
  onSave: () => Promise<void>;
};

export function SwaggerEditorHeader({
  format,
  isValid,
  canSave,
  onConvert,
  onSave,
}: SwaggerEditorHeaderProps) {
  const { t } = useT('swaggerEditor');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  const convertButtonText =
    format === 'json' ? t('actions.convertToYaml') : t('actions.convertToJson');

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);
    try {
      await onSave();
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.fileInfo}>
        <span className={styles.formatBadge}>
          {format === 'json' ? t('format.json') : t('format.yaml')}
        </span>

        <span className={styles.fileName}>
          {t('fileName')}.{format === 'json' ? 'json' : 'yaml'}
        </span>
      </div>

      <div className={styles.actions}>
        <span className={isValid ? styles.validStatus : styles.invalidStatus}>
          {isValid ? t('status.valid') : t('status.invalid')}
        </span>

        <Button view="outlined" size="m" disabled={!isValid} onClick={onConvert}>
          {convertButtonText}
        </Button>

        {canSave && (
          <>
            <Button view="outlined" size="m" loading={saving} onClick={handleSave}>
              {t('actions.save')}
            </Button>

            {saveStatus === 'success' && (
              <span className={styles.saveSuccess}>{t('save.success')}</span>
            )}

            {saveStatus === 'error' && <span className={styles.saveError}>{t('save.error')}</span>}
          </>
        )}
      </div>
    </div>
  );
}
