<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Left brand panel (desktop only) -->
    <div class="relative hidden overflow-hidden lg:flex lg:w-[55%] lg:flex-col lg:justify-end p-8 pb-10 text-white">
      <!-- Background image -->
      <img
        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
      <!-- Strong overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/80 to-teal-900/60 login-overlay"></div>

      <!-- Floating animated shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="login-float-1 absolute right-[10%] top-[15%] h-44 w-44 rounded-full bg-white/5"></div>
        <div class="login-float-2 absolute bottom-[35%] left-[8%] h-32 w-32 rounded-full bg-teal-400/10"></div>
        <div class="login-float-3 absolute right-[25%] top-[45%] h-20 w-20 rounded-full bg-white/5"></div>
      </div>

      <!-- Logo pinned top -->
      <div class="absolute left-8 top-8 z-10">
        <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-9 w-auto brightness-0 invert" />
      </div>

      <!-- Copyright anchored to bottom -->
      <p class="relative z-10 text-xs text-white/40">&copy; {{ new Date().getFullYear() }} Larvue Shop. All rights reserved.</p>
    </div>

    <!-- Right form panel -->
    <div class="flex w-full flex-1 flex-col items-center justify-center px-5 py-6 lg:w-[45%] lg:px-10">
      <div class="w-full max-w-[360px]">
        <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-10 w-auto" />

        <h2 class="mt-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
          Sign in to your account
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <router-link :to="{ name: 'register' }" class="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400">Create one</router-link>
        </p>

        <!-- Google login -->
        <button
          @click="handleGoogleLogin"
          :disabled="googleLoading"
          class="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {{ googleLoading ? 'Redirecting...' : 'Continue with Google' }}
        </button>

        <!-- Divider -->
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-gray-50 px-3 text-gray-500 dark:bg-gray-950 dark:text-gray-400">or sign in with email</span>
          </div>
        </div>

        <!-- Email/password form -->
        <form class="space-y-3.5" @submit.prevent="handleLogin">
          <FormInput id="email" v-model="email" label="Email address" type="email" autocomplete="email" />
          <FormInput id="password" v-model="password" label="Password" type="password" autocomplete="current-password" />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2">
              <input
                v-model="remember"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span class="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <a href="#" class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">Forgot password?</a>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {{ error }}
          </div>

          <FormButton :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </FormButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormInput from '@/shared/components/form/FormInput.vue'
import FormButton from '@/shared/components/form/FormButton.vue'
import { useAuthStore } from '@/modules/shop/stores/auth'
import { useCartStore } from '@/modules/shop/stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const googleLoading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    cartStore.mergeAndSync()
    router.push({ name: 'home' })
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.status === 401) {
      error.value = 'Invalid email or password.'
    } else {
      error.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

async function handleGoogleLogin() {
  googleLoading.value = true
  error.value = ''
  try {
    await authStore.googleLogin()
  } catch (err) {
    error.value = 'Could not connect to Google. Please try again.'
    googleLoading.value = false
  }
}
</script>

<style scoped>
.login-overlay {
  animation: overlay-shift 8s ease-in-out infinite alternate;
}

@keyframes overlay-shift {
  0% { opacity: 0.85; }
  100% { opacity: 0.92; }
}

.login-float-1 {
  animation: float-1 6s ease-in-out infinite;
}
.login-float-2 {
  animation: float-2 8s ease-in-out infinite;
}
.login-float-3 {
  animation: float-3 7s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-2 {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(15px) translateX(10px); }
}
@keyframes float-3 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(0.95); }
}
</style>
