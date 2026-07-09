import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NotFoundPage from './not-found';

vi.mock('next-i18next/server', () => ({
  getT: vi.fn(async () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: '404',
        subtitle: 'Page not found',
        description: 'Oops! The page you are looking for does not exist or has been moved.',
        goBack: 'Go Back',
        backHome: 'Back to Home',
      };

      return translations[key] ?? key;
    },
  })),
}));

vi.mock('@/components/GoBackButton', () => ({
  GoBackButton: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
}));

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock(import('@gravity-ui/icons'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    FileQuestion: () => <span data-testid="file-question-icon" />,
    House: () => <span data-testid="home-icon" />,
  };
});

describe('NotFoundPage', () => {
  it('renders not found content', async () => {
    render(await NotFoundPage());

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '404',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Page not found',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Oops! The page you are looking for does not exist or has been moved.'),
    ).toBeInTheDocument();
  });

  it('renders navigation actions', async () => {
    render(await NotFoundPage());

    expect(
      screen.getByRole('button', {
        name: /go back/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /back to home/i,
      }),
    ).toHaveAttribute('href', '/');
  });
});
