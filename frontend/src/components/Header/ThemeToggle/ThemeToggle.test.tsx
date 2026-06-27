import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

const mockUseTheme = vi.fn();
vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
}));

describe('ThemeToggle', () => {
  const toggleTheme = vi.fn();

  it('renders a button', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme });

    render(<ThemeToggle />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls toggleTheme on click', async () => {
    const user = userEvent.setup();
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme });

    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(toggleTheme).toHaveBeenCalledOnce();
  });
});
