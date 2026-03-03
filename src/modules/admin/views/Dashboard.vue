<template>
  <div>
    <!-- Welcome -->
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/40">Overview</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">
        Welcome back, {{ userName }}
      </h1>
      <p class="mt-1 text-sm text-ink-muted dark:text-white/50">Here's what's happening with your store today.</p>
    </div>

    <!-- Stat cards -->
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="rounded-2xl border border-border bg-surface p-5 animate-fade-in-up dark:border-white/[0.06] dark:bg-white/[0.02]"
        :style="{ animationDelay: `${i * 0.05}s` }"
      >
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-ink-muted dark:text-white/50">{{ stat.label }}</span>
          <div :class="['flex h-8 w-8 items-center justify-center rounded-lg', stat.iconBg]">
            <component :is="stat.icon" class="h-4 w-4" :class="stat.iconColor" />
          </div>
        </div>
        <p class="mt-3 text-2xl font-bold text-ink font-display dark:text-white/90">{{ stat.value }}</p>
        <div class="mt-2 flex items-center gap-1.5">
          <span :class="['text-[11px] font-semibold', stat.changePositive ? 'text-forest' : 'text-coral']">
            {{ stat.changePositive ? '+' : '' }}{{ stat.change }}
          </span>
          <span class="text-[11px] text-ink-muted dark:text-white/40">vs last month</span>
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Recent orders -->
      <div class="xl:col-span-2 rounded-2xl border border-border bg-surface p-6 animate-fade-in-up dark:border-white/[0.06] dark:bg-white/[0.02]" style="animation-delay: 0.2s">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-sm font-bold text-ink font-display dark:text-white/80">Recent Orders</h2>
          <router-link to="/orders" class="text-[11px] font-semibold text-coral hover:text-coral-dark transition-colors">View all</router-link>
        </div>

        <div v-if="recentOrders.length === 0" class="py-12 text-center">
          <ClipboardDocumentListIcon class="mx-auto h-8 w-8 text-ink-muted/50 dark:text-white/50" />
          <p class="mt-3 text-sm text-ink-muted dark:text-white/40">No orders yet</p>
          <p class="mt-1 text-[11px] text-ink-muted/70 dark:text-white/45">Orders will appear here once customers start purchasing.</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between rounded-xl border border-border/50 p-3.5 dark:border-white/[0.04]"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 dark:bg-white/[0.04]">
                <span class="text-[11px] font-bold text-ink-light dark:text-white/40">{{ order.initials }}</span>
              </div>
              <div>
                <p class="text-[13px] font-medium text-ink dark:text-white/80">{{ order.customer }}</p>
                <p class="text-[11px] text-ink-muted dark:text-white/40">{{ order.items }} items</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[13px] font-bold text-ink font-display dark:text-white/80">${{ order.total }}</p>
              <span :class="['inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold', statusClass(order.status)]">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity feed -->
      <div class="rounded-2xl border border-border bg-surface p-6 animate-fade-in-up dark:border-white/[0.06] dark:bg-white/[0.02]" style="animation-delay: 0.25s">
        <h2 class="text-sm font-bold text-ink font-display mb-5 dark:text-white/80">Activity</h2>

        <div v-if="activities.length === 0" class="py-12 text-center">
          <ChartBarIcon class="mx-auto h-8 w-8 text-ink-muted/50 dark:text-white/50" />
          <p class="mt-3 text-sm text-ink-muted dark:text-white/40">No activity yet</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="(activity, i) in activities" :key="i" class="flex gap-3">
            <div class="relative flex flex-col items-center">
              <div :class="['h-2 w-2 rounded-full mt-1.5', activity.dotColor]"></div>
              <div v-if="i < activities.length - 1" class="flex-1 w-px bg-border dark:bg-white/[0.06] mt-1"></div>
            </div>
            <div class="pb-4">
              <p class="text-[13px] text-ink dark:text-white/70">{{ activity.text }}</p>
              <p class="mt-0.5 text-[11px] text-ink-muted dark:text-white/50">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-up" style="animation-delay: 0.3s">
      <router-link
        v-for="action in quickActions"
        :key="action.label"
        :to="action.to"
        class="group flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-coral/30 hover:shadow-lg hover:shadow-coral/[0.03] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-coral/20"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 transition-colors group-hover:bg-coral/10 dark:bg-white/[0.04] dark:group-hover:bg-coral/10">
          <component :is="action.icon" class="h-5 w-5 text-ink-muted transition-colors group-hover:text-coral dark:text-white/50 dark:group-hover:text-coral" />
        </div>
        <span class="text-[12px] font-semibold text-ink-light group-hover:text-ink transition-colors dark:text-white/40 dark:group-hover:text-white/70">{{ action.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  EyeIcon,
  PlusIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/modules/admin/stores/auth'

const authStore = useAuthStore()
const userName = computed(() => authStore.user?.name?.split(' ')[0] || 'Admin')

const stats = [
  {
    label: 'Revenue',
    value: '$0.00',
    change: '0%',
    changePositive: true,
    icon: CurrencyDollarIcon,
    iconBg: 'bg-forest/10 dark:bg-forest/15',
    iconColor: 'text-forest',
  },
  {
    label: 'Orders',
    value: '0',
    change: '0%',
    changePositive: true,
    icon: ShoppingCartIcon,
    iconBg: 'bg-coral/10 dark:bg-coral/15',
    iconColor: 'text-coral',
  },
  {
    label: 'Customers',
    value: '0',
    change: '0%',
    changePositive: true,
    icon: UsersIcon,
    iconBg: 'bg-amber/10 dark:bg-amber/15',
    iconColor: 'text-amber',
  },
  {
    label: 'Page Views',
    value: '0',
    change: '0%',
    changePositive: false,
    icon: EyeIcon,
    iconBg: 'bg-ink/5 dark:bg-white/[0.06]',
    iconColor: 'text-ink-muted dark:text-white/40',
  },
]

// Placeholder data — will be replaced by API calls
const recentOrders = []
const activities = []

const quickActions = [
  { label: 'Add Product', to: '/products', icon: PlusIcon },
  { label: 'Categories', to: '/categories', icon: TagIcon },
  { label: 'View Orders', to: '/orders', icon: ClipboardDocumentListIcon },
  { label: 'Analytics', to: '/analytics', icon: ChartBarIcon },
]

function statusClass(status) {
  const map = {
    Pending: 'bg-amber/10 text-amber',
    Processing: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    Shipped: 'bg-forest/10 text-forest',
    Delivered: 'bg-forest/10 text-forest',
    Cancelled: 'bg-coral/10 text-coral',
  }
  return map[status] || 'bg-ink/5 text-ink-muted dark:bg-white/5 dark:text-white/40'
}
</script>
