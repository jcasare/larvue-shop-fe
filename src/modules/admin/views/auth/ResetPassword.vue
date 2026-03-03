<template>
  <div class="flex min-h-screen items-center justify-center bg-paper px-5 dark:bg-[#080808]">
    <div class="w-full max-w-[380px] animate-fade-in-up">
      <div class="text-center">
        <img src="@/assets/vular-logo.png" alt="Larvue" class="mx-auto h-8 w-auto mb-10 dark:brightness-0 dark:invert dark:opacity-60" />
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/40">Account Recovery</span>
        <h2 class="mt-1.5 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Set new password</h2>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label for="password" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">New password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/35 dark:focus:border-white/15 dark:focus:ring-white/10"
            placeholder="Minimum 8 characters"
          />
        </div>

        <div>
          <label for="password_confirmation" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Confirm password</label>
          <input
            id="password_confirmation"
            v-model="passwordConfirmation"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/35 dark:focus:border-white/15 dark:focus:ring-white/10"
            placeholder="Repeat your password"
          />
        </div>

        <div v-if="error" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full justify-center rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
        >
          {{ loading ? 'Resetting...' : 'Reset password' }}
        </button>
      </form>

      <p class="mt-8 text-center text-[13px] text-ink-muted dark:text-white/40">
        Remember your password?
        <router-link :to="{ name: 'login' }" class="font-semibold text-coral hover:text-coral-dark transition-colors">Back to sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const token = route.params.token

const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const error = ref('')

function handleSubmit() {
  loading.value = true
  error.value = ''
  // TODO: call reset password API with token, password, passwordConfirmation
  console.log('Resetting password with token:', token)
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>
