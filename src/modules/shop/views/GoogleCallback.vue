<template>
  <div class="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
    <div class="text-center">
      <template v-if="!error">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600 dark:border-gray-700 dark:border-t-teal-400"></div>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Signing you in...</p>
      </template>
      <template v-else>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p class="mt-4 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
        <router-link
          :to="{ name: 'login' }"
          class="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400"
        >
          Back to sign in
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/modules/shop/stores/auth'
import { useCartStore } from '@/modules/shop/stores/cart'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const error = ref('')

onMounted(async () => {
  const code = route.query.code
  if (!code) {
    error.value = 'No authorization code received.'
    return
  }

  try {
    await authStore.handleGoogleCallback(code)
    cartStore.mergeAndSync()
    router.replace({ name: 'home' })
  } catch (err) {
    error.value = err.response?.data?.message || 'Google sign-in failed. Please try again.'
  }
})
</script>
