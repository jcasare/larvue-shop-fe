<template>
  <div class="flex min-h-screen items-center justify-center bg-paper px-5 dark:bg-[#080808]">
    <div class="w-full max-w-[380px] animate-fade-in-up">
      <div class="text-center">
        <img src="@/assets/vular-logo.png" alt="Larvue" class="mx-auto h-8 w-auto mb-10 dark:brightness-0 dark:invert dark:opacity-60" />
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/25">Account Recovery</span>
        <h2 class="mt-1.5 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Reset your password</h2>
        <p class="mt-2 text-sm text-ink-muted dark:text-white/30">Enter your email and we'll send you a reset link.</p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
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

        <div v-if="success" class="rounded-xl border border-forest/20 bg-forest/5 p-3 text-sm text-forest">
          Check your inbox for a reset link.
        </div>

        <div v-if="error" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full justify-center rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
        >
          {{ loading ? 'Sending...' : 'Send reset link' }}
        </button>
      </form>

      <p class="mt-8 text-center text-[13px] text-ink-muted dark:text-white/25">
        Remember your password?
        <router-link :to="{ name: 'login' }" class="font-semibold text-coral hover:text-coral-dark transition-colors">Back to sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

function handleSubmit() {
  loading.value = true
  error.value = ''
  // TODO: call forgot password API
  setTimeout(() => {
    success.value = true
    loading.value = false
  }, 1000)
}
</script>
