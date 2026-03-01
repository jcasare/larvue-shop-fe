# Larvue Shop — Frontend

Vue 3 frontend for the Larvue Shop ecommerce platform, built with Vite and Tailwind CSS. Serves both the **customer shop** and **admin dashboard** from a single app using subdomain-based routing.

| Subdomain | Portal | Description |
| --- | --- | --- |
| `shop.larvue.local` | Customer Shop | Browse products, cart, login/register |
| `manage.larvue.local` | Admin Dashboard | Product CRUD, orders, analytics |

## Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **Vite** for dev server and builds
- **Tailwind CSS v4** for styling
- **Pinia** for state management
- **Vue Router** for client-side routing (subdomain-aware)
- **PrimeVue 4** (Aura theme) for data tables and UI components
- **Heroicons** for icons
- **Axios** for HTTP requests

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
│       ├── routes.js           # Shop route definitions
│       ├── stores/             # Auth, products & cart stores
│       └── views/              # Home, Products, ProductDetail, Cart, Login, Register
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
- `shop.*` or a known bare host (`localhost`, `127.0.0.1`, `larvue.local`) → loads shop routes, shop auth store, shop layout
- Any other subdomain → shows an "Invalid Subdomain" error page

Known hosts are defined in the `KNOWN_HOSTS` array in `src/router/portal.js`. Add your production domain there when deploying.

Both portals are lazy-loaded, so admin code is never downloaded by shop users and vice versa.

## Authentication

The app uses **Sanctum cookie/session-based SPA authentication**. No tokens are stored in JavaScript — the browser manages `httpOnly` session cookies automatically.

### How it works

1. Before login, axios calls `GET /sanctum/csrf-cookie` to get a CSRF token cookie
2. Login request is sent — Laravel creates a session and responds with an `httpOnly` session cookie
3. Axios is configured with `withCredentials: true`, so the browser sends the session cookie on every subsequent request
4. On logout, the session is destroyed server-side

### Why not tokens?

Session cookies are `httpOnly` — JavaScript cannot read them. This means even if an XSS vulnerability exists, an attacker cannot steal the auth credential. With token-based auth, the token lives in `sessionStorage` and is readable by any JavaScript on the page.

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

**Note:** Vite 7+ blocks requests from unrecognized hostnames by default. The subdomains are already whitelisted in `vite.config.js` via `allowedHosts`. If you add new subdomains, update that list too.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Create a `.env` file (or update `.env.local`):

```
VITE_API_BASE_URL=http://api.larvue.local:8000/api
```

Or leave it unset to default to `http://localhost:8000/api`.

### 4. Start development

```bash
npm run dev
```

Then open:
- http://shop.larvue.local:5173 — Customer shop
- http://manage.larvue.local:5173 — Admin dashboard

Make sure the Laravel backend (`larvue-shop`) is running on port 8000.

## Features

### Admin Portal (`manage.*`)
- Authentication (login, forgot/reset password)
- Collapsible sidebar navigation with mobile responsiveness
- Products CRUD with server-side pagination, sorting, and search
- Skeleton loading states on data tables
- Orders, Customers, Analytics, Settings pages (scaffolded)

### Shop Portal (`shop.*`)
- Home page with hero carousel, category preview grid, featured products, promo section, trending products, and newsletter signup
- Product listing with category/price/sort filters, active filter chips, pagination, and mobile filter drawer
- Product detail page with image gallery, stock status, quantity selector, expandable info sections, and related products
- Quick-view modal for products (launched from cards and related items)
- Shopping cart with quantity controls, order summary, free shipping progress bar, and estimated tax
- Dual-mode cart: localStorage for guests, synced to backend for authenticated users (auto-merges on login)
- Customer login and registration with validation error handling
- Google OAuth login
- Sticky header with search bar (debounced suggestions), account dropdown, cart badge, and mobile drawer
- Category navigation bar with active state highlighting
- Mock data fallback when the API is unavailable

### Shared
- Light/dark mode (system preference detection)
- Reusable form components (FormInput, FormButton)
- Shared auth layout for login/register pages
- Centralized Axios instance with cookie-based session auth
- 404 Not Found pages per portal

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (accessible via subdomains) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
