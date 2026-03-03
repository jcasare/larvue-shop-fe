<template>
  <div>
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/25">Management</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Customers</h1>
    </div>

    <div class="mt-12 py-16 text-center animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/[0.04]">
        <UsersIcon class="h-7 w-7 text-ink-muted dark:text-white/20" />
      </div>
      <h3 class="mt-5 text-lg font-semibold text-ink font-display dark:text-white/80">No customers yet</h3>
      <p class="mt-2 text-sm text-ink-muted max-w-sm mx-auto dark:text-white/25">
        Customer accounts will appear here once people register on your shop.
      </p>
    </div>
  </div>
</template>

<script setup>
import { UsersIcon } from '@heroicons/vue/24/outline'
</script>
