# Nuestro Viaje v2 — Agent Context

Personal romantic travel website built by Álvaro for Gabriela. Documents the countries they have visited together, with photo galleries, an interactive European map, a bucket list, and a wishlist system. Everything runs **100% client-side** — no server, no build step, no dependencies except Google Fonts.

---

## Project Layout

```
nuestro-viaje_v2/
├── CLAUDE.md                          ← this file
│
├── password.html                      ← entry gate (password check)
├── el_archivo_del_tiempo_aurora_estrellas_atlas_banderas.html  ← hub / home
├── mapa.html                          ← interactive canvas map of Europe
├── bucket-list.html                   ← future destinations + wishlist
│
├── [country].html (14 files)          ← individual country photo pages
│   espana · italia · francia · alemania · austria · hungria
│   irlanda · eslovaquia · estonia · finlandia · escocia
│   republica-checa · vaticano · albania
│
├── css/
│   └── style.css                      ← shared styles for all country pages
│
├── js/
│   ├── auth.js          ← session guard (redirects to password.html)
│   ├── password.js      ← password form logic + stars animation
│   ├── countries.js     ← COUNTRIES array — single source of truth for visited countries
│   ├── app.js           ← country page renderer (gallery, tabs, lightbox)
│   ├── music.js         ← floating music button (audio/love-story.mp3)
│   ├── transitions.js   ← page fade-in / fade-out on navigation
│   ├── confetti.js      ← confetti effect (used on password success + special dates)
│   ├── special-mode.js  ← auto-confetti on Jun 11 and Jun 15
│   └── easter-egg.js    ← secret message shown when clicking ♡ in footer
│
├── audio/
│   └── love-story.mp3   ← background music (Taylor Swift)
│
├── flags/               ← circular flag images used in the hub page
│   al · at · cz · de · ee · es · fi · fr · hu · ie · it · sk · vatican · scotland  (.png)
│
└── fotos/               ← photo folders, one per visited country
    espana · italia · francia · alemania · austria · hungria
    irlanda · eslovaquia · estonia · finlandia · escocia
    republica-checa · vaticano · albania
```

---

## Authentication

`js/auth.js` is loaded as the **first script** on every protected page. It checks `sessionStorage.getItem('ag_auth') === 'ok'`. If not set, it saves the current URL to `sessionStorage.ag_ret` and redirects to `password.html`.

The password is hardcoded in `js/password.js`:
```js
var PASSWORD = '1234';
```

On success it sets `sessionStorage.ag_auth = 'ok'` and launches confetti before redirecting back to the saved URL.

`password.html` does **not** load `auth.js` (it is the auth page itself).

---

## Data — `js/countries.js`

Single source of truth for all **visited** countries. Exports a global `COUNTRIES` array. Every entry follows this shape:

```js
{
  id:          "espana",              // used as URL slug: espana.html
  name:        "España",             // display name
  folder:      "fotos/espana",       // photo directory (relative to root)
  emoji:       "🇪🇸",
  tagline:     "Donde todo empezó",  // short subtitle shown on cards / map tooltip
  quote:       "El hogar siempre huele a ti.",  // displayed inside the gallery panel
  accentColor: "#b03030",            // CSS --accent variable on the panel
  bgTone:      "#fff9f5",            // body background when this country is active
  flag:        "flags/es.png",       // used in hub page; null-safe (some use emoji fallback)
  images:      ["IMG_1127.jpg", …]   // filenames inside folder/
}
```

**Currently 14 visited countries** (in order as they appear in the array):
España · Italia · Francia · Hungría · Austria · Albania · Irlanda · Alemania · Eslovaquia · República Checa · Estonia · Finlandia · Escocia · Vaticano

**Hub stats** (`el_archivo_del_tiempo_...html`) hardcodes:
```js
statCountries: 13  // displayed count (Vatican shown separately)
statPhotos:   457
statKm:      28000
```
Update these manually when new countries are added.

---

## Adding a New Visited Country

1. **Create** `fotos/<id>/` directory and add photos.
2. **Add** entry to `COUNTRIES` array in `js/countries.js`.
3. **Copy** any existing country HTML (e.g. `espana.html`) to `<id>.html`. Change only `data-country="<id>"` and `<title>`.
4. **Add** the flag image to `flags/<id>.png` (190×190 px circular, if available).
5. **Update** the hub stats (`statCountries`, `statPhotos`, `statKm`).
6. **Add** the country polygon to the `GEO` array in `mapa.html` with `v:true`.
7. **Remove** it from the `EUROPE` array in `bucket-list.html` if it was listed there.

---

## Pages in Detail

### `el_archivo_del_tiempo_aurora_estrellas_atlas_banderas.html` — Hub

- **Sticky-scroll cards**: built dynamically from `COUNTRIES` via inline `<script>`. Each card uses `c.flag` (image) or `c.emoji` as the visual, with an "Abrir recuerdo" link to `<id>.html`.
- **Stats bar**: animated count-up for countries, photos, km. Values hardcoded in the script.
- **Stars canvas**: 220 falling particles rendered on a `<canvas id="stars">`.
- **Scroll progress bar**: `<div class="progress">` width tracks `scrollY / maxScroll`.
- **Nav buttons** at top: links to `mapa.html` and `bucket-list.html`.
- Does **not** use `css/style.css` — all styles are inline in `<style>` blocks.

