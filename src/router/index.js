import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
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
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})
