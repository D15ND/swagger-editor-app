import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AuthButtons from './AuthButtons';

describe('AuthButtons', () => {
  it('renders Sign Out when user is logged in', () => {
    render(<AuthButtons user go={vi.fn()} />);

    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
  });

  it('renders Sign In and Sign Up when user is not logged in', () => {
    render(<AuthButtons go={vi.fn()} />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();
  });

  it('calls go with /signin on Sign In click', async () => {
    const user = userEvent.setup();
    const go = vi.fn();

    render(<AuthButtons go={go} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(go).toHaveBeenCalledWith('/signin');
  });

  it('calls go with /signup on Sign Up click', async () => {
    const user = userEvent.setup();
    const go = vi.fn();

    render(<AuthButtons go={go} />);

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(go).toHaveBeenCalledWith('/signup');
  });
});
