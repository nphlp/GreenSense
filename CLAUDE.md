# GreenSense

POC Next.js 16 — compagnon numérique pour la permaculture.

Parcours de planification à 3 étapes : sélection fruits/légumes → plantes complémentaires → calendrier annuel. Mobile-responsive, données en dur (pas de BDD, pas d'auth, pas d'API backend).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Cache Components, React Compiler)
- **Language**: TypeScript 5.9
- **UI**: Tailwind CSS 4 + Base-UI + Motion + Lucide
- **Forms**: Custom useForm hook (Zod validation, progressive schemas)
- **Utilities**: clsx, tailwind-merge, class-variance-authority, dayjs, lodash
- **State**: useCookieState, useExternalStore (module-level stores)
- **Quality**: ESLint 9, Prettier, Husky, Commitlint, lint-staged

## Repository Architecture

```
app/                 # Next.js App Router pages and layouts
├── layout.tsx       # Root layout (header minimal + Geist fonts)
├── page.tsx         # redirect → /planificateur
├── planificateur/   # POC main flow (3 steps)
├── error.tsx, loading.tsx, not-found.tsx
components/
├── atoms/           # Base-UI atoms (+ _core, _form with useForm)
├── breakpoints.tsx  # Responsive debug helper
└── image.tsx        # Next Image wrapper (preloaded/onPageLoad/whenIsVisible)
core/                # App shell (Main wrapper, config)
lib/                 # cn, cookie-state utilities
utils/               # Hooks and helper functions (date, time, string, etc.)
public/globals.css   # Tailwind 4 theme (CSS variables, breakpoints, colors)
docs/                # Design mockups (Excalidraw + Figma) + PDFs
NextjsDeploy/        # Submodule reference (full Next.js 16 template)
```

## Commands

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run start        # Run production build
bun run typegen      # Generate Next.js types
bun run checks       # All checks (type + lint:fix + format:fix)
bun run type         # TypeScript checking
bun run lint:fix     # ESLint check/fix
bun run format:fix   # Prettier check/fix
bun run build:analyze # Build with bundle analyzer
```

## MCP Servers (`.mcp.json`)

- **context7** — Up-to-date documentation for any library
- **next-devtools** — Next.js dev server MCP (errors, routes, diagnostics)
- **chrome-devtools** — Browser automation and debugging
- **notion** — Access to project workspace (pages, databases)
- **ide** (built-in) — VS Code LSP diagnostics via extension

## Project Files

- `README.md` — (to create) project overview
- `CLAUDE.md` — this file, Claude Code conventions and rules
- `docs/` — mockups (Excalidraw planificateur/mon-jardin/dashboard + Figma terrain selection flow)
- `NextjsDeploy/` — git submodule, full Next.js 16 template (reference stack)

## Rules

### Language

- Code, documentation, comments, JSDoc: **English**
- Claude Code responses: **French** (user preference)
- Never leak real domains, secrets, or credentials in documentation or versioned files.

### Naming

- For boolean variables: use `every` prefix instead of `all` (e.g. `everyValid`, `everyPassed`).

### Atoms (Base-UI components)

- **Import pattern**: Always import atoms via `index.ts` — default export for the composable component, named exports for sub-components: `import Popover, { Arrow, Popup, Portal, Trigger } from "@atoms/popover"`.
- Use `context7` MCP server for up-to-date Base UI documentation.

### Forms

- **Always reset forms after submission** — Next.js is a SPA. Even with `window.location.href`, the user can navigate back. Forms must always call `reset()` (form fields) and stop loaders (`setIsSubmitting(false)`) via a delayed `setTimeout` after submission.

### Commands

- **Always use `bun`, never `npm`, `npx`, or `pnpm`.** Use `bunx` instead of `npx` when needed.
- Do not run servers to avoid port conflicts. Developer handles these manually.

### Git

- Do not run `git` commands without authorization or explicit demand. These are sensitive operations.
- Never sign commits with `Co-Authored-By`.
- Always show the commit message to the developer for approval before committing.

### Documentation & CLAUDE.md

- IMPORTANT: If you identify that CLAUDE.md should be updated (outdated info, missing context, new patterns, etc.), always suggest it to the developer. Never update this file silently.

### MCP Usage

- **context7**: Use autonomously to look up documentation for recent/unfamiliar topics (Base-UI, Next.js 16, Tailwind 4, etc.).
- **next-devtools**: Use to debug server-side logs and errors when the dev server is running.
- **chrome-devtools**: Only use with explicit developer approval. Opens a new Chrome window which may be disruptive.
- **notion**: Access project context (roadmap, personas, specifications) when relevant.
- **ide** (`getDiagnostics`): Use autonomously after code changes alongside `bun run checks`. Catches things other tools miss (e.g. Tailwind v4 class migrations).
