<template>
  <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
    <!-- Image -->
    <div class="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        :src="product.image_url || product.image || 'https://placehold.co/400x400/e2e8f0/94a3b8?text=Product'"
        :alt="product.name"
        class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Quick view overlay -->
      <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10">
        <button
          @click.prevent="$emit('quickview', product)"
          class="translate-y-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gray-50"
        >
          Quick view
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col p-4">
      <router-link
        :to="{ name: 'product-detail', params: { id: product.id } }"
        class="text-sm font-medium text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
      >
        {{ product.name }}
      </router-link>

      <!-- Rating -->
      <div class="mt-1 flex items-center gap-1">
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
        <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews_count || 0 }})</span>
      </div>

      <!-- Price -->
      <div class="mt-2 flex items-center gap-2">
        <span class="text-lg font-bold text-gray-900 dark:text-white">${{ formatPrice(product.price) }}</span>
        <span v-if="product.original_price" class="text-sm text-gray-500 line-through dark:text-gray-400">
          ${{ formatPrice(product.original_price) }}
        </span>
      </div>

      <!-- Add to cart -->
      <button
        @click="$emit('addToCart', product)"
        class="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
});

defineEmits(['quickview', 'addToCart']);

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}
</script>
