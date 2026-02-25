<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Navbar -->
    <header class="sticky top-0 z-30 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-10 w-auto" />
        </router-link>

        <!-- Nav links -->
        <nav class="hidden items-center gap-6 md:flex">
          <router-link
            to="/"
            class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Home
          </router-link>
          <router-link
            to="/products"
            class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Products
          </router-link>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <router-link
            to="/cart"
            class="relative rounded-full p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <ShoppingCartIcon class="h-6 w-6" />
          </router-link>

          <template v-if="authStore.getAuthenticated">
            <button
              @click="handleLogout"
              class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              Sign out
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign up
            </router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Larvue Shop. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/modules/shop/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'home' })
}
</script>
