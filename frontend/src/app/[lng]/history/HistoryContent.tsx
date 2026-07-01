'use client';

import { useState } from 'react';
import { useT } from 'next-i18next/client';
import type { HistoryEntry } from '@/lib/history';
import HistoryTable from '@/components/History/HistoryTable';
import styles from './history.module.css';

const MOCK_ENTRIES: HistoryEntry[] = [
  {
    id: '1',
    method: 'GET',
    url: 'https://api.example.com/pets',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 200,
    responseBody: null,
    responseHeaders: {},
    duration: 120,
    requestSize: 0,
    responseSize: 1228,
    error: null,
    timestamp: Date.now() - 120000,
  },
  {
    id: '2',
    method: 'POST',
    url: 'https://api.example.com/pets',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 201,
    responseBody: null,
    responseHeaders: {},
    duration: 250,
    requestSize: 0,
    responseSize: 340,
    error: null,
    timestamp: Date.now() - 900000,
  },
  {
    id: '3',
    method: 'GET',
    url: 'https://api.example.com/pets/999',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 404,
    responseBody: null,
    responseHeaders: {},
    duration: 45,
    requestSize: 0,
    responseSize: 120,
    error: 'Not Found',
    timestamp: Date.now() - 3600000,
  },
  {
    id: '4',
    method: 'PUT',
    url: 'https://api.example.com/users/42',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 200,
    responseBody: null,
    responseHeaders: {},
    duration: 87,
    requestSize: 0,
    responseSize: 156,
    error: null,
    timestamp: Date.now() - 7200000,
  },
  {
    id: '5',
    method: 'DELETE',
    url: 'https://api.example.com/users/42',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 204,
    responseBody: null,
    responseHeaders: {},
    duration: 310,
    requestSize: 0,
    responseSize: 0,
    error: null,
    timestamp: Date.now() - 14400000,
  },
  {
    id: '6',
    method: 'PATCH',
    url: 'https://api.example.com/users/42/status',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 200,
    responseBody: null,
    responseHeaders: {},
    duration: 93,
    requestSize: 0,
    responseSize: 210,
    error: null,
    timestamp: Date.now() - 28800000,
  },
  {
    id: '7',
    method: 'POST',
    url: 'https://api.example.com/pets/1/photos',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 500,
    responseBody: null,
    responseHeaders: {},
    duration: 4500,
    requestSize: 0,
    responseSize: 89,
    error: 'Internal Server Error',
    timestamp: Date.now() - 43200000,
  },
  {
    id: '8',
    method: 'GET',
    url: 'https://api.example.com/users',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 200,
    responseBody: null,
    responseHeaders: {},
    duration: 205,
    requestSize: 0,
    responseSize: 4100,
    error: null,
    timestamp: Date.now() - 86400000,
  },
  {
    id: '9',
    method: 'POST',
    url: 'https://api.example.com/auth/login',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 401,
    responseBody: null,
    responseHeaders: {},
    duration: 32,
    requestSize: 0,
    responseSize: 64,
    error: 'Unauthorized',
    timestamp: Date.now() - 172800000,
  },
  {
    id: '10',
    method: 'PATCH',
    url: 'https://api.example.com/pets/3',
    requestBody: null,
    requestHeaders: {},
    responseStatus: 403,
    responseBody: null,
    responseHeaders: {},
    duration: 15,
    requestSize: 0,
    responseSize: 48,
    error: 'Forbidden',
    timestamp: Date.now() - 345600000,
  },
];

export default function HistoryContent() {
  const [entries] = useState<HistoryEntry[]>(MOCK_ENTRIES);
  const { t } = useT('common');

  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t('nav.history')}</h1>
        <HistoryTable entries={entries} />
      </div>
    </main>
  );
}
