<template>
  <div class="min-h-screen flex flex-col bg-paper dark:bg-[#0A0A0A]">
    <!--  promo bar -->
    <div class="bg-ink dark:bg-white overflow-hidden">
      <div class="flex h-9 items-center whitespace-nowrap">
        <div class="animate-[marquee_30s_linear_infinite] flex items-center gap-12 pr-12">
          <span class="flex items-center gap-2 text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            <TruckIcon class="h-3.5 w-3.5" /> Free shipping on orders over $50
          </span>
          <span class="text-white/30 dark:text-[#111]/30">&#9679;</span>
          <span class="text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            Use code <strong class="text-coral">SAVE10</strong> for 10% off
          </span>
          <span class="text-white/30 dark:text-[#111]/30">&#9679;</span>
          <span class="text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            30-day easy returns
          </span>
          <span class="text-white/30 dark:text-[#111]/30">&#9679;</span>
          <span class="flex items-center gap-2 text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            <TruckIcon class="h-3.5 w-3.5" /> Free shipping on orders over $50
          </span>
          <span class="text-white/30 dark:text-[#111]/30">&#9679;</span>
          <span class="text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            Use code <strong class="text-coral">SAVE10</strong> for 10% off
          </span>
          <span class="text-white/30 dark:text-[#111]/30">&#9679;</span>
          <span class="text-xs font-medium tracking-wide text-white dark:text-[#111] uppercase">
            30-day easy returns
          </span>
        </div>
      </div>
    </div>

    <!-- header -->
    <header
      class="sticky top-0 z-30 transition-all duration-300"
      :class="scrolled ? 'glass shadow-[0_1px_0_0_var(--color-border)]' : 'bg-paper dark:bg-[#0A0A0A]'"
    >
      <!-- Primary nav row -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center gap-6">
          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = true"
            class="rounded-full p-2 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors lg:hidden dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
          >
            <Bars3Icon class="h-5 w-5" />
          </button>

          <!-- Logo -->
          <router-link to="/" class="flex shrink-0 items-center">
            <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-8 w-auto sm:h-9" />
          </router-link>

          <!-- Center nav links (desktop) -->
          <nav class="hidden lg:flex items-center gap-1 ml-8">
            <router-link
              to="/"
              class="px-3 py-1.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors rounded-full hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
              :class="{ '!text-ink !font-semibold dark:!text-white': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              to="/products"
              class="px-3 py-1.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors rounded-full hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
              :class="{ '!text-ink !font-semibold dark:!text-white': $route.name === 'products' }"
            >
              Shop
            </router-link>
            <router-link
              to="/deals"
              class="px-3 py-1.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors rounded-full hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
              :class="{ '!text-ink !font-semibold dark:!text-white': $route.name === 'deals' }"
            >
              <span class="flex items-center gap-1.5">
                Deals
                <span class="inline-flex h-4.5 items-center rounded-full bg-coral px-1.5 text-[9px] font-bold text-white uppercase tracking-wider">Hot</span>
              </span>
            </router-link>
            <router-link
              to="/products?sort=newest"
              class="px-3 py-1.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors rounded-full hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
            >
              New In
            </router-link>
          </nav>

          <!-- Search bar -->
          <div class="hidden flex-1 justify-center px-6 lg:flex">
            <SearchBar class="w-full max-w-xl" />
          </div>

          <!-- Right actions -->
          <div class="ml-auto flex items-center gap-0.5 sm:gap-1">
            <!-- Account -->
            <div class="relative" @mouseenter="accountOpen = true" @mouseleave="accountOpen = false">
              <button class="flex items-center gap-1.5 rounded-full p-2 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors sm:px-3 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5">
                <UserIcon class="h-5 w-5" />
                <span class="hidden sm:block text-[13px] font-medium">
                  {{ authStore.getAuthenticated ? authStore.user?.name?.split(' ')[0] : 'Sign in' }}
                </span>
              </button>
              <!-- Account dropdown -->
              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="scale-95 opacity-0 -translate-y-1"
                enter-to-class="scale-100 opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-if="accountOpen"
                  class="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-ink/5 dark:border-border dark:bg-surface"
                >
                  <template v-if="authStore.getAuthenticated">
                    <div class="px-4 py-3 border-b border-border">
                      <p class="text-sm font-semibold text-ink font-display">{{ authStore.user?.name || 'User' }}</p>
                      <p class="text-xs text-ink-muted mt-0.5">{{ authStore.user?.email }}</p>
                    </div>
                    <div class="py-1.5">
                      <router-link to="/account" class="flex items-center gap-3 px-4 py-2 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
                        <UserIcon class="h-4 w-4 text-ink-muted" /> My Account
                      </router-link>
                      <router-link to="/wishlist" class="flex items-center gap-3 px-4 py-2 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
                        <HeartIcon class="h-4 w-4 text-ink-muted" /> Wishlist
                      </router-link>
                      <router-link to="/cart" class="flex items-center gap-3 px-4 py-2 text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5">
                        <ShoppingBagIcon class="h-4 w-4 text-ink-muted" /> Orders
                      </router-link>
                    </div>
                    <div class="border-t border-border py-1.5">
                      <button
                        @click="handleLogout"
                        class="flex w-full items-center gap-3 px-4 py-2 text-sm text-coral hover:bg-coral/5 transition-colors"
                      >
                        <ArrowLeftStartOnRectangleIcon class="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="p-4">
                      <router-link
                        to="/login"
                        class="block w-full rounded-xl bg-ink dark:bg-white py-2.5 text-center text-sm font-semibold text-white dark:text-[#111] hover:opacity-90 transition-opacity"
                      >
                        Sign in
                      </router-link>
                      <p class="mt-3 text-center text-xs text-ink-muted">
                        New here?
                        <router-link to="/register" class="font-medium text-coral hover:text-coral-dark">
                          Create account
                        </router-link>
                      </p>
                    </div>
                  </template>
                </div>
              </Transition>
            </div>

            <!-- Wishlist -->
            <router-link
              to="/wishlist"
              class="hidden sm:flex rounded-full p-2 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
            >
              <HeartIcon class="h-5 w-5" />
            </router-link>

            <!-- Cart -->
            <router-link
              to="/cart"
              class="relative flex items-center gap-1.5 rounded-full p-2 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors sm:px-3 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5"
            >
              <div class="relative">
                <ShoppingCartIcon class="h-5 w-5" />
                <span
                  v-if="cartStore.count > 0"
                  class="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white"
                >
                  {{ cartStore.count > 9 ? '9+' : cartStore.count }}
                </span>
              </div>
              <span class="hidden sm:block text-[13px] font-medium">Cart</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile search row -->
      <div class="px-4 pb-3 lg:hidden">
        <SearchBar />
      </div>

      <!-- Category navigation bar -->
      <StoreNavigation :categories="productStore.categories" />
    </header>

    <!-- Mobile menu drawer -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="fixed inset-0 bg-ink/40 backdrop-blur-sm" @click="mobileMenuOpen = false"></div>
          <div class="fixed inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-surface shadow-2xl dark:bg-surface">
            <!-- Drawer header -->
            <div class="flex h-16 items-center justify-between px-5">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 dark:bg-white/10">
                  <UserCircleIcon class="h-5 w-5 text-ink-light dark:text-ink-muted" />
                </div>
                <div>
                  <span class="text-sm font-semibold text-ink font-display">
                    {{ authStore.getAuthenticated ? `Hello, ${authStore.user?.name?.split(' ')[0]}` : 'Welcome' }}
                  </span>
                  <p v-if="!authStore.getAuthenticated" class="text-xs text-ink-muted">
                    <router-link to="/login" @click="mobileMenuOpen = false" class="text-coral font-medium">Sign in</router-link> or
                    <router-link to="/register" @click="mobileMenuOpen = false" class="text-coral font-medium">Register</router-link>
                  </p>
                </div>
              </div>
              <button @click="mobileMenuOpen = false" class="rounded-full p-2 text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Drawer body -->
            <nav class="flex-1 overflow-y-auto px-3 pb-6">
              <div class="space-y-0.5">
                <router-link
                  to="/"
                  @click="mobileMenuOpen = false"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  Home
                </router-link>
                <router-link
                  to="/products"
                  @click="mobileMenuOpen = false"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  All Products
                </router-link>
                <router-link
                  to="/deals"
                  @click="mobileMenuOpen = false"
                  class="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  Deals
                  <span class="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold text-white uppercase">Hot</span>
                </router-link>
                <router-link
                  to="/products?sort=newest"
                  @click="mobileMenuOpen = false"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  New Arrivals
                </router-link>
                <router-link
                  to="/wishlist"
                  @click="mobileMenuOpen = false"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  Wishlist
                </router-link>
              </div>

              <div class="mt-6">
                <p class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Categories</p>
                <div class="space-y-0.5">
                  <router-link
                    v-for="cat in productStore.categories"
                    :key="cat.id || cat.name"
                    :to="{ name: 'products', query: { category: cat.slug || cat.name } }"
                    @click="mobileMenuOpen = false"
                    class="block rounded-xl px-3 py-2 text-sm text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                  >
                    {{ cat.name }}
                  </router-link>
                </div>
              </div>

              <div class="mt-6 border-t border-border pt-4">
                <div class="space-y-0.5">
                  <router-link
                    v-if="authStore.getAuthenticated"
                    to="/account"
                    @click="mobileMenuOpen = false"
                    class="block rounded-xl px-3 py-2 text-sm text-ink-light hover:bg-ink/5 dark:hover:bg-white/5"
                  >
                    My Account
                  </router-link>
                  <a href="#" class="block rounded-xl px-3 py-2 text-sm text-ink-light hover:bg-ink/5 dark:hover:bg-white/5">
                    Help Center
                  </a>
                  <button
                    v-if="authStore.getAuthenticated"
                    @click="handleLogout(); mobileMenuOpen = false"
                    class="block w-full rounded-xl px-3 py-2 text-left text-sm text-coral hover:bg-coral/5"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Page content -->
    <main class="flex-1">
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

    <!-- Footer -->
    <footer class="bg-ink dark:bg-[#0A0A0A]">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <!-- Top section with newsletter -->
        <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between pb-12 border-b border-white/10">
          <div class="max-w-sm">
            <img src="@/assets/vular-logo.png" alt="Larvue Shop" class="h-8 w-auto opacity-80" />
            <p class="mt-4 text-sm leading-relaxed text-white/50">
              Curating the finest products for the modern lifestyle. Quality meets design at Larvue.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h3 class="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Company</h3>
              <ul class="mt-4 space-y-3">
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">About</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Support</h3>
              <ul class="mt-4 space-y-3">
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Legal</h3>
              <ul class="mt-4 space-y-3">
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" class="text-sm text-white/60 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p class="text-xs text-white/30">
            &copy; {{ new Date().getFullYear() }} Larvue Shop. All rights reserved.
          </p>
          <div class="flex items-center gap-5">
            <a href="#" class="text-white/30 hover:text-white/70 transition-colors">
              <svg class="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-white/30 hover:text-white/70 transition-colors">
              <svg class="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" class="text-white/30 hover:text-white/70 transition-colors">
              <svg class="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
  UserCircleIcon,
  HeartIcon,
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
const scrolled = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > 10;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  productStore.fetchCategories();
  if (authStore.getAuthenticated) {
    cartStore.mergeAndSync();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
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
