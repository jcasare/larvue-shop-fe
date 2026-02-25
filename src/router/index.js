import { createRouter, createWebHistory } from 'vue-router'
import { getPortal } from './portal'
import adminRoutes from '@/modules/admin/routes'
import shopRoutes from '@/modules/shop/routes'

const portal = getPortal()

const invalidSubdomainRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'invalid-subdomain',
    component: () => import('@/shared/views/InvalidSubdomain.vue'),
  },
]

const routes = portal === 'admin'
  ? adminRoutes
  : portal === 'shop'
    ? shopRoutes
    : invalidSubdomainRoutes

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!portal) return next()

  let useAuthStore

  if (portal === 'admin') {
    const mod = await import('@/modules/admin/stores/auth')
    useAuthStore = mod.useAuthStore
  } else {
    const mod = await import('@/modules/shop/stores/auth')
    useAuthStore = mod.useAuthStore
  }

  const authStore = useAuthStore()

  // If we have a token but no user data, fetch it
  if (authStore.token && !authStore.user) {
    try {
      await authStore.getUser()
    } catch {
      authStore.setToken(null)
      authStore.setUser(null)
      return next({ name: 'login' })
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.getAuthenticated) {
    next({ name: 'login' })
  } else if (to.matched.some(record => record.meta.requiresGuest) && authStore.getAuthenticated) {
    // Redirect to the default authenticated page for each portal
    next({ name: portal === 'admin' ? 'dashboard' : 'home' })
  } else {
    next()
  }
})

export default router
