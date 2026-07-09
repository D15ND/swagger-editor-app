import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SwaggerEditor } from './SwaggerEditor';

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'aria.editor': 'OpenAPI schema editor',
      };

      return translations[key] ?? key;
    },
  }),
}));

describe('SwaggerEditor', () => {
  it('renders textarea with source', () => {
    render(<SwaggerEditor source='{"openapi": "3.0.0"}' format="json" onChange={vi.fn()} />);

    expect(
      screen.getByRole('textbox', {
        name: 'OpenAPI schema editor',
      }),
    ).toHaveValue('{"openapi": "3.0.0"}');
  });

  it('calls onChange with new value', () => {
    const onChange = vi.fn();

    render(<SwaggerEditor source="" format="json" onChange={onChange} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'OpenAPI schema editor',
      }),
      {
        target: {
          value: 'new value',
        },
      },
    );

    expect(onChange).toHaveBeenCalledWith('new value');
  });
});
