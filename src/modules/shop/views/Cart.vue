<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shopping Cart</h1>

    <!-- Empty state -->
    <div v-if="cartStore.isEmpty" class="py-16 text-center">
      <ShoppingBagIcon class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
      <h2 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h2>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Looks like you haven't added any items to your cart yet.
      </p>
      <router-link
        to="/products"
        class="mt-6 inline-flex items-center rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart with items -->
    <div v-else class="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
      <!-- Cart items -->
      <section class="lg:col-span-7">
        <ul class="divide-y divide-gray-200 border-b border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <li v-for="item in cartStore.items" :key="item.id" class="flex py-6">
            <!-- Image -->
            <div class="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32 dark:bg-gray-700">
              <img
                :src="item.image || 'https://placehold.co/200x200/e2e8f0/94a3b8?text=Product'"
                :alt="item.name"
                class="h-full w-full object-cover object-center"
              />
            </div>

            <!-- Details -->
            <div class="ml-4 flex flex-1 flex-col sm:ml-6">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    <router-link :to="{ name: 'product-detail', params: { id: item.id } }" class="hover:text-teal-600 dark:hover:text-teal-400">
                      {{ item.name }}
                    </router-link>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${{ formatPrice(item.price) }} each</p>
                </div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">${{ formatPrice(item.price * item.quantity) }}</p>
              </div>

              <div class="mt-auto flex items-center justify-between pt-4">
                <!-- Quantity -->
                <div class="flex items-center rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    @click="updateQty(item.id, item.quantity - 1)"
                    class="px-2.5 py-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <MinusIcon class="h-3.5 w-3.5" />
                  </button>
                  <span class="w-10 text-center text-sm font-medium text-gray-900 dark:text-white">{{ item.quantity }}</span>
                  <button
                    @click="updateQty(item.id, item.quantity + 1)"
                    class="px-2.5 py-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <PlusIcon class="h-3.5 w-3.5" />
                  </button>
                </div>

                <!-- Remove -->
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section class="mt-8 lg:col-span-5 lg:mt-0">
        <div class="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600 dark:text-gray-400">Subtotal ({{ cartStore.count }} items)</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-white">${{ formatPrice(cartStore.total) }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600 dark:text-gray-400">Shipping</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-white">
                {{ cartStore.total >= 50 ? 'Free' : '$4.99' }}
              </dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600 dark:text-gray-400">Tax (estimated)</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-white">${{ formatPrice(cartStore.total * 0.08) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
              <dt class="text-base font-semibold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-semibold text-gray-900 dark:text-white">${{ formatPrice(orderTotal) }}</dd>
            </div>
          </dl>

          <!-- Free shipping progress -->
          <div v-if="cartStore.total < 50" class="mt-4 rounded-lg bg-teal-50 p-3 dark:bg-teal-900/20">
            <p class="text-xs text-teal-700 dark:text-teal-300">
              Add ${{ formatPrice(50 - cartStore.total) }} more for <strong>free shipping</strong>!
            </p>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-teal-200 dark:bg-teal-900">
              <div
                class="h-full rounded-full bg-teal-600"
                :style="{ width: Math.min(100, (cartStore.total / 50) * 100) + '%' }"
              ></div>
            </div>
          </div>

          <button
            class="mt-6 w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Proceed to Checkout
          </button>

          <div class="mt-4 text-center">
            <router-link
              to="/products"
              class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400"
            >
              Continue Shopping <span aria-hidden="true">&rarr;</span>
            </router-link>
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
