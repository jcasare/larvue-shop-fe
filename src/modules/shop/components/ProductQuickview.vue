<template>
  <Teleport to="body">
    <Transition name="quickview">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="$emit('close')"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800" @click.stop>
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-1.5 text-gray-400 hover:text-gray-600 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:text-white"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>

            <div class="grid grid-cols-1 sm:grid-cols-2">
              <!-- Image -->
              <div class="aspect-square bg-gray-100 dark:bg-gray-700">
                <img
                  :src="product.image_url || product.image || 'https://placehold.co/500x500/e2e8f0/94a3b8?text=Product'"
                  :alt="product.name"
                  class="h-full w-full object-cover object-center"
                />
              </div>

              <!-- Details -->
              <div class="flex flex-col p-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ product.name }}</h2>

                <!-- Rating -->
                <div class="mt-2 flex items-center gap-2">
                  <div class="flex items-center">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="h-4 w-4"
                      :class="i <= Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.reviews_count || 0 }} reviews</span>
                </div>

                <!-- Price -->
                <div class="mt-4 flex items-center gap-2">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">${{ formatPrice(product.price) }}</span>
                  <span v-if="product.original_price" class="text-sm text-gray-500 line-through dark:text-gray-400">
                    ${{ formatPrice(product.original_price) }}
                  </span>
                </div>

                <!-- Description -->
                <p class="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-4">
                  {{ product.description || 'No description available.' }}
                </p>

                <!-- Stock -->
                <div class="mt-4">
                  <span
                    v-if="product.quantity > 10 || product.in_stock !== false"
                    class="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    In Stock
                  </span>
                  <span
                    v-else-if="product.quantity > 0"
                    class="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  >
                    Only {{ product.quantity }} left
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  >
                    Out of Stock
                  </span>
                </div>

                <!-- Quantity + Actions -->
                <div class="mt-auto pt-6 space-y-3">
                  <div class="flex items-center gap-3">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Qty</label>
                    <select
                      v-model="quantity"
                      class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>
                  </div>
                  <button
                    @click="handleAddToCart"
                    class="w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Add to Cart
                  </button>
                  <router-link
                    :to="{ name: 'product-detail', params: { id: product.id } }"
                    @click="$emit('close')"
                    class="block text-center text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    View full details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  show: { type: Boolean, default: false },
  product: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['close', 'addToCart']);

const quantity = ref(1);

function handleAddToCart() {
  emit('addToCart', props.product, quantity.value);
  emit('close');
}

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}
</script>

<style scoped>
.quickview-enter-active,
.quickview-leave-active {
  transition: opacity 0.2s ease;
}
.quickview-enter-from,
.quickview-leave-to {
  opacity: 0;
}
</style>
