'use client';

import { useState } from 'react';

import { useT } from 'next-i18next/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotify } from '@/hooks/useNotify';
import { DEFAULT_SCHEMA } from '../../constants';
import type { SchemaState } from '../../types';
import {
  convertSchemaFormat,
  getNextSchemaFormat,
  parseSchema,
  parseSchemaState,
} from '../../utils';
import { validateOpenApiDocument } from '../../validation';
import { ErrorBox } from '../ErrorBox';
import { SwaggerEditorHeader } from '../SwaggerEditorHeader';
import styles from '../SwaggerEditor/swagger-editor.module.css';
import { SwaggerEditor } from '../SwaggerEditor';

type SwaggerEditorContainerProps = {
  initialSchema?: string;
};

export function SwaggerEditorContainer({ initialSchema }: SwaggerEditorContainerProps) {
  const { t } = useT('swaggerEditor');
  const { user } = useAuth();
  const { success, error } = useNotify();
  const [schemaState, setSchemaState] = useState<SchemaState>(() =>
    parseSchemaState(initialSchema ?? DEFAULT_SCHEMA),
  );

  function handleChange(value: string) {
    setSchemaState(parseSchemaState(value));
  }

  function handleConvert() {
    const { source, format } = schemaState;

    try {
      const document = parseSchema(source);
      const validationErrors = validateOpenApiDocument(document);

      if (validationErrors.length > 0) {
        setSchemaState({ source, format, document: null, errors: validationErrors });
        return;
      }

      const nextFormat = getNextSchemaFormat(format);
      const convertedSource = convertSchemaFormat(document, nextFormat);

      setSchemaState({ source: convertedSource, format: nextFormat, document, errors: [] });
    } catch (error) {
      setSchemaState({
        source,
        format,
        document: null,
        errors: [error instanceof Error ? error.message : t('errors.cannotConvert')],
      });
    }
  }

  async function handleSave() {
    try {
      const response = await fetch('/api/schema', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: schemaState.source }),
      });

      if (!response.ok) throw new Error('save failed');

      success(t('save.success'));
    } catch {
      error(t('save.error'));
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.editorPanel}>
        <SwaggerEditorHeader
          format={schemaState.format}
          isValid={schemaState.errors.length === 0}
          canSave={!!user}
          onConvert={handleConvert}
          onSave={handleSave}
        />

        <SwaggerEditor
          source={schemaState.source}
          format={schemaState.format}
          onChange={handleChange}
        />

        <ErrorBox errors={schemaState.errors} />
      </section>
    </main>
  );
}
