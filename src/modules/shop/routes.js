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
        name: 'product-detail',
        component: () => import('@/modules/shop/views/ProductDetail.vue'),
      },
      {
        path: 'category/:slug',
        name: 'category',
        component: () => import('@/modules/shop/views/Products.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/modules/shop/views/Cart.vue'),
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/modules/shop/views/NotFound.vue'),
  },
]

export default shopRoutes
