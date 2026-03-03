# Larvue Shop — Frontend

Vue 3 frontend for the Larvue Shop ecommerce platform, built with Vite and Tailwind CSS. Serves both the **customer shop** and **admin dashboard** from a single app using subdomain-based routing.

| Subdomain | Portal | Description |
| --- | --- | --- |
| `shop.larvue.local` or `shop.larvue.localhost` | Customer Shop | Browse products, cart, login/register |
| `manage.larvue.local` or `manage.larvue.localhost` | Admin Dashboard | Product CRUD, orders, analytics |

> **Note:** `.localhost` subdomains (e.g. `shop.larvue.localhost`) resolve automatically without `/etc/hosts` entries on most systems. Use `.larvue.local` if you prefer explicit host entries.

## Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **Vite 7** for dev server and builds
- **Tailwind CSS v4** for styling
- **Pinia** for state management
- **Vue Router 4** for client-side routing (subdomain-aware)
- **PrimeVue 4** (Aura theme) for admin data tables and UI components
- **Heroicons** for icons
- **Axios** for HTTP requests
- **Google Fonts** — Syne (display) + DM Sans (body)

## Project Structure

```
src/
├── router/
│   ├── index.js                # Subdomain detection + route loading
│   └── portal.js               # getPortal() helper
├── modules/
│   ├── admin/                  # Admin portal (manage.*)
│   │   ├── api/                # Admin API calls (products CRUD)
│   │   ├── components/         # Admin-only components (Sidebar)
│   │   ├── layouts/            # AdminLayout (sidebar + header)
│   │   ├── routes.js           # Admin route definitions
│   │   ├── stores/             # Admin auth store
│   │   └── views/              # Dashboard, Products, Orders, etc.
│   └── shop/                   # Customer portal (shop.*)
│       ├── api/                # Shop API calls (products, cart)
│       ├── components/         # Shop components (cards, carousel, filters, etc.)
│       ├── data/               # Mock data fallback (products, categories, promos)
│       ├── layouts/            # ShopLayout (navbar + footer)
│       ├── routes.js           # Shop route definitions (slug-based product URLs)
│       ├── stores/             # Auth, products & cart stores
│       └── views/              # Home, Products, ProductDetail, Cart, Deals, Wishlist, Account, Login, Register
├── shared/                     # Code shared across both portals
│   ├── components/form/        # FormInput, FormButton
│   ├── helpers/axios/          # Axios instance with cookie-based auth
│   └── layouts/                # AuthLayout (login/register pages)
├── App.vue
├── main.js
└── style.css
```

## How Subdomain Routing Works

The app detects the hostname at startup (`src/router/portal.js`):

- `manage.*` → loads admin routes, admin auth store, admin layout
- `shop.*` or a known bare host (`localhost`, `127.0.0.1`, `larvue.local`, `larvue.localhost`) → loads shop routes, shop auth store, shop layout
- Any other subdomain → shows an "Invalid Subdomain" error page

Known hosts are defined in the `KNOWN_HOSTS` array in `src/router/portal.js`. Add your production domain there when deploying.

Both portals are lazy-loaded, so admin code is never downloaded by shop users and vice versa.

## Authentication

The app uses **Sanctum cookie/session-based SPA authentication**. No tokens are stored in JavaScript — the browser manages `httpOnly` session cookies automatically.

### How it works

1. Before login, axios calls `GET /sanctum/csrf-cookie` (on the API subdomain) to get an `XSRF-TOKEN` cookie
2. Login POST is sent — axios reads the `XSRF-TOKEN` from `document.cookie` and sends it as the `X-XSRF-TOKEN` header
3. Laravel verifies the CSRF token, authenticates the user, and responds with an `httpOnly` session cookie
4. All subsequent requests include the session cookie automatically (via `withCredentials: true`)
5. On logout, the session is destroyed server-side

### Why not tokens?

Session cookies are `httpOnly` — JavaScript cannot read them. This means even if an XSS vulnerability exists, an attacker cannot steal the auth credential. With token-based auth, the token lives in `sessionStorage` and is readable by any JavaScript on the page.

### Cross-origin cookie sharing

All services must be on the same parent domain (`.larvue.localhost`) for cookies to work:

| Service | URL |
| --- | --- |
| API | `http://api.larvue.localhost:8000` |
| Shop | `http://shop.larvue.localhost:5173` |
| Admin | `http://manage.larvue.localhost:5173` |

The backend sets cookies with `domain=.larvue.localhost`, so they are shared across all subdomains. The axios instance is configured with:

- **`withCredentials: true`** — tells the browser to send cookies on cross-origin requests
- **`withXSRFToken: true`** — tells axios to read the `XSRF-TOKEN` cookie and send it as the `X-XSRF-TOKEN` header on cross-origin requests (required since axios 1.6+, which stopped sending XSRF headers cross-origin by default)

