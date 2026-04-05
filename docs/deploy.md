# Deploy GreenSense on Dokploy

Minimal deployment guide for GreenSense POC. Assumes Dokploy, Traefik and a domain are already set up on your VPS (see [NextjsDeploy VPS setup](../NextjsDeploy/docs/vps-infra/0-quick-install.md) if not).

## Prerequisites

- Dokploy instance running on VPS
- Domain name with DNS pointing to VPS public IP
- Traefik with DNS challenge enabled on Dokploy
- (Optional) Umami instance running on the same `dokploy-network`

---

## 1. Generate local env files

```bash
make setup-env
```

1. First run → copies `env/env.config.example.mjs` to `env/env.config.mjs`
2. Edit `env/env.config.mjs` with your real values (domain, Umami token, etc.)
3. Second run → generates `.env` (dev) + `env/.env.production`

## 2. Create Project & Environment on Dokploy

1. **Dokploy** > Projects > **Create Project** (e.g., `GreenSense`)
2. Create an environment (e.g., `production`)

## 3. Create Compose Service

In the environment:

1. **Create Service** > **Compose**
2. Name: `production`
3. **Provider** tab:
    - Select `Git` or `GitHub`
    - Repository URL: `https://github.com/nphlp/GreenSense` (public)
    - Branch: `main`
    - Compose file path: `./compose.dokploy.yml`
    - Click **Save**

## 4. Environment Variables

Copy the content of your local `env/.env.production` into **Dokploy** > your compose service > **Environment** tab. Click **Save**.

## 5. DNS Record

Add an A record pointing to your VPS public IP:

| Type | Name              | Value         |
| ---- | ----------------- | ------------- |
| A    | `your-domain.com` | VPS public IP |

## 6. Deploy

- Click **Deploy** in Dokploy, or push to `main` if auto-deploy is enabled
- The compose builds the Next.js standalone image and starts the container
- Traefik automatically provisions the SSL certificate
- Healthcheck probes `/api/health` every 30s

## 7. Verify

- [ ] App accessible at `https://your-domain.com`
- [ ] `/api/health` returns `{"status":"ok",...}`
- [ ] Landing page shows GreenSense hero
- [ ] `/planificateur` flow works through all 5 steps
- [ ] `/mon-jardin` displays the summary
- [ ] Umami dashboard shows incoming page views (if configured)

---

## Architecture

```
[Browser] → Traefik (TLS) → Next.js container (port 3000)
                            │
                            ├─ /api/health        (liveness probe)
                            ├─ /api/umami/*       (proxy to Umami internal service)
                            └─ App pages (cookie state, no DB)
```

No database, no backend API, no migrations — a static/partially-prerendered Next.js app with optional Umami analytics.

---

## Update

Push to `main` and Dokploy will rebuild automatically (if auto-deploy enabled), or click **Deploy** manually.
