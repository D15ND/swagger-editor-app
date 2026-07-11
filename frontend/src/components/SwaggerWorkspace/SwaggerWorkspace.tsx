'use client';

import { useState } from 'react';
import { DEFAULT_SCHEMA } from '@/features/swagger-editor/constants';
import { SwaggerEditor } from '@/features/swagger-editor/components/SwaggerEditor';
import type { SchemaState } from '@/features/swagger-editor/types';
import { parseSchemaState } from '@/features/swagger-editor/utils';
import { SwaggerViewer } from '@/components/SwaggerViewer';

import styles from './SwaggerWorkspace.module.css';

export default function SwaggerWorkspace() {
  const [schemaState, setSchemaState] = useState<SchemaState>(() =>
    parseSchemaState(DEFAULT_SCHEMA),
  );

  const document = schemaState.errors.length === 0 ? schemaState.document : null;

  return (
    <main className={styles.workspace}>
      <section className={styles.editorPane}>
        <SwaggerEditor
          source={schemaState.source}
          format={schemaState.format}
          errors={schemaState.errors}
          onChange={setSchemaState}
        />
      </section>

      <section className={styles.viewerPane}>
        <SwaggerViewer document={document} />
      </section>
    </main>
  );
}
