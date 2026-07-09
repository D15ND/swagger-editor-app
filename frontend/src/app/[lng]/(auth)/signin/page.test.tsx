import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignInPage from './page';

vi.mock('next-i18next/server', () => ({
  getT: async () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'signin.title': 'Welcome back',
        'signin.description': 'Enter your credentials to access your saved schemas.',
        'signin.submit': 'Sign In',
        email: 'email',
        password: 'password',
        enterPassword: 'Enter password',
        emailError: 'Please enter a valid email address',
        passError: 'Password is required',
        emailPlaceholder: 'your@email.com',
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock('next-i18next/client', () => ({
  useT: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'signin.title': 'Welcome back',
        'signin.description': 'Enter your credentials to access your saved schemas.',
        'signin.submit': 'Sign In',
        email: 'email',
        password: 'password',
        enterPassword: 'Enter password',
        emailError: 'Please enter a valid email address',
        passError: 'Password is required',
        emailPlaceholder: 'your@email.com',
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => null,
}));

describe('SignInPage', () => {
  it('renders the auth form for the sign-in route', async () => {
    render(await SignInPage({ params: Promise.resolve({ lng: 'en' }) }));

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});
