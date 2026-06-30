# Swagger Editor App

> [RS School](https://rs.school/) React course final project — web-based Swagger/OpenAPI UI with REST client.

[Task: Swagger/OpenAPI UI](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

## About

Online editor for designing, editing, and testing APIs via OpenAPI specifications. Designed to support YAML/JSON schema editing, live viewer, endpoint execution ("Try-It-Out"), request history & analytics, and i18n.

Built by a team of 3 as the final project of the Rolling Scopes School React course. Currently in active development — features are being added incrementally.

## Deploy

App deployed on Vercel: [swagger-editor-app.vercel.app](https://swagger-editor-app.vercel.app)

> Link will be updated once deployed.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 16.2.9 (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/) 19.2.4 |
| UI Kit | [Gravity UI](https://gravity-ui.com/) |
| Testing | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/react) |
| Linting | [ESLint](https://eslint.org/) 9, [Prettier](https://prettier.io/) |
| Git Hooks | [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged), [commitlint](https://commitlint.js.org/) (conventional commits) |
| CI/CD | [GitHub Actions](https://docs.github.com/en/actions) (branch validation, PR title lint) |
| Auth | [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) |
| i18n | [next-i18next](https://github.com/i18next/next-i18next) |

## Features

> ✅ = Done, 🚧 = In progress, ⬜ = Planned

| | Feature | Status |
| --- | --- | --- |
| 🌐 | i18n (en/ru, language toggler in header) | ✅ |
| ℹ️ | About page (RS School info, team, tech stack) | ✅ |
| 🔐 | Auth UI (sign-in form with validation) | ✅ |
| 📝 | Swagger Editor (paste/edit OpenAPI specs) | ⬜ |
| 👁️ | Swagger Viewer (endpoints, schemas) | ⬜ |
| 🧪 | Try-It-Out (API request execution) | ⬜ |
| 📋 | cURL generation | ⬜ |
| 📊 | History & Analytics (authenticated users) | ⬜ |
| 🔑 | JWT auth, private routes | ⬜ |

## Project Structure

```text
swagger-editor-app/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/           # Pages & routing (App Router)
│   │   │   ├── [lng]/     # Locale-prefixed routes
│   │   │   │   ├── about/ # About page (team, tech stack)
│   │   │   │   ├── auth/  # Auth page (sign-in form)
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   └── Providers.tsx
│   │   ├── components/    # Reusable components
│   │   │   ├── Auth/      # Sign-in form (react-hook-form + zod)
│   │   │   ├── Footer/    # Sticky footer (server + client split)
│   │   │   ├── Header/    # Header with nav, theme toggle, lang switcher
│   │   │   └── LocalizedLink/  # i18n-aware Link component
│   │   ├── contexts/      # React contexts (theme)
│   │   ├── hooks/         # Custom hooks (useLocaleSwitch)
│   │   ├── i18n/          # i18n config, loader, locales (en, ru)
│   │   ├── providers/     # ThemeProvider, I18nProvider
│   │   ├── shared/        # Shared constants & utilities
│   │   ├── styles/        # CSS token system
│   │   │   └── tokens/    # base.css, semantic.css, gravity.css
│   │   └── proxy.ts       # i18n middleware
│   ├── .husky/            # Git hooks (commit-msg, pre-commit)
│   └── ...config files
├── .github/
│   ├── workflows/         # CI pipelines
│   └── pull_request_template.md
└── README.md
```

## Getting Started

**Prerequisites:** Node.js >= 20, npm

```bash
# Clone & enter
git clone <repo-url>
cd swagger-editor-app/frontend

# Install dependencies
npm install

# Development server
npm run dev

# Open http://localhost:3000
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run test` | Run Vitest tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run format` | Prettier format |
| `npm run typecheck` | TypeScript check |
| `npm run ci:format` | CI format check |

## Configuration

Environment variables (create `.env` in `frontend/`):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Auth API base URL (planned) |
| `JWT_SECRET` | JWT signing secret (planned) |

## Architecture

### Current
- **SSR-first:** Pages render on server, client components hydrate for interactivity
- **i18n:** Locale prefix in URL (`[lng]`), server-side `getT()` for static content, `useT` hook for dynamic
- **Styling:** CSS custom properties token system (`--se-*`) mapped from Gravity UI tokens, dark mode via `.g-root_theme_dark`
- **Layout:** CSS grid wrapper (`auto 1fr auto`) with sticky footer; Header + Footer SSR
- **Linting:** ESLint 9 + Prettier, enforced via Husky pre-commit + lint-staged

### Planned
- **Try-It-Out proxying:** API requests routed through Next.js server routes to bypass CORS
- **Auth flow:** JWT tokens in cookies/httpOnly; private routes with redirect on expiry
- **State management:** Editor schema ↔ Viewer auto-sync; auth session in React context
- **Code splitting:** History & Analytics page via `next/dynamic` (not loaded for anonymous users)

## Team

| Role | GitHub |
| --- | --- |
| Team Lead | [d15nd](https://github.com/d15nd) |
| Developer | [fayzullo05](https://github.com/fayzullo05) |
| Developer | [self-destructed](https://github.com/self-destructed) |

**Mentors:**

- [bt-diana](https://app.rs.school/profile?githubId=bt-diana)
- [margaryta-maletz](https://app.rs.school/profile?githubId=margaryta-maletz)

## Contributing

1. Branch from `develop`: `feature/`, `fix/`, `docs/`, `chore/`, `refactor/`
2. Conventional commits: `type(scope): description`
3. Run `npm run lint` & `npm run test` before committing
4. Open PR to `develop` with description and linked issue

See [PR template](.github/pull_request_template.md) for checklist.

## License

MIT
