<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Your bag</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">Shopping Cart</h1>
    </div>

    <!-- Empty state -->
    <div v-if="cartStore.isEmpty" class="py-24 text-center animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5">
        <ShoppingBagIcon class="h-9 w-9 text-ink-muted" />
      </div>
      <h2 class="mt-6 text-lg font-semibold text-ink font-display dark:text-ink">Your cart is empty</h2>
      <p class="mt-2 text-sm text-ink-muted max-w-sm mx-auto">
        Looks like you haven't added any items to your cart yet. Explore our collection and find something you love.
      </p>
      <router-link
        to="/products"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white hover:bg-ink/80 transition-all active:scale-[0.98] dark:bg-white dark:text-ink dark:hover:bg-white/80"
      >
        Start Shopping
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </router-link>
    </div>

    <!-- Cart with items -->
    <div v-else class="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
      <!-- Cart items -->
      <section class="lg:col-span-7">
        <ul class="divide-y divide-border dark:divide-border">
          <li
            v-for="(item, index) in cartStore.items"
            :key="item.id"
            class="flex gap-4 py-6 sm:gap-6 animate-fade-in-up"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <!-- Image -->
            <router-link
              :to="{ name: 'product-detail', params: { category: item.category || 'shop', slug: item.slug || item.id } }"
              class="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-border-light sm:h-32 sm:w-32 dark:bg-[#1A1A1A]"
            >
              <img
                :src="item.image || 'https://placehold.co/200x200/F2EFEA/A09B94?text=Product'"
                :alt="item.name"
                class="h-full w-full object-cover object-center"
              />
            </router-link>

            <!-- Details -->
            <div class="flex flex-1 flex-col min-w-0">
              <div class="flex justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="text-sm font-medium text-ink dark:text-ink truncate">
                    <router-link :to="{ name: 'product-detail', params: { category: item.category || 'shop', slug: item.slug || item.id } }" class="hover:text-coral transition-colors">
                      {{ item.name }}
                    </router-link>
                  </h3>
                  <p class="mt-1 text-xs text-ink-muted">${{ formatPrice(item.price) }} each</p>
                </div>
                <p class="shrink-0 text-sm font-bold text-ink font-display dark:text-ink">${{ formatPrice(item.price * item.quantity) }}</p>
              </div>

              <div class="mt-auto flex items-center justify-between pt-4">
                <!-- Quantity -->
                <div class="flex items-center rounded-lg border border-border dark:border-border">
                  <button
                    @click="updateQty(item.id, item.quantity - 1)"
                    class="flex h-8 w-8 items-center justify-center text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
                  >
                    <MinusIcon class="h-3.5 w-3.5" />
                  </button>
                  <span class="w-8 text-center text-xs font-semibold text-ink dark:text-ink">{{ item.quantity }}</span>
                  <button
                    @click="updateQty(item.id, item.quantity + 1)"
                    class="flex h-8 w-8 items-center justify-center text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
                  >
                    <PlusIcon class="h-3.5 w-3.5" />
                  </button>
                </div>

                <!-- Remove -->
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-xs font-medium text-ink-muted hover:text-coral transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section class="mt-10 lg:col-span-5 lg:mt-0">
        <div class="sticky top-36 rounded-2xl border border-border bg-surface p-6 dark:border-border dark:bg-surface animate-slide-in-right">
          <h2 class="text-lg font-bold text-ink font-display dark:text-ink">Order Summary</h2>

          <dl class="mt-6 space-y-3">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-ink-light dark:text-ink-muted">Subtotal ({{ cartStore.count }} items)</dt>
              <dd class="text-sm font-semibold text-ink dark:text-ink">${{ formatPrice(cartStore.total) }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-ink-light dark:text-ink-muted">Shipping</dt>
              <dd class="text-sm font-semibold" :class="cartStore.total >= 50 ? 'text-forest dark:text-emerald-400' : 'text-ink dark:text-ink'">
                {{ cartStore.total >= 50 ? 'Free' : '$4.99' }}
              </dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-ink-light dark:text-ink-muted">Tax (est.)</dt>
              <dd class="text-sm font-semibold text-ink dark:text-ink">${{ formatPrice(cartStore.total * 0.08) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border">
              <dt class="text-base font-bold text-ink font-display dark:text-ink">Total</dt>
              <dd class="text-base font-bold text-ink font-display dark:text-ink">${{ formatPrice(orderTotal) }}</dd>
            </div>
          </dl>

          <!-- Free shipping progress -->
          <div v-if="cartStore.total < 50" class="mt-5 rounded-xl bg-forest/5 p-3.5 dark:bg-forest/10">
            <p class="text-xs text-forest dark:text-emerald-400 font-medium">
              Add <strong>${{ formatPrice(50 - cartStore.total) }}</strong> more for free shipping!
            </p>
            <div class="mt-2 h-1 overflow-hidden rounded-full bg-forest/20 dark:bg-forest/30">
              <div
                class="h-full rounded-full bg-forest dark:bg-emerald-400 transition-all duration-500"
                :style="{ width: Math.min(100, (cartStore.total / 50) * 100) + '%' }"
              ></div>
            </div>
          </div>

          <button
            class="mt-6 w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ink/20 dark:bg-white dark:text-ink dark:hover:bg-white/80 dark:focus:ring-white/20"
          >
            Proceed to Checkout
          </button>

          <div class="mt-4 text-center">
            <router-link
              to="/products"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
            >
              Continue Shopping
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </router-link>
          </div>

          <!-- Trust badges -->
          <div class="mt-6 flex items-center justify-center gap-4 border-t border-border pt-5 dark:border-border">
            <div class="flex items-center gap-1.5 text-[10px] text-ink-muted">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-ink-muted">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Free Returns
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-ink-muted">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              Pay Securely
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline';
import { useCartStore } from '@/modules/shop/stores/cart';

const cartStore = useCartStore();

const shippingCost = computed(() => (cartStore.total >= 50 ? 0 : 4.99));
const taxAmount = computed(() => cartStore.total * 0.08);
const orderTotal = computed(() => cartStore.total + shippingCost.value + taxAmount.value);

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

function updateQty(productId, qty) {
  cartStore.updateQuantity(productId, qty);
}
</script>
