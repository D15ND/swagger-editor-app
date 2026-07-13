import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@gravity-ui/uikit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'nav.history': 'History',
        'nav.about': 'About',
      };
      return map[key] || key;
    },
  }),
}));

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children, component: _component, ...rest }: Record<string, unknown>) => (
    <a href={href as string} {...rest}>
      {children as React.ReactNode}
    </a>
  ),
}));

vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

const mockUseLocaleSwitch = vi.fn();
vi.mock('@/hooks/useLocaleSwitch', () => ({
  useLocaleSwitch: () => mockUseLocaleSwitch(),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@test.com' },
    signOut: vi.fn(),
  }),
}));

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme="light">{ui}</ThemeProvider>);
}

describe('Header', () => {
  beforeEach(() => {
    mockUseLocaleSwitch.mockReturnValue({
      current: 'en',
      next: () => 'ru',
      href: (l: string) => `/${l}/current-path`,
    });
  });

  it('renders Logo', () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole('link', { name: /swagger editor/i })).toBeInTheDocument();
  });

  it('shows History link for authenticated user', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('shows About link', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();

    renderWithTheme(<Header />);

    expect(screen.getAllByText('History').length).toBe(1);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });

    await user.click(toggle);

    expect(screen.getAllByText('History').length).toBe(2);
    expect(screen.getAllByText('About').length).toBe(2);

    await user.click(toggle);

    await waitFor(() => {
      expect(screen.getAllByText('History').length).toBe(1);
    });
  });
});
