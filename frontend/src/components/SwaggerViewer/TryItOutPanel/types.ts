import type { HttpMethod } from '@/lib/types';

export type ProxyResponse = {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  error: string | null;
};

export type RequestState = {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body: string | null;
};
