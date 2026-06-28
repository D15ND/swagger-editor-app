import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import NotFoundPage from './not-found';

const backMock = vi.fn();

const translations: Record<string, string> = {
  title: '404',
  subtitle: 'Страница не найдена',
  description:
    'Упс! Страница, которую вы ищете, не существует или была перемещена. Вернёмся назад.',
  goBack: 'Назад',
  backHome: 'На главную',
};

vi.mock('@gravity-ui/uikit', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backMock,
  }),
  useParams: () => ({
    lng: 'ru',
  }),
}));

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => translations[key] ?? key,
  }),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    backMock.mockClear();
  });

  it('renders localized not found content', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '404',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Страница не найдена',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Упс! Страница, которую вы ищете, не существует или была перемещена. Вернёмся назад.',
      ),
    ).toBeInTheDocument();
  });

  it('calls router back when go back button is clicked', () => {
    render(<NotFoundPage />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /назад/i,
      }),
    );

    expect(backMock).toHaveBeenCalledTimes(1);
  });

  it('renders home link with current locale', () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', {
      name: /на главную/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/ru');
  });
});
