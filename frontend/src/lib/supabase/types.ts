export type LogRow = {
  duration: number;
  endpoint: string;
  error: string | null;
  id: string;
  method: string;
  request_size: number;
  response_size: number;
  status: number;
  timestamp: string;
  url: string;
  user_id: string;
};

export type LogInsert = {
  duration: number;
  endpoint: string;
  error?: string | null;
  id?: string;
  method: string;
  request_size: number;
  response_size: number;
  status: number;
  timestamp?: string;
  url: string;
  user_id: string;
};
