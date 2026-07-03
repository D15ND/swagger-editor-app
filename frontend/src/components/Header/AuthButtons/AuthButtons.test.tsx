import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AuthButtons from './AuthButtons';

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'nav.signOut': 'Sign Out',
        'nav.signIn': 'Sign In',
        'nav.signUp': 'Sign Up',
      };
      return map[key] || key;
    },
  }),
}));

const noop = vi.fn();

describe('AuthButtons', () => {
  it('renders Sign Out when user is logged in', () => {
    render(<AuthButtons isAuth go={noop} signOut={noop} />);

    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
  });

  it('renders Sign In and Sign Up when user is not logged in', () => {
    render(<AuthButtons isAuth={false} go={noop} signOut={noop} />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();
  });

  it('calls go with /signin on Sign In click', async () => {
    const user = userEvent.setup();
    const go = vi.fn();

    render(<AuthButtons isAuth={false} go={go} signOut={noop} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(go).toHaveBeenCalledWith('/signin');
  });

  it('calls go with /signup on Sign Up click', async () => {
    const user = userEvent.setup();
    const go = vi.fn();

    render(<AuthButtons isAuth={false} go={go} signOut={noop} />);

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(go).toHaveBeenCalledWith('/signup');
  });
});
