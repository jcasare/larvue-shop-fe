<template>
  <div>
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/25">Account</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Settings</h1>
    </div>

    <div class="mt-8 max-w-2xl space-y-6 animate-fade-in-up" style="animation-delay: 0.1s">
      <!-- Profile section -->
      <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <h2 class="text-sm font-bold text-ink font-display dark:text-white/80">Profile</h2>
        <p class="mt-1 text-[12px] text-ink-muted dark:text-white/25">Manage your account details.</p>

        <div class="mt-5 space-y-4">
          <div>
            <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Name</label>
            <input
              type="text"
              :value="userName"
              disabled
              class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Email</label>
            <input
              type="email"
              :value="userEmail"
              disabled
              class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90"
            />
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="rounded-2xl border border-coral/20 bg-coral/[0.02] p-6 dark:border-coral/15 dark:bg-coral/[0.03]">
        <h2 class="text-sm font-bold text-coral font-display">Danger Zone</h2>
        <p class="mt-1 text-[12px] text-ink-muted dark:text-white/25">Irreversible actions.</p>
        <button
          @click="handleLogout"
          class="mt-4 rounded-xl border border-coral/30 px-4 py-2 text-sm font-semibold text-coral hover:bg-coral/5 transition-colors"
        >
          Sign out of all devices
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/admin/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || '')
const userEmail = computed(() => authStore.user?.email || '')

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
