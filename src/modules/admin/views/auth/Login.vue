<template>
  <div class="flex min-h-screen bg-paper dark:bg-[#080808]">
    <!-- Left panel — branding (always dark) -->
    <div class="relative hidden overflow-hidden lg:flex lg:w-[55%] lg:flex-col lg:justify-between p-10">
      <div class="absolute inset-0 bg-ink dark:bg-[#080808]"></div>
      <div class="absolute top-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-coral/8 blur-[120px]"></div>
      <div class="absolute bottom-[15%] right-[10%] h-[400px] w-[400px] rounded-full bg-amber/6 blur-[100px]"></div>
      <div class="absolute top-[60%] left-[50%] h-[300px] w-[300px] rounded-full bg-forest/5 blur-[80px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

      <div class="relative z-10">
        <img src="@/assets/vular-logo.png" alt="Larvue" class="h-8 w-auto brightness-0 invert opacity-60" />
      </div>

      <div class="relative z-10 max-w-lg">
        <h1 class="text-4xl font-bold tracking-tight text-white/90 font-display leading-[1.15]">
          Command your<br />store with clarity
        </h1>
        <p class="mt-5 text-base text-white/30 leading-relaxed max-w-md">
          Manage products, track orders, and grow your business — all from one powerful dashboard.
        </p>
        <div class="mt-8 flex flex-wrap gap-2">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/40">
            <span class="h-1.5 w-1.5 rounded-full bg-coral"></span>
            Real-time Analytics
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/40">
            <span class="h-1.5 w-1.5 rounded-full bg-forest"></span>
            Inventory Control
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/40">
            <span class="h-1.5 w-1.5 rounded-full bg-amber"></span>
            Order Management
          </span>
        </div>
      </div>

      <p class="relative z-10 text-[11px] text-white/15">&copy; {{ new Date().getFullYear() }} Larvue. All rights reserved.</p>
    </div>

    <!-- Right panel — form -->
    <div class="flex w-full flex-1 flex-col px-5 py-8 lg:w-[45%] lg:px-16">
      <div class="flex flex-1 flex-col items-center justify-center">
        <div class="w-full max-w-[360px] animate-fade-in-up">
          <!-- Mobile logo -->
          <img src="@/assets/vular-logo.png" alt="Larvue" class="h-8 w-auto lg:hidden mb-10 dark:brightness-0 dark:invert dark:opacity-60" />

          <div>
            <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/25">Admin Portal</span>
            <h2 class="mt-1.5 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">
              Welcome back
            </h2>
            <p class="mt-2 text-sm text-ink-muted dark:text-white/30">
              Sign in to access your dashboard
            </p>
          </div>

          <form class="mt-8 space-y-5" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/15 dark:focus:ring-white/10"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label for="password" class="block text-xs font-medium text-ink-light dark:text-white/40">Password</label>
                <router-link :to="{ name: 'forgot-password' }" class="text-[11px] font-semibold text-coral hover:text-coral-dark transition-colors">Forgot?</router-link>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/15 dark:focus:ring-white/10"
                placeholder="Your password"
              />
            </div>

            <div class="flex items-center gap-2">
              <input
                id="remember"
                v-model="remember"
                type="checkbox"
                class="h-4 w-4 rounded border-border bg-surface text-coral focus:ring-coral/30 focus:ring-offset-0 dark:border-white/10 dark:bg-white/5"
              />
              <label for="remember" class="text-xs text-ink-muted dark:text-white/30">Remember me</label>
            </div>

            <div v-if="error" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
              {{ error }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="flex w-full justify-center rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/admin/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value, remember.value)
    router.push({ name: 'dashboard' })
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
</script>
