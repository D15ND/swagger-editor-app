import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyState from './EmptyState';

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        emptyTitle: 'No requests yet',
        emptyHint: 'Open an API specification and use Try-It-Out to execute your first request.',
        goToEditor: 'Go to Editor',
      };
      return map[key] || key;
    },
  }),
}));

vi.mock('next/navigation', () => ({
  useParams: () => ({ lng: 'en' }),
}));

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@gravity-ui/uikit', () => ({
  Card: ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string; view?: string; size?: string }>) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Flex: ({
    children,
    className,
  }: React.PropsWithChildren<{
    className?: string;
    direction?: string;
    alignItems?: string;
    gap?: string;
  }>) => (
    <div data-testid="flex" className={className}>
      {children}
    </div>
  ),
  Text: ({
    children,
    className,
  }: React.PropsWithChildren<{ variant?: string; as?: string; className?: string }>) => (
    <span className={className}>{children}</span>
  ),
  Button: ({ children, view, size }: React.PropsWithChildren<{ view?: string; size?: string }>) => (
    <button data-view={view} data-size={size}>
      {children}
    </button>
  ),
  Icon: (props: { data: unknown; size?: number; className?: string }) => (
    <span data-testid="icon" data-size={props.size} className={props.className} />
  ),
}));

vi.mock('@gravity-ui/icons', () => ({
  Clock: () => null,
}));

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />);

    expect(screen.getByText('No requests yet')).toBeInTheDocument();
  });

  it('renders hint text', () => {
    render(<EmptyState />);

    expect(screen.getByText(/Open an API specification/)).toBeInTheDocument();
  });

  it('renders editor button', () => {
    render(<EmptyState />);

    expect(screen.getByText('Go to Editor')).toBeInTheDocument();
  });

  it('button links to home page', () => {
    render(<EmptyState />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
