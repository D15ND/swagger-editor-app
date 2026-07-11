import { generateCurlCommand } from '@/lib/generate-curl';
import CodeBlockCard from './CodeBlockCard';
import ServerResponse from './ServerResponse';
import styles from './LiveResponse.module.css';
import type { ProxyResponse, RequestState } from '../types';

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
  request: RequestState;
  response: ProxyResponse;
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
