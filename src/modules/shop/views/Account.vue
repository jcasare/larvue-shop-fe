<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Dashboard</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
        My Account
      </h1>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Profile card -->
      <div class="lg:col-span-1 animate-fade-in-up" style="animation-delay: 0.05s">
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-border dark:bg-surface">
          <div class="flex flex-col items-center text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-coral/20 to-amber/20">
              <span class="text-2xl font-bold text-coral font-display">
                {{ authStore.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
              </span>
            </div>
            <h2 class="mt-4 text-lg font-bold text-ink font-display dark:text-ink">
              {{ authStore.user?.name || 'User' }}
            </h2>
            <p class="text-sm text-ink-muted">{{ authStore.user?.email || 'user@example.com' }}</p>
            <div class="mt-4 flex items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-semibold text-forest dark:text-emerald-400">
                Active Member
              </span>
            </div>
          </div>

          <div class="mt-6 border-t border-border pt-4 space-y-2 dark:border-border">
            <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
              <UserIcon class="h-4 w-4 text-ink-muted" />
              Edit Profile
            </button>
            <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
              <LockClosedIcon class="h-4 w-4 text-ink-muted" />
              Change Password
            </button>
            <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
              <BellIcon class="h-4 w-4 text-ink-muted" />
              Notifications
            </button>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Quick stats -->
        <div class="grid grid-cols-3 gap-4 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="rounded-2xl border border-border bg-surface p-5 dark:border-border dark:bg-surface">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10 mb-3">
              <ShoppingBagIcon class="h-5 w-5 text-coral" />
            </div>
            <p class="text-2xl font-bold text-ink font-display dark:text-ink">0</p>
            <p class="text-xs text-ink-muted mt-0.5">Orders</p>
          </div>
          <div class="rounded-2xl border border-border bg-surface p-5 dark:border-border dark:bg-surface">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 mb-3">
              <HeartIcon class="h-5 w-5 text-forest dark:text-emerald-400" />
            </div>
            <p class="text-2xl font-bold text-ink font-display dark:text-ink">0</p>
            <p class="text-xs text-ink-muted mt-0.5">Wishlist</p>
          </div>
          <div class="rounded-2xl border border-border bg-surface p-5 dark:border-border dark:bg-surface">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 mb-3">
              <StarIcon class="h-5 w-5 text-amber" />
            </div>
            <p class="text-2xl font-bold text-ink font-display dark:text-ink">0</p>
            <p class="text-xs text-ink-muted mt-0.5">Reviews</p>
          </div>
        </div>

        <!-- Recent orders (empty state) -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-border dark:bg-surface animate-fade-in-up" style="animation-delay: 0.15s">
          <h3 class="text-sm font-semibold text-ink dark:text-ink">Recent Orders</h3>
          <div class="mt-8 text-center py-8">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5">
              <ShoppingBagIcon class="h-6 w-6 text-ink-muted" />
            </div>
            <p class="mt-4 text-sm text-ink-muted">No orders yet</p>
            <p class="text-xs text-ink-muted mt-1">When you place orders, they'll appear here.</p>
            <router-link
              to="/products"
              class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-coral hover:text-coral-dark transition-colors"
            >
              Start Shopping
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Saved addresses (empty state) -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-border dark:bg-surface animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-ink dark:text-ink">Saved Addresses</h3>
            <button class="text-xs font-semibold text-coral hover:text-coral-dark transition-colors">
              Add New
            </button>
          </div>
          <div class="mt-6 text-center py-6">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5">
              <MapPinIcon class="h-6 w-6 text-ink-muted" />
            </div>
            <p class="mt-4 text-sm text-ink-muted">No addresses saved</p>
            <p class="text-xs text-ink-muted mt-1">Add an address for faster checkout.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  LockClosedIcon,
  BellIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/modules/shop/stores/auth';

const authStore = useAuthStore();
</script>
