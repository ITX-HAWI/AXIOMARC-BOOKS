# AXIOMARC Books — Official Bookstore Website

The official Axiomarc bookstore. Visitors browse the books, click a book to see
its details, and hit **Buy now** to be redirected to the secure Whop checkout
(Whop's payment page handles the payment via Stripe).

## What's inside

- `index.html` — the whole site (hero, book grid, why-section, affiliate CTA, footer, book-detail modal)
- `styles.css` — premium minimal theme (cream / ink / gold) + 3D book effects
- `app.js` — book data, 3D tilt, modal logic, scroll reveals
- `assets/` — logo + 3 book covers

## Whop buy links

All four books already point at their Whop product pages (set as `buyUrl` in
the `BOOKS` array in `app.js`). If a URL is ever empty, that book's button
shows "Link coming soon" until a URL is added.

## Going live (pick one)

**Option A — Vercel (recommended, free)**
1. Go to vercel.com → New Project → Import the `axiomarc-books` repo.
2. No build settings needed (static site). Deploy.

**Option B — Netlify (free)**
1. Go to app.netlify.com → Add new site → Import from GitHub.
2. Publish directory: repo root. Deploy.

**Option C — Cloudflare Pages (free)**
1. Go to dash.cloudflare.com → Pages → Create → Connect to Git.
2. Build command: none. Output directory: `/`. Deploy.

**Option D — GitHub Pages**
1. Repo → Settings → Pages → Deploy from branch → `main` → `/ (root)`.
2. Note: Pages serves private repos only on paid plans; the site itself is
   a public storefront, so consider Options A–C for a private repo.

## Adding a new book later

1. Drop the cover image into `assets/`.
2. Add an entry to the `BOOKS` array in `app.js` (copy an existing one).
3. That's it — the card, modal and Buy button render automatically.
