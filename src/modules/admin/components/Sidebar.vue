<template>
  <!-- Mobile overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="$emit('close')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.06] bg-[#0C0C0C] transition-all duration-300 lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full',
      collapsed ? 'w-[72px]' : 'w-64',
    ]"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center border-b border-white/[0.06]" :class="collapsed ? 'justify-center px-0' : 'px-5'">
      <img
        src="@/assets/vular-logo.png"
        alt="Larvue"
        :class="collapsed ? 'h-7 w-auto' : 'h-8 w-auto'"
        class="brightness-0 invert opacity-80"
      />
      <button
        class="ml-auto rounded-lg p-1.5 text-white/30 hover:bg-white/5 hover:text-white/60 lg:hidden"
        @click="$emit('close')"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4" :class="collapsed ? 'px-2' : 'px-3'">
      <!-- Section label -->
      <p v-if="!collapsed" class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20">Menu</p>

      <div class="space-y-0.5">
        <router-link
          v-for="item in mainNav"
          :key="item.name"
          :to="item.to"
          :title="collapsed ? item.label : undefined"
          :class="[
            'group flex items-center rounded-xl text-[13px] font-medium transition-all duration-200',
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2',
            isActive(item.to)
              ? 'bg-white/[0.08] text-white'
              : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70',
          ]"
          @click="$emit('close')"
        >
          <component
            :is="item.icon"
            class="h-[18px] w-[18px] shrink-0 transition-colors"
            :class="isActive(item.to) ? 'text-coral' : 'text-white/30 group-hover:text-white/50'"
          />
          <span v-if="!collapsed">{{ item.label }}</span>
          <span
            v-if="!collapsed && item.badge"
            class="ml-auto rounded-full bg-coral/15 px-2 py-0.5 text-[10px] font-bold text-coral"
          >
            {{ item.badge }}
          </span>
        </router-link>
      </div>

      <!-- Catalog section -->
      <p v-if="!collapsed" class="mb-2 mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20">Catalog</p>
      <div v-else class="my-4 mx-2 border-t border-white/[0.06]"></div>

      <div class="space-y-0.5">
        <router-link
          v-for="item in catalogNav"
          :key="item.name"
          :to="item.to"
          :title="collapsed ? item.label : undefined"
          :class="[
            'group flex items-center rounded-xl text-[13px] font-medium transition-all duration-200',
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2',
            isActive(item.to)
              ? 'bg-white/[0.08] text-white'
              : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70',
          ]"
          @click="$emit('close')"
        >
          <component
            :is="item.icon"
            class="h-[18px] w-[18px] shrink-0 transition-colors"
            :class="isActive(item.to) ? 'text-coral' : 'text-white/30 group-hover:text-white/50'"
          />
          <span v-if="!collapsed">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- User profile -->
    <div class="border-t border-white/[0.06] p-3" :class="collapsed ? 'p-2' : ''">
      <button
        :class="[
          'flex w-full items-center rounded-xl text-left transition-all hover:bg-white/[0.04]',
          collapsed ? 'justify-center p-2' : 'gap-3 p-2',
        ]"
        :title="collapsed ? userName : undefined"
        @click="profileMenuOpen = !profileMenuOpen"
      >
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-amber text-[11px] font-bold text-white">
          {{ userInitials }}
        </div>
        <template v-if="!collapsed">
          <div class="flex-1 min-w-0">
            <p class="truncate text-[13px] font-medium text-white/80">{{ userName }}</p>
            <p class="truncate text-[11px] text-white/30">{{ userEmail }}</p>
          </div>
          <ChevronUpIcon class="h-4 w-4 shrink-0 text-white/20" />
        </template>
      </button>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="profileMenuOpen"
          :class="[
            'absolute bottom-full mb-2 rounded-xl border border-white/[0.08] bg-[#141414] py-1 shadow-2xl',
            collapsed ? 'left-2 w-48' : 'left-3 right-3',
          ]"
        >
          <router-link
            to="/settings"
            class="flex items-center gap-2.5 px-4 py-2 text-[13px] text-white/50 hover:bg-white/[0.04] hover:text-white/80 transition-colors"
            @click="profileMenuOpen = false; $emit('close')"
          >
            <Cog6ToothIcon class="h-4 w-4" />
            Settings
          </router-link>
          <button
            class="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-white/50 hover:bg-white/[0.04] hover:text-coral transition-colors"
            @click="logout"
          >
            <ArrowRightStartOnRectangleIcon class="h-4 w-4" />
            Sign out
          </button>
        </div>
      </Transition>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/admin/stores/auth'
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const profileMenuOpen = ref(false)

defineProps({
  open: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
})

defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
})

const mainNav = [
  { label: 'Dashboard', to: '/dashboard', icon: Squares2X2Icon, name: 'dashboard' },
  { label: 'Orders', to: '/orders', icon: ClipboardDocumentListIcon, name: 'orders', badge: '3' },
  { label: 'Customers', to: '/customers', icon: UsersIcon, name: 'customers' },
  { label: 'Analytics', to: '/analytics', icon: ChartBarIcon, name: 'analytics' },
]

const catalogNav = [
  { label: 'Products', to: '/products', icon: ShoppingBagIcon, name: 'products' },
  { label: 'Categories', to: '/categories', icon: TagIcon, name: 'categories' },
]

function isActive(path) {
  return route.path === path
}

async function logout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
