import { generateCurlCommand } from '@/lib/generate-curl';
import type { HttpMethod } from '@/lib/types';
import CodeBlockCard from './CodeBlockCard';
import ServerResponse from './ServerResponse';
import styles from './LiveResponse.module.css';

function formatResponseBody(body: string | null, contentType: string): string {
  if (body === null) return '';
  if (contentType.includes('json')) {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      return `can't parse JSON. Raw result:\n${body}`;
    }
  }
  return body;
}

type LiveResponseProps = {
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

export default function LiveResponse({ request, response }: LiveResponseProps) {
  const curlCommand = generateCurlCommand(
    request.method,
    request.url,
    request.headers,
    request.body,
  );

  const contentType = response.headers['content-type'] ?? '';
  const responseBody = formatResponseBody(response.body, contentType);

  return (
    <div className={styles.wrapper}>
      <CodeBlockCard title="cURL" code={curlCommand} />
      <CodeBlockCard title="Request URL" code={request.url} />
      <ServerResponse
        status={response.status}
        body={responseBody}
        headers={response.headers}
        error={response.error}
      />
    </div>
  );
}