### Auth endpoints (unified for all roles)

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/api/auth/login`           | Login (all roles)        |
| POST   | `/api/auth/register`        | Register (customer only) |
| GET    | `/api/auth/user`            | Get authenticated user   |
| POST   | `/api/auth/logout`          | Logout (destroy session) |
| GET    | `/api/auth/google/redirect` | Google OAuth redirect    |
| GET    | `/api/auth/google/callback` | Google OAuth callback    |

The frontend reads `user.role` from the response to determine portal access and redirects.

## Getting Started

### 1. Configure local subdomains

**Option A — Use `.larvue.localhost` (no hosts file needed):**

`.localhost` subdomains resolve to `127.0.0.1` automatically on most operating systems. Just open `http://shop.larvue.localhost:5173` and `http://manage.larvue.localhost:5173`.

**Option B — Use `.larvue.local` (requires hosts file):**

Add these lines to `/etc/hosts`:

```
127.0.0.1  shop.larvue.local
127.0.0.1  manage.larvue.local
```

**macOS:**

```bash
sudo nano /etc/hosts
# add the lines above, save, then flush DNS:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

**Linux:**

```bash
sudo nano /etc/hosts
# add the lines above, save. Changes take effect immediately.
```

**Windows (Run Notepad as Administrator):**

```
notepad C:\Windows\System32\drivers\etc\hosts
# add the lines above, save. Then flush DNS:
ipconfig /flushdns
```

**Note:** Vite 7+ blocks requests from unrecognized hostnames by default. The subdomains are already whitelisted in `vite.config.js` via `allowedHosts`. If you add new subdomains, update that list too. Both `.larvue.local` and `.larvue.localhost` variants are whitelisted in the backend CORS and Sanctum configs.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Create a `.env` file:

```
VITE_API_BASE_URL=http://api.larvue.localhost:8000/api
```

The API URL **must** be on a `.larvue.localhost` subdomain (not plain `localhost`) so that session/CSRF cookies (set with `domain=.larvue.localhost`) are shared between the frontend and API. If you use `http://localhost:8000`, the cookies won't be sent cross-origin and auth will fail with CSRF token mismatch errors.

### 4. Start development

```bash
npm run dev
```

Then open:
- http://shop.larvue.localhost:5173 — Customer shop
- http://manage.larvue.localhost:5173 — Admin dashboard

Make sure the Laravel backend (`larvue-shop`) is running on port 8000 (it will be accessible at `http://api.larvue.localhost:8000` automatically since `.localhost` subdomains resolve to `127.0.0.1`).

## Features

### Admin Portal (`manage.*`)
- Authentication (login, forgot/reset password)
- Collapsible sidebar navigation with mobile responsiveness
- Products CRUD with server-side pagination, sorting, and search (with category and featured fields)
- Discount management modal per product (add/toggle/delete time-based sale prices)
- Category management
- Skeleton loading states on data tables
- Orders, Customers, Analytics, Settings pages (scaffolded)

### Shop Portal (`shop.*`)
- **Design system**: Warm Editorial Luxe aesthetic with Syne + DM Sans typography, warm color palette (paper, ink, coral, forest, amber), glassmorphism header, and staggered reveal animations
- Home page with hero carousel, bento category grid, featured products, promo section, trending products (horizontal scroll), and newsletter signup
- Product listing with category/price/sort filters, active filter chips, pagination, and mobile filter drawer
- Product detail page with image gallery, stock status, quantity selector, expandable info sections, and related products
- Slug-based product URLs (e.g. `/apparel/blue-cotton-tshirt` instead of `/products/123`)
- Quick-view modal for products (launched from cards and related items)
- Shopping cart with quantity controls, order summary, free shipping progress bar, and estimated tax
- Dual-mode cart: localStorage for guests, synced to backend for authenticated users (auto-merges on login)
- Deals page with countdown timer and featured deals
- Wishlist page with recommended products
- Account page with profile overview, order history, and saved addresses
- Split-screen login and registration with Google OAuth and validation error handling
- Sticky glassmorphism header with marquee promo bar, search bar, account dropdown, cart badge, and mobile drawer
- Category navigation bar with pill-style active states
- Mock data fallback when the API is unavailable

### Shared
- Light/dark mode (system preference detection) with custom design tokens
- Reusable form components (FormInput, FormButton) with consistent styling
- Centralized Axios instance with cookie-based session auth
- CSS animations (fade-in-up, slide-up, marquee, shimmer skeletons, float)
- Custom scrollbar styling
- 404 Not Found pages per portal

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (accessible via subdomains) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
