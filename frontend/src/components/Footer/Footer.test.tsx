import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

vi.mock('next-i18next/server', () => ({
  getT: () =>
    Promise.resolve({
      t: (key: string) => {
        const map: Record<string, string> = {
          'nav.about': 'About',
        };
        return map[key] || key;
      },
      lng: 'en',
    }),
}));

type MenuItem = {
  text: string;
  href: string;
};

vi.mock('./FooterClient', () => ({
  default: ({ menuItems, copyright }: { menuItems: MenuItem[]; copyright: string }) => (
    <footer data-testid="footer">
      <span>{copyright}</span>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
      </ul>
    </footer>
  ),
}));

describe('Footer', () => {
  it('renders copyright text', async () => {
    render(await Footer());

    expect(screen.getByText('\u00A9 2026 Swagger Editor App.')).toBeInTheDocument();
  });

  it('renders RS School external link', async () => {
    render(await Footer());

    const rsLink = screen.getByText('RS School');
    expect(rsLink).toBeInTheDocument();
    expect(rsLink.closest('a')).toHaveAttribute('href', 'https://rs.school/');
  });

  it('renders About link with current locale', async () => {
    render(await Footer());

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/en/about');
  });
});
