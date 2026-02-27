<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
    <!-- Top promo bar -->
    <div class="bg-teal-600 dark:bg-teal-800">
      <div class="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-xs font-medium text-white sm:text-sm sm:px-6 lg:px-8">
        <TruckIcon class="mr-1.5 h-4 w-4 hidden sm:block" />
        Free shipping on orders over $50
        <span class="mx-2 hidden sm:inline text-teal-300">|</span>
        <span class="hidden sm:inline">Use code <strong>SAVE10</strong> for 10% off your first order</span>
      </div>
    </div>

    <!-- Main header -->
    <header class="sticky top-0 z-30 bg-white shadow-sm dark:bg-gray-800">
      <!-- Primary nav row -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center gap-4">
            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = true"
              class="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Bars3Icon class="h-6 w-6" />
            </button>

            <!-- Logo -->
            <router-link to="/" class="flex shrink-0 items-center">
              <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-8 w-auto sm:h-9" />
            </router-link>

            <!-- Search bar — centered, takes available space -->
            <div class="hidden flex-1 justify-center px-8 lg:flex">
              <SearchBar class="w-full max-w-2xl" />
            </div>

            <!-- Right actions -->
            <div class="ml-auto flex items-center gap-1 sm:gap-2">
              <!-- Account -->
              <div class="relative" @mouseenter="accountOpen = true" @mouseleave="accountOpen = false">
                <button class="flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:px-3 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                  <UserIcon class="h-5 w-5" />
                  <div class="hidden text-left sm:block">
                    <p class="text-[10px] leading-none text-gray-500 dark:text-gray-400">
                      {{ authStore.getAuthenticated ? `Hello, ${authStore.user?.name?.split(' ')[0] || 'User'}` : 'Hello, Sign in' }}
                    </p>
                    <p class="text-xs font-semibold leading-tight">Account</p>
                  </div>
                  <ChevronDownIcon class="hidden h-3.5 w-3.5 text-gray-400 sm:block" />
                </button>
                <!-- Account dropdown -->
                <Transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="scale-95 opacity-0"
                  enter-to-class="scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="scale-100 opacity-100"
                  leave-to-class="scale-95 opacity-0"
                >
                  <div
                    v-if="accountOpen"
                    class="absolute right-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    <template v-if="authStore.getAuthenticated">
                      <div class="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ authStore.user?.name || 'User' }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
                      </div>
                      <div class="py-1">
                        <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                          <UserIcon class="h-4 w-4 text-gray-400" /> My Profile
                        </a>
                        <router-link to="/cart" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                          <ShoppingBagIcon class="h-4 w-4 text-gray-400" /> Orders
                        </router-link>
                        <button
                          @click="handleLogout"
                          class="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-gray-700"
                        >
                          <ArrowLeftStartOnRectangleIcon class="h-4 w-4" /> Sign out
                        </button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="p-4">
                        <router-link
                          to="/login"
                          class="block w-full rounded-lg bg-teal-600 py-2 text-center text-sm font-semibold text-white hover:bg-teal-700"
                        >
                          Sign in
                        </router-link>
                        <p class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                          New customer?
                          <router-link to="/register" class="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
                            Start here
                          </router-link>
                        </p>
                      </div>
                    </template>
                  </div>
                </Transition>
              </div>

              <!-- Wishlist / Orders -->
              <button class="hidden rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:flex sm:items-center sm:gap-1 sm:px-3 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                <HeartIcon class="h-5 w-5" />
                <div class="hidden text-left md:block">
                  <p class="text-[10px] leading-none text-gray-500 dark:text-gray-400">Returns</p>
                  <p class="text-xs font-semibold leading-tight">& Orders</p>
                </div>
              </button>

              <!-- Cart -->
              <router-link
                to="/cart"
                class="relative flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:px-3 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <div class="relative">
                  <ShoppingCartIcon class="h-6 w-6" />
                  <span
                    v-if="cartStore.count > 0"
                    class="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-gray-900"
                  >
                    {{ cartStore.count > 99 ? '99+' : cartStore.count }}
                  </span>
                </div>
                <span class="hidden text-xs font-semibold sm:block">Cart</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile search row -->
      <div class="border-b border-gray-100 px-4 py-2 lg:hidden dark:border-gray-700">
        <SearchBar />
      </div>

      <!-- Category navigation bar -->
      <StoreNavigation :categories="productStore.categories" />
    </header>

    <!-- Mobile menu drawer -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="fixed inset-0 bg-black/50" @click="mobileMenuOpen = false"></div>
          <div class="fixed inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl dark:bg-gray-800">
            <!-- Drawer header -->
            <div class="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
              <div class="flex items-center gap-2">
                <UserCircleIcon class="h-7 w-7 text-gray-400" />
                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ authStore.getAuthenticated ? `Hello, ${authStore.user?.name?.split(' ')[0]}` : 'Hello, Sign in' }}
                </span>
              </div>
              <button @click="mobileMenuOpen = false" class="rounded-md p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <!-- Drawer body -->
            <nav class="flex-1 overflow-y-auto">
              <div class="p-4 space-y-1">
                <p class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Trending</p>
                <router-link
                  to="/products?sort=popular"
                  @click="mobileMenuOpen = false"
                  class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Best Sellers
                </router-link>
                <router-link
                  to="/products?sort=newest"
                  @click="mobileMenuOpen = false"
                  class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  New Releases
                </router-link>
                <router-link
                  to="/products"
                  @click="mobileMenuOpen = false"
                  class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  All Products
                </router-link>
              </div>
              <div class="border-t border-gray-200 p-4 space-y-1 dark:border-gray-700">
                <p class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Shop by Category</p>
                <router-link
                  v-for="cat in productStore.categories"
                  :key="cat.id || cat.name"
                  :to="{ name: 'products', query: { category: cat.slug || cat.name } }"
                  @click="mobileMenuOpen = false"
                  class="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {{ cat.name }}
                </router-link>
              </div>
              <div class="border-t border-gray-200 p-4 space-y-1 dark:border-gray-700">
                <p class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Help & Settings</p>
                <a href="#" class="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  Your Account
                </a>
                <a href="#" class="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  Customer Service
                </a>
                <template v-if="authStore.getAuthenticated">
                  <button
                    @click="handleLogout(); mobileMenuOpen = false"
                    class="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </template>
                <template v-else>
                  <router-link
                    to="/login"
                    @click="mobileMenuOpen = false"
                    class="block rounded-lg px-3 py-2 text-sm font-medium text-teal-600 hover:bg-gray-100 dark:text-teal-400 dark:hover:bg-gray-700"
                  >
                    Sign In
                  </router-link>
                </template>
              </div>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Page content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-900 dark:border-gray-700">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <!-- Company -->
          <div>
            <h3 class="text-sm font-semibold text-white">Get to Know Us</h3>
            <ul class="mt-4 space-y-2.5">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">About Larvue</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Press Center</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Investor Relations</a></li>
            </ul>
          </div>
          <!-- Customer Service -->
          <div>
            <h3 class="text-sm font-semibold text-white">Customer Service</h3>
            <ul class="mt-4 space-y-2.5">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Returns & Replacements</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Shipping Rates</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Order Tracking</a></li>
            </ul>
          </div>
          <!-- Make Money -->
          <div>
            <h3 class="text-sm font-semibold text-white">Make Money with Us</h3>
            <ul class="mt-4 space-y-2.5">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Sell on Larvue</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Affiliate Program</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Advertise Products</a></li>
            </ul>
          </div>
          <!-- Legal -->
          <div>
            <h3 class="text-sm font-semibold text-white">Policies</h3>
            <ul class="mt-4 space-y-2.5">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Privacy Notice</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-10 flex flex-col items-center gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:justify-between">
          <div class="flex items-center gap-3">
            <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-7 w-auto opacity-70" />
          </div>
          <p class="text-xs text-gray-500">
            &copy; {{ new Date().getFullYear() }} Larvue Shop. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z"/></svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
  UserCircleIcon,
  HeartIcon,
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
  TruckIcon,
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/modules/shop/stores/auth';
import { useCartStore } from '@/modules/shop/stores/cart';
import { useProductStore } from '@/modules/shop/stores/products';
import SearchBar from '@/modules/shop/components/SearchBar.vue';
import StoreNavigation from '@/modules/shop/components/StoreNavigation.vue';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const mobileMenuOpen = ref(false);
const accountOpen = ref(false);

onMounted(() => {
  productStore.fetchCategories();
  // If user is authenticated, sync cart from backend
  if (authStore.getAuthenticated) {
    cartStore.mergeAndSync();
  }
});

async function handleLogout() {
  accountOpen.value = false;
  await authStore.logout();
  router.push({ name: 'home' });
}
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > div:last-child {
  transform: translateX(-100%);
}
.drawer-leave-to > div:last-child {
  transform: translateX(-100%);
}
</style>
