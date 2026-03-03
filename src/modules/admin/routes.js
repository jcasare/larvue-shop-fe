const adminRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/modules/admin/views/Dashboard.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('@/modules/admin/views/Products/Products.vue'),
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/modules/admin/views/Orders.vue'),
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('@/modules/admin/views/Customers.vue'),
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: () => import('@/modules/admin/views/Analytics.vue'),
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/modules/admin/views/Categories.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/modules/admin/views/Settings.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/admin/views/auth/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/modules/admin/views/auth/ForgotPassword.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import('@/modules/admin/views/auth/ResetPassword.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/modules/admin/views/NotFound.vue'),
  },
]

export default adminRoutes
