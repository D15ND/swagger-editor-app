'use client';

import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { DEFAULT_SCHEMA } from '../constants';
import type { SchemaState } from '../types';
import { parseSchemaState } from '../utils';
import { SwaggerEditor } from './SwaggerEditor';

type SwaggerEditorContainerProps = {
  initialSchema?: string;
};

export function SwaggerEditorContainer({ initialSchema }: SwaggerEditorContainerProps) {
  const { user } = useAuth();
  const [schemaState, setSchemaState] = useState<SchemaState>(() =>
    parseSchemaState(initialSchema ?? DEFAULT_SCHEMA),
  );
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  async function handleSave() {
    try {
      const response = await fetch('/api/schema', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: schemaState.source }),
      });

      if (!response.ok) throw new Error('Failed to save');

      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  }

  return (
    <SwaggerEditor
      source={schemaState.source}
      format={schemaState.format}
      errors={schemaState.errors}
      canSave={!!user}
      saveStatus={saveStatus}
      onChange={setSchemaState}
      onSave={handleSave}
    />
  );
}
