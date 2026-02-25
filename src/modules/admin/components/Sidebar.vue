<template>
  <!-- Mobile overlay -->
  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="$emit('close')"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex flex-col bg-indigo-950 transition-all duration-300 lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full',
      collapsed ? 'w-20' : 'w-72',
    ]"
  >
    <!-- Logo + mobile close -->
    <div class="flex h-16 items-center px-6" :class="collapsed ? 'justify-center px-0' : ''">
      <img
        src="@/assets/vular-logo.png"
        alt="Vular"
        :class="collapsed ? 'h-8 w-auto' : 'h-14 w-auto'"
      />
      <button
        class="ml-auto rounded-md p-1.5 text-indigo-300 hover:bg-indigo-900 hover:text-white lg:hidden"
        @click="$emit('close')"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4" :class="collapsed ? 'px-2' : ''">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        :title="collapsed ? item.label : undefined"
        :class="[
          'group flex items-center rounded-lg text-sm font-medium transition-colors',
          collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2',
          isActive(item.to)
            ? 'bg-indigo-800 text-white'
            : 'text-indigo-200 hover:bg-indigo-900 hover:text-white',
        ]"
        @click="$emit('close')"
      >
        <component
          :is="item.icon"
          class="h-5 w-5 shrink-0"
          :class="isActive(item.to) ? 'text-white' : 'text-indigo-300 group-hover:text-white'"
        />
        <span v-if="!collapsed">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- User profile -->
    <div class="relative border-t border-indigo-800 p-4" :class="collapsed ? 'p-2' : ''">
      <button
        :class="[
          'flex w-full items-center rounded-lg text-left hover:bg-indigo-900',
          collapsed ? 'justify-center p-1' : 'gap-3 p-1',
        ]"
        :title="collapsed ? userName : undefined"
        @click="profileMenuOpen = !profileMenuOpen"
      >
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-sm font-medium text-white">
          {{ userInitials }}
        </div>
        <template v-if="!collapsed">
          <div class="flex-1 min-w-0">
            <p class="truncate text-sm font-medium text-white">{{ userName }}</p>
            <p class="truncate text-xs text-indigo-300">{{ userEmail }}</p>
          </div>
          <ChevronUpIcon class="h-4 w-4 shrink-0 text-indigo-300" />
        </template>
      </button>

      <!-- Dropdown (pops up above) -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="profileMenuOpen"
          :class="[
            'absolute bottom-full mb-2 origin-bottom rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-gray-700',
            collapsed ? 'left-2 w-48' : 'left-3 right-3',
          ]"
        >
          <router-link
            to="/profile"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
            @click="profileMenuOpen = false; $emit('close')"
          >
            <UserCircleIcon class="h-4 w-4 text-gray-400" />
            Your Profile
          </router-link>
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
            @click="logout"
          >
            <ArrowRightStartOnRectangleIcon class="h-4 w-4 text-gray-400" />
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
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const profileMenuOpen = ref(false)

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
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

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: HomeIcon, name: 'dashboard' },
  { label: 'Products', to: '/products', icon: ShoppingBagIcon, name: 'products' },
  { label: 'Orders', to: '/orders', icon: ClipboardDocumentListIcon, name: 'orders' },
  { label: 'Customers', to: '/customers', icon: UsersIcon, name: 'customers' },
  { label: 'Analytics', to: '/analytics', icon: ChartBarIcon, name: 'analytics' },
  { label: 'Settings', to: '/settings', icon: Cog6ToothIcon, name: 'settings' },
]

function isActive(path) {
  return route.path === path
}

async function logout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
