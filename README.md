# MASS · QUIET Next.js Template

Next.js 15 + Auth.js v5 (Credentials) + Postgres, pre-wired for **Cloudflare Pages** via `@cloudflare/next-on-pages`.

Every project generated from this template ships with:

- A login flow (`/login` → `/`) backed by a seed `admin` user in Postgres.
- Auth.js v5 with a Credentials provider that reads `users.password_hash`.
- The Postgres driver (`postgres`) talking to DigitalOcean Managed Postgres over TLS.
- A Cloudflare Pages build setup with `nodejs_compat`.

## Expected env vars

| Var | Example |
| --- | --- |
| `DATABASE_URL` | `postgresql://user:pass@host:25060/db?sslmode=require` |
| `AUTH_SECRET` / `NEXTAUTH_SECRET` | 32-byte random base64 |
| `NEXTAUTH_URL` | `https://my-project.example.com` |

The project-create wizard wires all of these automatically.

## Seed credentials

After migrations run, a seed admin user is inserted:

- **User**: `admin`
- **Password**: `123123123`

Change it by running an `UPDATE users SET password_hash = ...` once you're past smoke-testing.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in with the seed credentials.

## Deploy (local)

Pages deploys on push automatically once the Cloudflare Pages project is wired to the repo. To deploy from CLI:

```bash
npm run pages:deploy
```

## Tech Stack

- **Next.js 15** — React framework
- **Auth.js v5** — Credentials provider
- **postgres** — Postgres client (Edge-compatible)
- **bcryptjs** — password hashing
- **@cloudflare/next-on-pages** — Pages adapter

---

Built with **MASS · QUIET** Infrastructure
