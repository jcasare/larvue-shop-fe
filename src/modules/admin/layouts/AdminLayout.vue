<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar
      :open="sidebarOpen"
      :collapsed="sidebarCollapsed"
      @close="sidebarOpen = false"
    />

    <!-- Main content -->
    <div :class="sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'" class="transition-all duration-300">
      <!-- Top header -->
      <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-6">
        <!-- Mobile hamburger -->
        <button
          class="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 lg:hidden"
          @click="sidebarOpen = true"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>

        <!-- Desktop collapse toggle -->
        <button
          class="hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 lg:block"
          @click="sidebarCollapsed = !sidebarCollapsed"
          :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <Bars3BottomLeftIcon class="h-6 w-6" />
        </button>


        <div class="flex-1" />

        <!-- User actions -->
        <div class="flex items-center gap-3">
          <button class="rounded-full p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white">
            <BellIcon class="h-6 w-6" />
          </button>

          <!-- Avatar + dropdown -->
          <div class="relative hidden sm:block">
            <button
              class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="userMenuOpen = !userMenuOpen"
            >
              {{ userInitials }}
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-gray-700"
              >
                <div class="border-b border-gray-100 px-4 py-2 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
                </div>
                <router-link
                  to="/profile"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  @click="userMenuOpen = false"
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
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <router-view />
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
} from '@heroicons/vue/24/outline'
import Sidebar from '@/modules/admin/components/Sidebar.vue'
import { useAuthStore } from '@/modules/admin/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const userMenuOpen = ref(false)

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