### `mapa.html` — Interactive Map

Canvas-based (`<canvas id="mapCanvas">`). Pure JavaScript, no library.

**Projection**: equirectangular. Constants:
```js
var LON_MIN = -25, LON_RANGE = 70;  // −25°E → 45°E
var LAT_MAX = 72,  LAT_RANGE = 38;  // 72°N → 34°N
```
Canvas aspect ratio: `H = W × 580/980`.

**`GEO` array** — polygon data for every European country:
- `v:true` → visited (purple glow, clickable, navigates to `<id>.html`)
- `v:false` → not visited (dark blue or gold if wishlisted, tooltip with 🔒, click blocked)
- `bucketName` field (optional) — the name string used to match against the wishlist. Falls back to `name` if omitted.

**Vatican** is a special point marker (too small for a polygon):
```js
var VATICAN = { id:'vaticano', name:'Vaticano', emoji:'🇻🇦', lon:12.45, lat:41.90 };
```

**Wishlist coloring**: on render, reads `localStorage.getItem('ag_wishlist_v1')`, parses JSON array of country name strings, and fills matching non-visited polygons in gold (`rgba(200,155,35,.5)`).

**Re-render triggers**: `resize`, `load`, `pageshow` (50 ms delay), `visibilitychange`, `focus` — all call `render()` + `buildIntlTags()` to pick up wishlist changes from the bucket list page.

**International destinations panel** below the map: non-European wishlist destinations shown as pill tags (read from same localStorage key).

### `bucket-list.html` — Wishlist & Future Destinations

Two sections:
- **Europa** (`EUROPE` array, ~28 countries) — rendered as large `.card` elements with a lock overlay, hover reveal, and ★ Wishlist button.
- **Más allá de Europa** (`INTL` array, 20 destinations) — rendered as smaller `.intl-card` elements.

**Wishlist logic** (self-contained in the page script):
```js
var WL_KEY = 'ag_wishlist_v1';                         // same key used in mapa.html
function getWL()    { JSON.parse(localStorage.getItem(WL_KEY)) || [] }
function saveWL(l)  { localStorage.setItem(WL_KEY, JSON.stringify(l)) }
function toggleWL(name) { push/splice name; saveWL }   // uses country display name as key
```
Clicking the Wishlist button calls `toggleWL(d.name)`. The card gains the `.wishlisted` class (golden border/glow). The star badge (`.card__star`) becomes visible.

**Match between pages**: the `d.name` string in `EUROPE`/`INTL` must exactly match the `bucketName` (or `name`) in the `GEO` entry of `mapa.html`. Example: `'Países Bajos'` → `bucketName:'Países Bajos'`.

### Country Pages (`espana.html`, etc.)

All 14 country pages are structurally identical. They rely on `data-page="country"` and `data-country="<id>"` on `<body>` to drive `js/app.js`.

```html
<body data-page="country" data-country="espana">
  <div class="site site--country" id="site">
    <header class="header">
      <div class="header__logo">…A & G logo…</div>
      <nav class="tabs-nav" id="tabsNav">
        <button class="tabs-nav__toggle" id="navToggle">…hamburger…</button>
        <ul class="tabs-nav__list" id="tabsList"></ul>  <!-- filled by app.js -->
      </nav>
      <a class="header__back" href="el_archivo_del_tiempo_…html">← Volver</a>
    </header>
    <main class="main" id="mainContent"></main>  <!-- filled by app.js -->
    <footer class="footer">…♡ easter-egg trigger…</footer>
  </div>
  <div class="lightbox" id="lightbox">…</div>
</body>
```

`app.js` reads `countryId` from `document.body.dataset.country`, finds the matching entry in `COUNTRIES`, and calls `buildCountryPage()` which:
1. Populates `#tabsList` with links to all other countries (`buildCountryNav`)
2. Creates a `.country-panel` section with the flag emoji, name, tagline, quote, and masonry gallery
3. Lazy-loads images via `IntersectionObserver` (sets `img.src` from `data-src` when near viewport)

The lightbox (`#lightbox`) is wired to all gallery buttons. Supports keyboard (←/→/Esc) and touch swipe.

---

## JavaScript Files

| File | Purpose |
|------|---------|
| `auth.js` | Session guard — runs first on every page, redirects to `password.html` if not authenticated |
| `password.js` | Form submit handler, password check, confetti on success, animated stars on the login page |
| `countries.js` | Global `COUNTRIES` array — all visited country data |
| `app.js` | Country page builder: tabs nav, masonry gallery, lazy loading, lightbox, swipe |
| `music.js` | Floating ♪ button, plays `audio/love-story.mp3`, persists play/pause state across pages via `sessionStorage` |
| `transitions.js` | Fade-in on load, fade-out on any internal link click (380 ms) |
| `confetti.js` | Exports `launchConfetti({ duration, count, burst, onDone })` |
| `special-mode.js` | Auto-launches confetti on **June 11** and **June 15** (anniversary dates) |
| `easter-egg.js` | Clicking `.heart` in the country page footer shows a private romantic message overlay |

