# Deploy GreenSense on Dokploy

Minimal deployment guide for GreenSense POC. Assumes Dokploy, Traefik and a domain are already set up on your VPS (see [NextjsDeploy VPS setup](../NextjsDeploy/docs/vps-infra/0-quick-install.md) if not).

## Prerequisites

- Dokploy instance running on VPS
- Domain name with DNS pointing to VPS public IP
- Traefik with DNS challenge enabled on Dokploy

---

## 1. Create Project & Environment

1. **Dokploy** > Projects > **Create Project** (e.g., `GreenSense`)
2. Create an environment (e.g., `production`)

## 2. Create Compose Service

In the environment:

1. **Create Service** > **Compose**
2. Name: `production`
3. **Provider** tab:
    - Select `Git` or `GitHub`
    - Repository URL: `https://github.com/nphlp/GreenSense` (public)
    - Branch: `main`
    - Compose file path: `./compose.dokploy.yml`
    - Click **Save**

## 3. Environment Variables

In **Dokploy** > your compose service > **Environment** tab, paste:

```bash
ENV_LABEL=production
NODE_ENV=production
NEXTJS_STANDALONE=true
NEXT_PUBLIC_BASE_URL=https://your-domain.com
VPS_NEXTJS_DOMAIN=your-domain.com
```

Replace `your-domain.com` with your actual domain. Click **Save**.

## 4. DNS Record

Add an A record pointing to your VPS public IP:

| Type | Name              | Value         |
| ---- | ----------------- | ------------- |
| A    | `your-domain.com` | VPS public IP |

## 5. Deploy

- Click **Deploy** in Dokploy, or push to `main` if auto-deploy is enabled
- The compose builds the Next.js standalone image and starts the container
- Traefik automatically provisions the SSL certificate

## 6. Verify

- [ ] App accessible at `https://your-domain.com`
- [ ] Landing page shows GreenSense hero
- [ ] `/planificateur` flow works through all 5 steps
- [ ] `/mon-jardin` displays the summary

---

## Architecture

```
[Browser] → Traefik (TLS) → Next.js container (port 3000)
                            │
                            └─ Standalone build (no DB, no backend)
                               Cookie state (client-only)
```

No database, no backend API, no migrations — just a static/partially-prerendered Next.js app.

---

## Update

Push to `main` and Dokploy will rebuild automatically (if auto-deploy enabled), or click **Deploy** manually.
