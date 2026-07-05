import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthButtons from './AuthButtons';

vi.mock('@/components/LocalizedLink', () => ({
  default: ({ href, children, component: _component, ...rest }: Record<string, unknown>) => (
    <a href={href as string} {...rest}>
      {children as React.ReactNode}
    </a>
  ),
}));

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
  it('renders Sign Out button when user is logged in', () => {
    render(<AuthButtons isAuth signOut={noop} />);

    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('renders Sign In and Sign Up when user is not logged in', () => {
    render(<AuthButtons isAuth={false} signOut={noop} />);

    // Gravity UI Button with component renders <a role="button">
    const signIn = screen.getByRole('button', { name: /sign in/i });
    const signUp = screen.getByRole('button', { name: /sign up/i });

    expect(signIn).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();

    // href подтверждает, что это ссылка в DOM
    expect(signIn).toHaveAttribute('href', '/signin');
    expect(signUp).toHaveAttribute('href', '/signup');
  });
});
