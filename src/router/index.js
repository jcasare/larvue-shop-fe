import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'
import Orders from '@/views/Orders.vue'
import Settings from '@/views/Settings.vue'
import Analytics from '@/views/Analytics.vue'
import Customers from '@/views/Customers.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/products',
                name: 'products',
                component: Products
            },
            {
                path: '/orders',
                name: 'orders',
                component: Orders
            },
            {
                path: '/customers',
                name: 'customers',
                component: Customers
            },
            {
                path: '/analytics',
                name: 'analytics',
                component: Analytics
            },
            {
                path: '/settings',
                name: 'settings',
                component: Settings
            }
        ]

    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },

    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            requiresGuest: true
        }
    },

    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword,
        meta: {
            requiresGuest: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
]


 const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.getAuthenticated) {
        next({
            name: 'login'
        })
    } else if(to.matched.some(record => record.meta.requiresGuest && authStore.getAuthenticated)) {
        next({
            name: 'dashboard'
        })
    } else {
        next()
    }
})

export default router