# Facets of the Ordinary — Photo Exhibit Website

An immersive, responsive mockup for the **Facets of the Ordinary** augmented-reality photo
exhibit. Built as plain HTML / CSS / JavaScript — no build step, no install.

## Run it

Just open `index.html` in a browser. For best results (so the gallery's deep-links and
sharing work cleanly) run a tiny local server:

```bash
cd "Facets of the Ordinary"
python3 -m http.server 5173
# then open http://localhost:5173
```

## Pages

| Page | File | What's on it |
|------|------|--------------|
| Home | `index.html` | Immersive scroll experience — parallax hero, word-by-word statement, a 3D "walk-the-hall" gallery corridor, **The Collection** (a paginated preview grid, 8 per page), animated stats, and the instructor profile. |
| Gallery | `gallery.html` | Filterable photo grid. Click a photo to open the viewer: ❤️ heart reaction (double-tap the image too, Instagram-style), comments, and social sharing. |
| Photographers | `photographers.html` | One card per photographer with bio, work count, socials, and a link to their collection. |

## Light / dark theme
A theme toggle (sun/moon icon) sits in the top navigation on every page. The choice is saved
in the browser and applied before paint (no flash). Both themes are defined purely as colour
tokens in the `:root` blocks of [`css/style.css`](css/style.css) — dark is the default; the
light theme lives under `:root[data-theme="light"]`.

## Photo viewer features
- **Title + caption + photographer** on every photo
- **Heart reaction** like Instagram (click the heart, or double-tap/double-click the image)
- **Comment section** — comments persist in the browser (localStorage)
- **Share** to Facebook, X/Twitter, Pinterest, WhatsApp, copy link, or the native device share sheet
- Keyboard: `←` / `→` to move between photos, `Esc` to close

## ▶ Adding your real photos (you + classmates)

Everything is driven by **one file: [`js/data.js`](js/data.js).** You don't need to touch the HTML.

1. Drop image files into `images/photos/` (create the folder; e.g. `images/photos/mug.jpg`).
2. In `js/data.js`, edit the `PHOTOS` array. For each photo set:
   ```js
   {
     id: "p02",
     title: "Morning Mug",
     caption: "A chipped ceramic cup catching the first hour of sun.",
     category: "Still Life",          // Street | Still Life | Portrait | Urban (or add your own)
     photographer: "luis",            // must match an id in PHOTOGRAPHERS
     img: "images/photos/mug.jpg",    // <-- your file instead of the placeholder
     likes: 0,
     comments: []
   }
   ```
3. Edit the `PHOTOGRAPHERS` array the same way (name, role, bio, `portrait` image, socials).

The Home corridor on `index.html` shows the first 8 photos as framed art on the walls —
update the `<img>`/captions in the `.corridor-track` block there if you want different hero shots.

> Placeholders currently use random stock from `picsum.photos`, so the mockup looks alive
> before your photos arrive. They need internet; your local files won't.

## 🎨 Matching your AI Studio branding

All colours and fonts live as **design tokens at the top of [`css/style.css`](css/style.css)**
(the `:root` block). Change them once and the whole site re-skins:

```css
:root {
  --bg:     #0d0c0b;   /* background        */
  --text:   #f4efe6;   /* text              */
  --accent: #cba35c;   /* primary accent    */
  --font-display: "Fraunces", serif;   /* headings */
  --font-body:    "Inter", sans-serif; /* body     */
}
```

If you tell me the exact hex codes / font names from your AI Studio design, I'll drop them in.

## 🚀 Deploying to Vercel (with live, shared likes & comments)

The site is plain static files plus serverless functions in `/api` — Vercel detects both
automatically, **no build step**.

1. Push this folder to a GitHub repo, then on [vercel.com](https://vercel.com) → **Add New
   Project** → import the repo. (Or run `npx vercel` from this folder.) It deploys as-is.
2. **Turn on live shared storage** (so every visitor sees the same likes/comments, and they
   survive refreshes):
   - In your Vercel project → **Storage** → create a **KV** store (Upstash Redis) and
     **Connect** it to the project.
   - That automatically adds the env vars `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
   - **Redeploy.** Done — the `/api` functions now read/write that store.

That's it. How it behaves:

- **Deployed with KV connected** → likes & comments are **live and shared across all
  visitors**, stored server-side, and persist across refreshes and devices.
- **Deployed without KV (or opened as a local file)** → the site still works fully, but
  likes/comments fall back to **per-browser `localStorage`** (only that visitor sees them).

The "did *I* like this" heart state is always kept per-browser; the like *count* is the shared
number. See [`api/`](api/) for the three endpoints (`state`, `like`, `comment`) and
[`.env.example`](.env.example) for the variables.

> Testing the live API locally needs `npx vercel dev` (which runs the functions). The simple
> `python3 -m http.server` above serves the static pages only, so it uses the localStorage
> fallback — that's expected.

## Notes
- Smooth scroll & the 3D corridor use Lenis + GSAP from a CDN, loaded as *progressive
  enhancement* — if they fail to load (e.g. offline), the site still works, just with
  lighter animation.
- Fully responsive: the corridor, gallery columns, and the lightbox all adapt down to mobile,
  with a slide-in menu. Respects `prefers-reduced-motion`.
