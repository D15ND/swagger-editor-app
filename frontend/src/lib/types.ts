export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export type HistoryCreate = {
  method: string;
  url: string;
  endpoint: string;
  status: number;
  duration: number;
  request_size: number;
  response_size: number;
  error?: string | null;
};
