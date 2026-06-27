import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => ({ lng: 'en' }),
}));

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const mockUseTheme = vi.fn();
vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
}));

const mockUseLocaleSwitch = vi.fn();
vi.mock('@/hooks/useLocaleSwitch', () => ({
  useLocaleSwitch: () => mockUseLocaleSwitch(),
}));

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme: vi.fn() });
    mockUseLocaleSwitch.mockReturnValue({
      current: 'en', next: () => 'ru', href: (l: string) => `/${l}/current-path`,
    });
  });

  it('renders Logo', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /swagger editor/i })).toBeInTheDocument();
  });

  it('shows History link for authenticated user', () => {
    render(<Header />);

    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('shows About link', () => {
    render(<Header />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();

    render(<Header />);

    expect(screen.getAllByText('History').length).toBe(1);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });

    await user.click(toggle);

    expect(screen.getAllByText('History').length).toBe(2);
    expect(screen.getAllByText('About').length).toBe(2);

    await user.click(toggle);

    expect(screen.getAllByText('History').length).toBe(1);
  });
});
