import { SchemaBlock } from '../SchemaBlock';
import TryItOutPanel from '../TryItOutPanel';
import type { OpenApiMediaType, OpenApiParameter, SwaggerEndpoint } from '../types';
import { groupParametersByLocation } from '../utils';
import styles from './EndpointDetails.module.css';

type EndpointDetailsProps = {
  endpoint: SwaggerEndpoint;
  baseUrl: string;
};

function renderMediaTypeBlocks(content: Record<string, OpenApiMediaType> | undefined) {
  if (!content) {
    return <p className={styles.emptyText}>No content schema provided.</p>;
  }

  return Object.entries(content).map(([contentType, mediaType]) => (
    <div className={styles.mediaType} key={contentType}>
      <span className={styles.contentType}>{contentType}</span>
      <SchemaBlock title="Schema" value={mediaType.schema} />
      <SchemaBlock title="Example" value={mediaType.example} />
      <SchemaBlock title="Examples" value={mediaType.examples} />
    </div>
  ));
}

function ParameterTable({ parameters }: { parameters: OpenApiParameter[] }) {
  if (parameters.length === 0) {
    return <p className={styles.emptyText}>No parameters.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Required</th>
            <th>Schema</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {parameters.map((parameter) => (
            <tr key={`${parameter.in}-${parameter.name}`}>
              <td>{parameter.name || '-'}</td>
              <td>{parameter.required ? 'Yes' : 'No'}</td>
              <td>
                <code>{parameter.schema ? JSON.stringify(parameter.schema) : '-'}</code>
              </td>
              <td>{parameter.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EndpointDetails({ endpoint, baseUrl }: EndpointDetailsProps) {
  const groupedParameters = groupParametersByLocation(endpoint.parameters);
  const responseEntries = Object.entries(endpoint.responses);

  return (
    <div className={styles.details}>
      {endpoint.description && <p className={styles.description}>{endpoint.description}</p>}

      <section className={styles.section}>
        <h3>Parameters</h3>

        <div className={styles.parameterGroups}>
          {groupedParameters.map(({ location, parameters }) => (
            <div className={styles.parameterGroup} key={location}>
              <h4>{location}</h4>
              <ParameterTable parameters={parameters} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3>Request body</h3>

        {endpoint.requestBody ? (
          <div className={styles.requestBody}>
            {endpoint.requestBody.description && <p>{endpoint.requestBody.description}</p>}
            {endpoint.requestBody.required && <span className={styles.required}>Required</span>}
            {renderMediaTypeBlocks(endpoint.requestBody.content)}
          </div>
        ) : (
          <p className={styles.emptyText}>No request body.</p>
        )}
      </section>

      <section className={styles.section}>
        <h3>Responses</h3>

        {responseEntries.length > 0 ? (
          <div className={styles.responses}>
            {responseEntries.map(([statusCode, response]) => (
              <article className={styles.responseCard} key={statusCode}>
                <div className={styles.responseHeader}>
                  <span className={styles.statusCode}>{statusCode}</span>
                  <p>{response.description || 'No description.'}</p>
                </div>

                {renderMediaTypeBlocks(response.content)}
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>No responses documented.</p>
        )}
      </section>

      <TryItOutPanel key={`${baseUrl}-${endpoint.id}`} endpoint={endpoint} baseUrl={baseUrl} />
    </div>
  );
}
