# GreenSense

POC Next.js 16 — digital companion for permaculture planning.

5-step flow: surface → plant selection → companion plants → annual calendar → quantities, with a final garden summary page. Mobile-first, cookie state only (no database, no auth, no backend API).

- **Framework**: Next.js 16 (App Router, Cache Components, React Compiler)
- **UI**: Tailwind CSS 4 + Base-UI + Motion
- **State**: cookie state (`useCookieState`)
- **Data**: 15 plants hardcoded dataset with seasonal phases and companion rules

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/docs/installation)

### Development

```bash
bun install
bun run dev
```

App available at [http://localhost:3000](http://localhost:3000).

### Build (test production locally)

```bash
bun run build
bun run start
```

### Checks

```bash
bun run checks   # type + lint:fix + format:fix
```

## Deployment

See [docs/deploy.md](./docs/deploy.md) for the Dokploy deployment flow.

Live at [green-sense.fr](https://green-sense.fr).
