import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DEFAULT_SCHEMA } from '../constants';
import { SwaggerEditor } from './SwaggerEditor';

vi.mock('@gravity-ui/uikit', () => ({
  Button: ({
    children,
    disabled,
    onClick,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
  }) => (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'format.json': 'JSON',
        'format.yaml': 'YAML',
        fileName: 'schema',
        'status.valid': 'Valid schema',
        'status.invalid': 'Invalid schema',
        'actions.convertToJson': 'Convert to JSON',
        'actions.convertToYaml': 'Convert to YAML',
        'errors.title': 'Validation errors',
        'errors.invalidSchema': 'Invalid schema.',
        'errors.cannotConvert': 'Cannot convert invalid schema.',
        'aria.editor': 'OpenAPI schema editor',
      };

      return translations[key] ?? key;
    },
  }),
}));

describe('SwaggerEditor', () => {
  it('renders editor with format, filename and valid status', () => {
    render(<SwaggerEditor source={DEFAULT_SCHEMA} format="json" errors={[]} onChange={vi.fn()} />);

    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('schema.json')).toBeInTheDocument();
    expect(screen.getByText('Valid schema')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: 'OpenAPI schema editor',
      }),
    ).toBeInTheDocument();
  });

  it('renders validation errors', () => {
    render(
      <SwaggerEditor
        source="{}"
        format="json"
        errors={['Schema must contain "paths" object.']}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Invalid schema')).toBeInTheDocument();
    expect(screen.getByText('Validation errors')).toBeInTheDocument();
    expect(screen.getByText('Schema must contain "paths" object.')).toBeInTheDocument();
  });

  it('calls onChange with valid document after editing schema', () => {
    const onChange = vi.fn();

    const yamlSource = `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
paths: {}
`;

    render(<SwaggerEditor source={DEFAULT_SCHEMA} format="json" errors={[]} onChange={onChange} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'OpenAPI schema editor',
      }),
      {
        target: {
          value: yamlSource,
        },
      },
    );

    expect(onChange).toHaveBeenCalledWith({
      source: yamlSource,
      format: 'yaml',
      document: {
        openapi: '3.0.0',
        info: {
          title: 'Test API',
          version: '1.0.0',
        },
        paths: {},
      },
      errors: [],
    });
  });

  it('calls onChange with errors after editing invalid schema', () => {
    const onChange = vi.fn();

    render(<SwaggerEditor source={DEFAULT_SCHEMA} format="json" errors={[]} onChange={onChange} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'OpenAPI schema editor',
      }),
      {
        target: {
          value: '{}',
        },
      },
    );

    expect(onChange).toHaveBeenCalledWith({
      source: '{}',
      format: 'json',
      document: null,
      errors: [
        'Schema must contain "openapi" or "swagger" version.',
        'Schema must contain "info" object.',
        'Schema must contain "paths" object.',
      ],
    });
  });

  it('converts JSON schema to YAML', () => {
    const onChange = vi.fn();

    render(<SwaggerEditor source={DEFAULT_SCHEMA} format="json" errors={[]} onChange={onChange} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Convert to YAML',
      }),
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        format: 'yaml',
        errors: [],
      }),
    );

    expect(onChange.mock.calls[0][0].source).toContain('openapi: 3.0.0');
    expect(onChange.mock.calls[0][0].source).toContain('title: Sample Pet Store App');
  });

  it('disables convert button when schema is invalid', () => {
    render(
      <SwaggerEditor
        source="{}"
        format="json"
        errors={['Schema must contain "paths" object.']}
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Convert to YAML',
      }),
    ).toBeDisabled();
  });
});
