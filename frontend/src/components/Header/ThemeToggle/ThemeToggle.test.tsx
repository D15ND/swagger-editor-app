import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

const mockToggleTheme = vi.fn();
vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: mockToggleTheme }),
}));

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls toggleTheme on click', async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });
});
