# Rug N' Rope - Customer App 🛍️

Public website for customers: browse products, place orders, track orders.

---

## 🚀 Deploy to Cloudflare Pages (Workers)

### Prerequisites
- [Cloudflare account](https://dash.cloudflare.com)
- [Neon database](https://neon.tech) (free PostgreSQL, works with Workers)
- Node.js 20+

### Step 1 — Database (Neon)
1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project → copy the **connection string**
3. It looks like: `postgresql://user:pass@host.neon.tech/dbname?sslmode=require`

### Step 2 — Install & Build
```bash
npm install
npx @cloudflare/next-on-pages
```

### Step 3 — Cloudflare R2 (for image uploads)
```bash
# Create R2 bucket
wrangler r2 bucket create rug-n-rope-uploads

# Enable public access in Cloudflare Dashboard:
# R2 → rug-n-rope-uploads → Settings → Public Access → Allow Access
# Copy the public URL and set it as R2_PUBLIC_URL
```

### Step 4 — Deploy
```bash
wrangler pages deploy .vercel/output/static --project-name=rug-n-rope-customer
```

### Step 5 — Set Environment Variables
In Cloudflare Dashboard → Pages → rug-n-rope-customer → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_SECRET` | Random 32+ character string |
| `R2_PUBLIC_URL` | Your R2 public URL |
| `NEXT_PUBLIC_APP_URL` | `https://rugnrope.com` |

### Step 6 — Initialize Database
```bash
# Push schema to Neon
npx drizzle-kit push

# Initialize with default data (run once after deploy)
curl -X POST https://rugnrope.com/api/init
```

### Step 7 — Custom Domain
Cloudflare Dashboard → Pages → rug-n-rope-customer → Custom Domains → Add `rugnrope.com`

---

## 💻 Local Development

```bash
cp .env.example .env.local
# Fill in DATABASE_URL and JWT_SECRET
npm install
npm run dev
# → http://localhost:3000
```

---

## 🏗️ Tech Stack
- **Framework:** Next.js 16 (Edge Runtime)
- **Database:** PostgreSQL via Neon Serverless
- **ORM:** Drizzle ORM
- **Storage:** Cloudflare R2
- **Styling:** Tailwind CSS v4
- **Auth:** JWT (jose)
