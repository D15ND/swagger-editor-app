'use client';

import { Button, Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';

import type { OpenApiDocument, SchemaFormat } from '../types';
import {
  convertSchemaFormat,
  detectSchemaFormat,
  getNextSchemaFormat,
  parseSchema,
} from '../utils';
import { validateOpenApiDocument } from '../validation';
import styles from './swagger-editor.module.css';

type SwaggerEditorProps = {
  source: string;
  format: SchemaFormat;
  errors: string[];
  onChange: (payload: {
    source: string;
    format: SchemaFormat;
    document: OpenApiDocument | null;
    errors: string[];
  }) => void;
};

export function SwaggerEditor({ source, format, errors, onChange }: SwaggerEditorProps) {
  const { t } = useT('swaggerEditor');
  const isValid = errors.length === 0;

  function handleChange(value: string) {
    const detectedFormat = detectSchemaFormat(value);

    try {
      const document = parseSchema(value);
      const validationErrors = validateOpenApiDocument(document);

      onChange({
        source: value,
        format: detectedFormat,
        document: validationErrors.length > 0 ? null : document,
        errors: validationErrors,
      });
    } catch (error) {
      onChange({
        source: value,
        format: detectedFormat,
        document: null,
        errors: [error instanceof Error ? error.message : t('errors.invalidSchema')],
      });
    }
  }

  function handleFormatSwitch() {
    try {
      const document = parseSchema(source);
      const validationErrors = validateOpenApiDocument(document);

      if (validationErrors.length > 0) {
        onChange({
          source,
          format,
          document: null,
          errors: validationErrors,
        });

        return;
      }

      const nextFormat = getNextSchemaFormat(format);
      const convertedSource = convertSchemaFormat(document, nextFormat);

      onChange({
        source: convertedSource,
        format: nextFormat,
        document,
        errors: [],
      });
    } catch (error) {
      onChange({
        source,
        format,
        document: null,
        errors: [error instanceof Error ? error.message : t('errors.cannotConvert')],
      });
    }
  }

  const convertButtonText =
    format === 'json' ? t('actions.convertToYaml') : t('actions.convertToJson');

  return (
    <section className={styles.editorPanel}>
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

          <Button view="outlined" size="m" disabled={!isValid} onClick={handleFormatSwitch}>
            {convertButtonText}
          </Button>
        </div>
      </div>

      <textarea
        className={styles.textarea}
        value={source}
        spellCheck={false}
        aria-label={t('aria.editor')}
        onChange={(event) => handleChange(event.target.value)}
      />

      {errors.length > 0 && (
        <div className={styles.errorBox}>
          <Text as="h2">{t('errors.title')}</Text>

          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
