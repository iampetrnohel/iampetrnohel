# Petr Nohel — Personal Website

A static personal website built from your Figma design. No build step, no framework — just HTML, CSS, and a small bit of vanilla JavaScript.

## Project structure

```
petr-nohel-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── favicon.svg
    ├── hero.jpg          ← replace with your beach/sunset image
    ├── about.jpg         ← replace with your portrait
    ├── athlete.jpg       ← replace with your race finish photo
    ├── project-1.jpg     ← replace with Cavalier Conversations image
    ├── project-2.jpg     ← replace with Stronger Together image
    ├── blog-1.jpg        ← replace with blog thumbnail
    ├── blog-2.jpg        ← replace with blog thumbnail
    └── blog-3.jpg        ← replace with blog thumbnail
```

The images currently in `/assets/` are gradient placeholders that say "REPLACE" so you can see the layout immediately. **Swap each one with the real photo from your Figma file**, keeping the same filename. That's the fastest way to make the site real.

## Run it locally

Just open `index.html` in your browser. Or for a proper local server:

```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's customizable in one place

Open `css/styles.css`. The top `:root` block has all the design tokens:

```css
--accent: #1E5BFF;        /* electric blue accent */
--bg: #0A0A0A;            /* page background */
--font-display: "Saira Condensed";
--font-body: "Manrope";
```

Change those four lines and the whole site re-skins.

## Deploying to Vercel (recommended)

1. Sign up at https://vercel.com using your GitHub account (free).
2. Push this folder to a GitHub repo, or just drag it into Vercel's dashboard ("Add New → Project → import" lets you upload a folder).
3. Vercel auto-detects it as a static site — click **Deploy**. You'll have a live `.vercel.app` URL in ~30 seconds.
4. **Connect your domain**:
   - In your Vercel project → Settings → Domains → add your domain.
   - Vercel will show you the DNS records to set. Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and either:
     - Add an `A` record pointing to `76.76.21.21`, OR
     - Change the nameservers to Vercel's (easier; Vercel walks you through it).
   - Wait 5–60 minutes for DNS to propagate. HTTPS is automatic.

Netlify works identically if you prefer it — same drag-and-drop, same domain flow.

## Deploying to Netlify (alternative)

1. Sign up at https://netlify.com.
2. Drag the entire `petr-nohel-site` folder onto the Netlify dashboard. Done — you have a live URL.
3. Site settings → Domain management → add your custom domain and follow the DNS instructions shown.

## What's already built in

- Fully responsive (desktop, tablet, mobile)
- Sticky nav with blur-on-scroll
- Mobile hamburger menu
- Smooth-scroll anchors with offset for the fixed nav
- Scroll-triggered fade-up animations on every section (with `prefers-reduced-motion` support for accessibility)
- Project slider arrows (the buttons next to "Impact starts with a conversation")
- Hover states on links, buttons, and cards
- Open Graph meta tags for social sharing
- SVG favicon
- Semantic HTML and ARIA labels for screen readers

## Things you'll likely want to do next

1. **Replace the 8 placeholder images** in `/assets/` with the real photos from Figma. Keep the filenames the same.
2. **Update social links** in the footer (`index.html`, search for `aria-label="X (Twitter)"`).
3. **Add your real Open Graph image** — drop a `og-image.jpg` (1200×630) into `/assets/` and add `<meta property="og:image" content="assets/og-image.jpg" />` to the `<head>`.
4. **Wire up "Contact Us"** — right now it scrolls to the footer. If you want a real form, services like Formspree or Web3Forms let you add one in five minutes without a backend. Happy to add that for you if you want.
5. **Hook up the project slider** to actually contain more than two projects when you're ready — the arrow buttons already work, just add more `<article class="project-card">` blocks.
