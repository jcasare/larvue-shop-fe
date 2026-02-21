import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
    {path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword
    },

    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})
