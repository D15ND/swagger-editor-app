import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignInPage from './page';

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Welcome back',
        description: 'Enter your credentials to access your saved schemas.',
        email: 'email',
        password: 'password',
        signIn: 'Sign In',
        enterPassword: 'Enter password',
        emailError: 'Please enter a valid email address',
        passError: 'Password is required',
      };

      return translations[key] ?? key;
    },
  }),
}));

describe('SignInPage', () => {
  it('renders the auth form for the sign-in route', async () => {
    render(await SignInPage());

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});
