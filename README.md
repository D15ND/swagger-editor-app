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
| UI Kit | [Gravity UI](https://gravity-ui.com/) (uikit, navigation, icons) |
| Testing | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), [jsdom](https://github.com/jsdom/jsdom) |
| Linting | [ESLint](https://eslint.org/) 9, [Prettier](https://prettier.io/) |
| Git Hooks | [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged), [commitlint](https://commitlint.js.org/) (conventional commits) |
| CI/CD | [GitHub Actions](https://docs.github.com/en/actions) (branch validation, PR title lint) |
| Auth | JWT-based (email/password) |
| i18n | [next-intl](https://next-intl.dev/) (planned) |

## Features

> Planned feature set based on the task. Implementation in progress.

- **Swagger Editor** — paste/edit OpenAPI specs, auto-detect JSON/YAML, format switching, schema validation
- **Swagger Viewer** — endpoint list by path/method, parameters, request/response schemas
- **Try-It-Out** — execute requests via SSR to avoid CORS, view response status/headers/body
- **cURL generation** — generate copyable cURL commands from request state
- **History & Analytics** — authenticated users: request history, duration, status codes, timestamps (SSR)
- **Authentication** — sign in / sign up with email/password, JWT tokens, private route protection
- **i18n** — multi-language support (≥2 languages), language toggler in header
- **About page** — RS School info, team members, technologies used

## Project Structure

> Tentative project structure, subject to change as development progresses.

```text
swagger-editor-app/
├── frontend/              # Next.js application
│   ├── app/               # Pages & routing (App Router)
│   │   ├── about/         # About page
│   │   ├── history/       # History & Analytics (lazy-loaded, private)
│   │   ├── signin/        # Sign In form
│   │   ├── signup/        # Sign Up form
│   │   └── page.tsx       # Main page (Editor + Viewer)
│   ├── public/            # Static assets
│   ├── .husky/            # Git hooks
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
| `NEXT_PUBLIC_API_URL` | Auth API base URL |
| `JWT_SECRET` | JWT signing secret |

## Architecture

> Proposed approach. Will be refined during implementation.

- **SSR (Server-Side Rendering):** API requests from Try-It-Out are proxied through Next.js server routes to bypass CORS
- **Auth flow:** JWT tokens stored in cookies/httpOnly; private routes redirect to main page on expired token
- **State management:** Editor schema ↔ Viewer auto-sync; authenticated user session in React context
- **Lazy loading:** History & Analytics page code-split via `next/dynamic` (not loaded for anonymous users)

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

## Roadmap

- [x] Project scaffolding (Next.js, Gravity UI, ESLint, Prettier, Husky, CI)
- [ ] Authentication (Sign In / Sign Up)
- [ ] Swagger Editor (schema editing, format switching, validation)
- [ ] Swagger Viewer (endpoint list, request/response details)
- [ ] Try-It-Out (request execution, response display)
- [ ] cURL generation
- [ ] History & Analytics (SSR, lazy-loaded)
- [ ] About page
- [ ] i18n (≥2 languages)
- [ ] Deployment to Vercel/Netlify

## License

MIT
