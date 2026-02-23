# Larvue Shop — Frontend

Vue 3 frontend for the Larvue Shop ecommerce admin dashboard, built with Vite and Tailwind CSS. The backend is powered by Laravel.

## Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **Vite** for dev server and builds
- **Tailwind CSS v4** for styling
- **Pinia** for state management
- **Vue Router** for client-side routing
- **PrimeVue 4** (Aura theme) for data tables and UI components
- **Heroicons** for icons
- **Axios** for HTTP requests

## Features

- Authentication (login, forgot/reset password) with session-based token storage
- Collapsible sidebar navigation with mobile responsiveness
- Light/dark mode (system preference detection)
- Products CRUD with server-side pagination, sorting, and search
- Skeleton loading states on data tables
- 404 Not Found page

## Project Structure

```
src/
├── api/              # API call functions (products, etc.)
├── components/       # Reusable components (Sidebar, form inputs)
├── helpers/          # Axios instance with interceptors
├── layouts/          # App and Auth layout wrappers
├── router/           # Vue Router config with auth guards
├── stores/           # Pinia stores (auth, products)
├── views/            # Page components
│   ├── auth/         # Login, ForgotPassword, ResetPassword
│   └── Products/     # Products page, table, modal
├── main.js           # App entry point
└── style.css         # Global styles + Tailwind config
```

## Getting Started

```bash
npm install
npm run dev
```

Make sure the Laravel backend is running and update the API base URL in `src/helpers/axios/index.js` if needed.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
