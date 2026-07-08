'use client';

import { useState } from 'react';

import { DEFAULT_SCHEMA } from '../constants';
import type { SchemaState } from '../types';
import { parseSchemaState } from '../utils';
import { SwaggerEditor } from './SwaggerEditor';

export function SwaggerEditorContainer() {
  const [schemaState, setSchemaState] = useState<SchemaState>(() =>
    parseSchemaState(DEFAULT_SCHEMA),
  );

  return (
    <SwaggerEditor
      source={schemaState.source}
      format={schemaState.format}
      errors={schemaState.errors}
      onChange={setSchemaState}
    />
  );
}
