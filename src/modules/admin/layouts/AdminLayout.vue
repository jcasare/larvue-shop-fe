<template>
  <div class="min-h-screen bg-paper dark:bg-[#080808]">
    <Sidebar
      :open="sidebarOpen"
      :collapsed="sidebarCollapsed"
      @close="sidebarOpen = false"
    />

    <!-- Main content -->
    <div :class="sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'" class="transition-all duration-300">
      <!-- Top header -->
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-paper/80 backdrop-blur-xl px-4 sm:px-6 dark:border-white/[0.06] dark:bg-[#080808]/80">
        <!-- Mobile hamburger -->
        <button
          class="rounded-lg p-2 text-ink-muted hover:bg-ink/5 hover:text-ink transition-colors lg:hidden dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
          @click="sidebarOpen = true"
        >
          <Bars3Icon class="h-5 w-5" />
        </button>

        <!-- Desktop collapse toggle -->
        <button
          class="hidden rounded-lg p-2 text-ink-muted hover:bg-ink/5 hover:text-ink transition-colors lg:block dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
          @click="sidebarCollapsed = !sidebarCollapsed"
          :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <Bars3BottomLeftIcon class="h-5 w-5" />
        </button>

        <!-- Breadcrumb / Page title -->
        <div class="flex items-center gap-2">
          <span class="text-[13px] font-medium text-ink-light capitalize dark:text-white/60">{{ currentPageName }}</span>
        </div>

        <div class="flex-1" />

        <!-- Search -->
        <div class="relative hidden sm:block">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted dark:text-white/20" />
          <input
            type="text"
            placeholder="Search..."
            class="h-9 w-56 rounded-lg border border-border bg-surface pl-9 pr-4 text-[13px] text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white/80 dark:placeholder:text-white/20 dark:focus:border-white/10 dark:focus:ring-white/10"
          />
          <kbd class="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-paper px-1.5 py-0.5 text-[10px] text-ink-muted font-mono dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/20">/</kbd>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1">
          <button class="relative rounded-lg p-2 text-ink-muted hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60">
            <BellIcon class="h-5 w-5" />
            <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral"></span>
          </button>

          <!-- Avatar -->
          <div class="relative">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-coral to-amber text-[11px] font-bold text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-coral/30 focus:ring-offset-2 focus:ring-offset-paper dark:focus:ring-offset-[#080808]"
              @click="userMenuOpen = !userMenuOpen"
            >
              {{ userInitials }}
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-border bg-surface py-1 shadow-2xl dark:border-white/[0.08] dark:bg-[#141414]"
              >
                <div class="border-b border-border px-4 py-2.5 dark:border-white/[0.06]">
                  <p class="text-[13px] font-medium text-ink dark:text-white/80">{{ userName }}</p>
                  <p class="text-[11px] text-ink-muted dark:text-white/30">{{ userEmail }}</p>
                </div>
                <router-link
                  to="/settings"
                  class="flex items-center gap-2.5 px-4 py-2 text-[13px] text-ink-light hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-white/80"
                  @click="userMenuOpen = false"
                >
                  <UserCircleIcon class="h-4 w-4" />
                  Your Profile
                </router-link>
                <button
                  class="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-ink-light hover:bg-ink/5 hover:text-coral transition-colors dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-coral"
                  @click="logout"
                >
                  <ArrowRightStartOnRectangleIcon class="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <router-view v-slot="{ Component }">
          <Transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import Sidebar from '@/modules/admin/components/Sidebar.vue'
import { useAuthStore } from '@/modules/admin/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const userMenuOpen = ref(false)

const currentPageName = computed(() => route.name || 'Dashboard')
const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
})

async function logout() {
  userMenuOpen.value = false
  await authStore.logout()
  router.push({ name: 'login' })
}

function closeOnOutsideClick(e) {
  if (userMenuOpen.value && !e.target.closest('.relative')) {
    userMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onUnmounted(() => document.removeEventListener('click', closeOnOutsideClick))
</script>
