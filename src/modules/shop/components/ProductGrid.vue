<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="i in skeletonCount" :key="i" class="animate-pulse rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="aspect-square bg-gray-200 dark:bg-gray-700"></div>
        <div class="p-4 space-y-3">
          <div class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-9 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>

    <div v-else-if="products.length === 0" class="py-16 text-center">
      <MagnifyingGlassIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @quickview="$emit('quickview', $event)"
        @add-to-cart="$emit('addToCart', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import ProductCard from './ProductCard.vue';

defineProps({
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  skeletonCount: { type: Number, default: 8 },
});

defineEmits(['quickview', 'addToCart']);
</script>
