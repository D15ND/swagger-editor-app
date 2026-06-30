import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FooterClient from './FooterClient';

type MenuItem = {
  text: string;
  href: string;
  target?: string;
  rel?: string;
};

const menuItems: MenuItem[] = [
  { text: 'RS School', href: 'https://rs.school/', target: '_blank', rel: 'noreferrer' },
  { text: 'About', href: '/en/about' },
];

type GravityFooterProps = {
  menuItems: MenuItem[];
  copyright: string;
  className?: string;
};

vi.mock('@gravity-ui/uikit', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@gravity-ui/navigation', () => ({
  Footer: ({ menuItems, copyright, className }: GravityFooterProps) => (
    <footer data-testid="gravity-footer" className={className}>
      <span data-testid="copyright">{copyright}</span>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} target={item.target} rel={item.rel}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  ),
  MobileFooter: ({ menuItems, copyright, className }: GravityFooterProps) => (
    <footer data-testid="mobile-footer" className={className}>
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

describe('FooterClient', () => {
  it('renders copyright text', () => {
    render(<FooterClient menuItems={menuItems} copyright="\u00A9 2026 Test" />);

    expect(screen.getByTestId('copyright')).toHaveTextContent('2026 Test');
  });

  it('renders both desktop and mobile footers', () => {
    render(<FooterClient menuItems={menuItems} copyright="\u00A9 2026 Test" />);

    expect(screen.getByTestId('gravity-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-footer')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(<FooterClient menuItems={menuItems} copyright="\u00A9 2026 Test" />);

    expect(screen.getAllByText('RS School')).toHaveLength(2);
    expect(screen.getAllByText('About')).toHaveLength(2);
  });

  it('renders empty menu items without crashing', () => {
    render(<FooterClient menuItems={[]} copyright="\u00A9 2026 Test" />);

    expect(screen.getByTestId('gravity-footer')).toBeInTheDocument();
  });
});
