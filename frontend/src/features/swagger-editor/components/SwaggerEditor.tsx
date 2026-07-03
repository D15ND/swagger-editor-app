'use client';

import { Button } from '@gravity-ui/uikit';

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
        errors: [error instanceof Error ? error.message : 'Invalid schema.'],
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
        errors: [error instanceof Error ? error.message : 'Cannot convert invalid schema.'],
      });
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.editorPanel}>
        <div className={styles.toolbar}>
          <div className={styles.fileInfo}>
            <span className={styles.formatBadge}>{format.toUpperCase()}</span>
            <span className={styles.fileName}>schema.{format === 'json' ? 'json' : 'yaml'}</span>
          </div>

          <div className={styles.actions}>
            <span className={isValid ? styles.validStatus : styles.invalidStatus}>
              {isValid ? 'Valid schema' : 'Invalid schema'}
            </span>

            <Button view="outlined" size="m" disabled={!isValid} onClick={handleFormatSwitch}>
              Convert to {format === 'json' ? 'YAML' : 'JSON'}
            </Button>
          </div>
        </div>

        <textarea
          className={styles.textarea}
          value={source}
          spellCheck={false}
          aria-label="OpenAPI schema editor"
          onChange={(event) => handleChange(event.target.value)}
        />

        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <h2>Validation errors</h2>

            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