---

## Storage Keys

| Key | Storage | Used by | Value |
|-----|---------|---------|-------|
| `ag_auth` | `sessionStorage` | `auth.js`, `password.js` | `'ok'` when authenticated |
| `ag_ret` | `sessionStorage` | `auth.js`, `password.js` | URL to return to after login |
| `ag_music_t` | `sessionStorage` | `music.js` | Playback position (seconds) |
| `ag_music_p` | `sessionStorage` | `music.js` | `'1'` playing / `'0'` paused |
| `ag_wishlist_v1` | `localStorage` | `bucket-list.html`, `mapa.html` | JSON array of country name strings |

---

## Design System

**Color palette** (CSS custom properties in `style.css`):
```css
--cream:       rgb(159, 161, 255)   /* page background */
--wine:        rgb(58, 58, 152)     /* primary ink / active tab */
--muted:       rgb(107, 107, 230)   /* secondary text */
--gold:        rgb(107, 107, 230)   /* accent (same as muted in current palette) */
--gold-light:  rgb(143, 143, 255)
```

**Map-specific colors** (inline in `mapa.html`):
- Visited:     `rgba(115,80,210,.72)` purple
- Visited hover: `rgba(165,125,255,.88)` lighter purple + glow
- Wishlisted:  `rgba(200,155,35,.5)` gold
- Pending:     `rgba(42,52,120,.55)` dark blue
- Background:  dark navy gradient `rgb(10,8,42)` → `rgb(16,14,60)`

**Fonts**: `Cormorant Garamond` (serif, display) · `Great Vibes` (script) · `Jost` (body sans-serif). All loaded from Google Fonts. All pages declare their own `<link>` to the fonts.

**Aurora effect**: decorative `.aurora` divs (position:fixed, border-radius:50%, large blur) with `@keyframes float` animation. Used on hub, map, bucket-list, password pages.

**Shared header pattern** (map + bucket-list):
```html
<header class="hdr">
  <a class="hdr__logo" href="hub.html">A & G</a>
  <a class="hdr__back" href="hub.html">← Volver</a>
</header>
```
Country pages use `.header` / `.header__back` (from `css/style.css`) instead.

---

## CSP

All pages carry a strict Content Security Policy:
```
default-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src 'self';
script-src 'self' 'unsafe-inline';
```
No external scripts, no CDN, no analytics. Everything must be local.

---

## Known Patterns & Conventions

- **Page-fade transition**: `transitions.js` intercepts all `<a href>` clicks, sets `document.documentElement.style.opacity = '0'`, waits 380 ms, then navigates. Don't use `window.open` for internal links.
- **Country HTML files are clones**: all 14 country `.html` files are identical except for `data-country` and `<title>`. The `app.js` does all the work.
- **No module system**: all JS is plain IIFE or var-based global scripts. Load order in `<script>` tags matters (`countries.js` before `app.js`).
- **Inline styles on mapa.html and bucket-list.html**: these pages do not use `css/style.css`. All their styles are in `<style>` blocks inside the file.
- **Image lazy loading**: gallery images use `data-src` instead of `src`; `IntersectionObserver` in `app.js` sets the real src when the item enters the viewport.
- **Mobile nav toggle**: the country page header has a hamburger button (`#navToggle`) that toggles `.tabs-nav__list--open` on the `<ul>`. Clicking outside closes it.
- **Confetti**: `launchConfetti` must be called after `confetti.js` is loaded. The `onDone` callback fires when the animation completes (used by `password.js` to redirect after the burst).

---

## Wishlist System — How It Works End-to-End

1. User opens `bucket-list.html` and clicks ★ on "Grecia".
2. `toggleWL('Grecia')` adds `'Grecia'` to the array in `localStorage.ag_wishlist_v1`.
3. User opens (or returns to) `mapa.html`.
4. The map's `pageshow` / `visibilitychange` / `focus` / `load` event calls `render()`.
5. Inside `render()`, `getWL()` reads localStorage → `['Grecia']`.
6. For the `greece` GEO entry: `bucketName = 'Grecia'` → `inWL = true` → fill with gold.
7. In the international panel below the map, `buildIntlTags()` similarly reads the wishlist and adds the `.wl` class (golden) to matching tags.

**Naming contract**: the `name` string in `bucket-list.html`'s `EUROPE`/`INTL` arrays must exactly match `bucketName` (or `name`) in `mapa.html`'s `GEO` array.

---

## Special Dates

`special-mode.js` checks `new Date()` on load and auto-launches confetti if today is:
- **June 11** — one of their anniversaries
- **June 15** — the other anniversary date

The confetti fires 1.4 s after page load, with a second burst 2.5 s later.

---

## Easter Egg

`easter-egg.js` (loaded only on country pages) attaches a click listener to `.heart` in the footer. Clicking it shows a private full-screen overlay with a personal message from Álvaro to Gabriela. The message text is hardcoded in the file.
