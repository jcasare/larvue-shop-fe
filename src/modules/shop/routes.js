const shopRoutes = [
  {
    path: '/',
    component: () => import('@/modules/shop/layouts/ShopLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/shop/views/Home.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/modules/shop/views/Products.vue'),
      },
      {
        path: 'products/:id',
        name: 'product-detail-legacy',
        redirect: to => {
          return { name: 'product-detail', params: { category: 'p', slug: to.params.id } }
        },
      },
      {
        path: 'category/:slug',
        name: 'category',
        component: () => import('@/modules/shop/views/Products.vue'),
      },
      {
        path: 'deals',
        name: 'deals',
        component: () => import('@/modules/shop/views/Deals.vue'),
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: () => import('@/modules/shop/views/Wishlist.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/modules/shop/views/Account.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/modules/shop/views/Cart.vue'),
      },
      // Product detail with category/slug URL — must be LAST among children
      // so it doesn't catch routes like /deals, /cart, etc.
      {
        path: ':category/:slug',
        name: 'product-detail',
        component: () => import('@/modules/shop/views/ProductDetail.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/shop/views/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/modules/shop/views/Register.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/auth/google/callback',
    name: 'google-callback',
    component: () => import('@/modules/shop/views/GoogleCallback.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/modules/shop/views/NotFound.vue'),
  },
]

export default shopRoutes
