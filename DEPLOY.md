# Putting the site online — Cloudflare Pages

The site is static, so hosting is **free**. Two ways to do it.

## Option A — Drag and drop (quickest, no accounts to link)
1. Build the site:
   ```bash
   npm run build
   ```
   This creates a `dist/` folder.
2. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Pages** → **Upload assets**.
3. Drag the whole `dist/` folder in. Done — you get a live URL.
4. To update later, run `npm run build` again and upload the new `dist/`.

## Option B — Connect GitHub (recommended, auto-publishes)
Best long-term: every saved change republishes automatically.
1. Put this project in a GitHub repository.
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to
   Git**, pick the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Under **Environment variables**, add `PUBLIC_WEB3FORMS_KEY` with your
   Web3Forms key (so the contact form works).
5. Save and deploy. From now on, pushing a change to GitHub republishes the site.

## Your own domain
In the Cloudflare Pages project → **Custom domains** → add e.g.
`sturrystorage.co.uk` and follow the DNS steps.

## After the domain is set — two small edits
Point the site at the real domain in these two places:
- `astro.config.mjs` → `SITE_URL`
- `public/robots.txt` → the `Sitemap:` line

Then rebuild/redeploy.

---

### Netlify instead?
It works the same way: drag `dist/` onto https://app.netlify.com/drop, or
connect the repo with build command `npm run build` and publish directory
`dist`. Add the `PUBLIC_WEB3FORMS_KEY` environment variable there too.
