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
│   │   ├── stores/             # Admin auth & products stores
│   │   └── views/              # Dashboard, Products, Orders, etc.
│   └── shop/                   # Customer portal (shop.*)
│       ├── layouts/            # ShopLayout (navbar + footer)
│       ├── routes.js           # Shop route definitions
│       ├── stores/             # Customer auth store
│       └── views/              # Home, Products, Cart, Login, Register
├── shared/                     # Code shared across both portals
│   ├── components/form/        # FormInput, FormButton
│   ├── helpers/axios/          # Axios instance with interceptors
│   └── layouts/                # AuthLayout (login/register pages)
├── App.vue
├── main.js
└── style.css
```

## How Subdomain Routing Works

The app detects the hostname at startup (`src/router/portal.js`):

- `manage.*` → loads admin routes, admin auth store, admin layout
- Everything else → loads shop routes, shop auth store, shop layout

Both portals are lazy-loaded, so admin code is never downloaded by shop users and vice versa. Each portal uses its own Pinia auth store with separate sessionStorage keys (`adminToken`/`shopToken`).

## Getting Started

### 1. Configure local subdomains

Add these lines to `/etc/hosts`:

```
127.0.0.1  shop.larvue.local
127.0.0.1  manage.larvue.local
```

On macOS:

```bash
sudo nano /etc/hosts
# add the lines above, save, then flush DNS:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
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
- Home page with hero section
- Product listing and detail pages (scaffolded)
- Shopping cart (scaffolded)
- Customer login and registration
- Responsive navbar with cart icon

### Shared
- Light/dark mode (system preference detection)
- Reusable form components (FormInput, FormButton)
- Shared auth layout for login/register pages
- Centralized Axios instance with token interceptors
- 404 Not Found pages per portal

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (accessible via subdomains) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
