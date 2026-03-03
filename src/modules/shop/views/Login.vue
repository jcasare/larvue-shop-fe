<template>
  <div class="flex min-h-screen bg-paper dark:bg-[#0A0A0A]">
    <!-- Left brand panel (desktop only) -->
    <div class="relative hidden overflow-hidden lg:flex lg:w-[55%] lg:flex-col lg:justify-between p-10 text-white">
      <!-- Background image -->
      <img
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"></div>

      <!-- Grain texture -->
      <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')"></div>

      <!-- Decorative orbs -->
      <div class="absolute top-[15%] right-[10%] h-48 w-48 rounded-full bg-coral/15 blur-[80px]"></div>
      <div class="absolute bottom-[30%] left-[5%] h-36 w-36 rounded-full bg-white/5 blur-[60px]"></div>

      <!-- Logo top -->
      <div class="relative z-10">
        <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-9 w-auto brightness-0 invert" />
      </div>

      <!-- Testimonial / tagline bottom -->
      <div class="relative z-10">
        <blockquote class="max-w-sm">
          <p class="text-lg font-medium text-white/80 leading-relaxed font-display">
            "The best shopping experience I've ever had online. Curated, beautiful, fast."
          </p>
          <footer class="mt-4 flex items-center gap-3">
            <div class="h-8 w-8 rounded-full bg-white/20"></div>
            <div>
              <p class="text-sm font-medium text-white/80">Sarah J.</p>
              <p class="text-xs text-white/40">Verified Buyer</p>
            </div>
          </footer>
        </blockquote>
        <p class="mt-8 text-[11px] text-white/20">&copy; {{ new Date().getFullYear() }} Larvue Shop. All rights reserved.</p>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="flex w-full flex-1 flex-col px-5 py-8 lg:w-[45%] lg:px-12">
      <!-- Back to shop -->
      <div class="flex justify-end mb-4">
        <router-link
          to="/"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to shop
        </router-link>
      </div>

      <div class="flex flex-1 flex-col items-center justify-center">
      <div class="w-full max-w-[380px] animate-fade-in-up">
        <!-- Mobile logo -->
        <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-9 w-auto lg:hidden" />

        <div class="lg:mt-0 mt-8">
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Welcome back</span>
          <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink lg:text-3xl font-display dark:text-ink">
            Sign in
          </h2>
          <p class="mt-2 text-sm text-ink-muted">
            Don't have an account?
            <router-link :to="{ name: 'register' }" class="font-semibold text-coral hover:text-coral-dark transition-colors">Create one</router-link>
          </p>
        </div>

        <!-- Google login -->
        <button
          @click="handleGoogleLogin"
          :disabled="googleLoading"
          class="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink transition-all hover:bg-ink/[0.03] hover:border-ink/20 dark:border-border dark:bg-surface dark:text-ink dark:hover:bg-white/5 dark:hover:border-white/20"
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
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border dark:border-border"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-paper px-3 text-xs text-ink-muted dark:bg-[#0A0A0A]">or sign in with email</span>
          </div>
        </div>

        <!-- Email/password form -->
        <form class="space-y-4" @submit.prevent="handleLogin">
          <FormInput id="email" v-model="email" label="Email address" type="email" autocomplete="email" />
          <FormInput id="password" v-model="password" label="Password" type="password" autocomplete="current-password" />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="remember"
                type="checkbox"
                class="h-4 w-4 rounded border-border text-ink focus:ring-ink/20 dark:border-border dark:bg-surface"
              />
              <span class="text-xs text-ink-muted">Remember me</span>
            </label>
            <a href="#" class="text-xs font-semibold text-coral hover:text-coral-dark transition-colors">Forgot password?</a>
          </div>

          <div v-if="error" class="rounded-xl bg-coral/5 border border-coral/10 p-3 text-sm text-coral dark:bg-coral/10">
            {{ error }}
          </div>

          <FormButton :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </FormButton>
        </form>
      </div>
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
