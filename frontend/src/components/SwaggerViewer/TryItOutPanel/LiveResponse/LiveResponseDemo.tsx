'use client';

import { Text } from '@gravity-ui/uikit';
import LiveResponse from './LiveResponse';
import type { HttpMethod } from '@/lib/types';

type Scenario = {
  label: string;
  request: {
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body: string | null;
  };
  response: {
    status: number;
    headers: Record<string, string>;
    body: string | null;
    error: string | null;
  };
};

const scenarios: Scenario[] = [
  {
    label: '200 GET — Pet found',
    request: {
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/1',
      headers: { accept: 'application/json' },
      body: null,
    },
    response: {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-request-id': 'abc-123' },
      body: JSON.stringify({ id: 1, name: 'doggie', status: 'available' }),
      error: null,
    },
  },
  {
    label: '201 POST — Pet created',
    request: {
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'catto', status: 'pending' }),
    },
    response: {
      status: 201,
      headers: { 'content-type': 'application/json', location: '/pet/42' },
      body: JSON.stringify({ id: 42, name: 'catto', status: 'pending' }),
      error: null,
    },
  },
  {
    label: '404 GET — Not found',
    request: {
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/99999',
      headers: { accept: 'application/json' },
      body: null,
    },
    response: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 1, type: 'error', message: 'Pet not found' }),
      error: null,
    },
  },
  {
    label: '400 POST — Validation error',
    request: {
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    },
    response: {
      status: 400,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 400, message: 'name is required' }),
      error: null,
    },
  },
  {
    label: '500 GET — Server error',
    request: {
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/store/inventory',
      headers: { accept: 'application/json' },
      body: null,
    },
    response: {
      status: 500,
      headers: { 'content-type': 'text/plain' },
      body: 'Internal Server Error\nDB connection failed',
      error: null,
    },
  },
  {
    label: 'Network error — Unreachable',
    request: {
      method: 'GET',
      url: 'https://unreachable.example.com/api',
      headers: {},
      body: null,
    },
    response: {
      status: 0,
      headers: {},
      body: null,
      error: 'fetch failed: DNS resolution failed',
    },
  },
];

export default function LiveResponseDemo() {
  return (
    <div
      style={{ maxWidth: 900, width: '100%', minWidth: 0, margin: '0 auto', padding: '40px 24px' }}
    >
      {scenarios.map((s) => (
        <div key={s.label} style={{ marginBottom: 32 }}>
          <Text variant="header-1" as="h3" style={{ margin: '0 0 12px' }}>
            {s.label}
          </Text>
          <LiveResponse request={s.request} response={s.response} />
        </div>
      ))}
    </div>
  );
}
