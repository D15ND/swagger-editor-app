import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const mockUseLocaleSwitch = vi.fn();
vi.mock('@/hooks/useLocaleSwitch', () => ({
  useLocaleSwitch: () => mockUseLocaleSwitch(),
}));

describe('LanguageSwitcher', () => {
  it('renders a link', () => {
    mockUseLocaleSwitch.mockReturnValue({
      current: 'en',
      next: () => 'ru',
      href: () => '/ru/test',
    });

    render(<LanguageSwitcher />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('shows locale label after hydration', () => {
    mockUseLocaleSwitch.mockReturnValue({
      current: 'en',
      next: () => 'ru',
      href: () => '/ru/test',
    });

    render(<LanguageSwitcher />);

    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('link points to next locale', () => {
    mockUseLocaleSwitch.mockReturnValue({
      current: 'en',
      next: () => 'ru',
      href: (locale: string) => (locale === 'ru' ? '/ru/test' : '/en/test'),
    });

    render(<LanguageSwitcher />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/ru/test');
  });
});
