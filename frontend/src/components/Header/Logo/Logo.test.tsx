import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Logo from './Logo';

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('Logo', () => {
  it('renders full logo with link and text', () => {
    render(<Logo />);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Swagger Editor')).toBeInTheDocument();
  });

  it('renders compact logo without text', () => {
    render(<Logo compact />);

    expect(screen.queryByText('Swagger Editor')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('uses custom href', () => {
    render(<Logo href="/custom" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/custom');
  });

  it('applies className', () => {
    render(<Logo className="extra" />);

    expect(screen.getByRole('link').className).toContain('extra');
  });
});
