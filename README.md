# Swagger Editor App

> [RS School](https://rs.school/) React course final project — web-based Swagger/OpenAPI UI with REST client.

[Task: Swagger/OpenAPI UI](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

## About

Online editor for designing, editing, and testing APIs via OpenAPI specifications. Designed to support YAML/JSON schema editing, live viewer, endpoint execution ("Try-It-Out"), request history & analytics, and i18n.

Built by a team of 3 as the final project of the Rolling Scopes School React course. Currently in active development — features are being added incrementally.

## Deploy

App deployed on Vercel: [swagger-editor-app-one.vercel.app](https://swagger-editor-app-one.vercel.app)

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI Kit | [Gravity UI](https://gravity-ui.com/) |
| Testing | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/react) |
| Linting | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) |
| Git Hooks | [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged), [commitlint](https://commitlint.js.org/) (conventional commits) |
| CI/CD | [GitHub Actions](https://docs.github.com/en/actions) (branch validation, PR title lint) |
| Auth | [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) |
| i18n | [i18next](https://www.i18next.com/) |

## Features

> ✅ = Done, 🚧 = In progress, ⬜ = Planned

| | Feature | Status |
| --- | --- | --- |
| 🌐 | i18n (en/ru, language toggler in header) | ✅ |
| ℹ️ | About page (RS School info, team, tech stack) | ✅ |
| 🔐 | Auth UI (sign-in form with validation) | ✅ |
| 📝 | Swagger Editor (paste/edit OpenAPI specs) | ✅ |
| 👁️ | Swagger Viewer (endpoints, schemas) | ✅ |
| 🧪 | Try-It-Out (API request execution) | ✅ |
| 📋 | cURL generation | ✅ |
| 📊 | History & Analytics (authenticated users) | ✅ |
| 🔑 | JWT auth, private routes | ✅ |

## Project Structure

```text
swagger-editor-app/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/           # Pages & routing (App Router)
│   │   │   ├── [lng]/     # Locale-prefixed routes
│   │   │   │   ├── (auth)/# Auth pages (sign-in, sign-up)
│   │   │   │   ├── about/ # About page (team, tech stack)
│   │   │   │   ├── history/ # History & Analytics page
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── api/       # API routes (history, schema)
│   │   │   ├── globals.css
│   │   │   ├── global-error.tsx
│   │   │   └── Providers.tsx
│   │   ├── components/    # Reusable components
│   │   │   ├── History/   # PageShell, AuthRequired, AnalyticsCards, HistoryContent
│   │   │   ├── SwaggerViewer/  # EndpointCard, EndpointDetails, TryItOutPanel, SchemaBlock
│   │   │   ├── Auth/      # Sign-in form (react-hook-form + zod)
│   │   │   ├── Footer/    # Sticky footer (server + client split)
│   │   │   ├── Header/    # Header with nav, theme toggle, lang switcher
│   │   │   └── LocalizedLink/  # i18n-aware Link component
│   │   ├── contexts/      # React contexts (auth, theme)
│   │   ├── features/      # Feature modules (swagger-editor)
│   │   ├── hooks/         # Custom hooks (useLocaleSwitch, useNotify)
│   │   ├── i18n/          # i18n config, locales (en, ru)
│   │   ├── lib/           # Server utilities (auth, supabase, i18n, theme)
│   │   ├── providers/     # AuthProvider, ThemeProvider, ToastProvider
│   │   ├── styles/        # CSS token system
│   │   │   └── tokens/    # base.css, semantic.css, gravity.css
│   │   └── types/         # Shared types (openapi)
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
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anonymous API key |

## Architecture

### Current

- **SSR-first:** Pages render on server, client components hydrate for interactivity
- **i18n:** Locale prefix in URL (`[lng]`), server-side `getT()` for static content, `useT` hook for dynamic
- **Styling:** CSS custom properties token system (`--se-*`) mapped from Gravity UI tokens, dark mode via `.g-root_theme_dark`
- **Layout:** CSS grid wrapper (`auto 1fr auto`) with sticky footer; Header + Footer SSR
- **Auth:** JWT tokens in cookies/httpOnly; Supabase auth with session refresh
- **State management:** Editor ↔ Viewer auto-sync via shared schema state
- **Code splitting:** History page uses `next/dynamic` (not loaded for anonymous users)
- **Linting:** ESLint 9 + Prettier, enforced via Husky pre-commit + lint-staged

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
