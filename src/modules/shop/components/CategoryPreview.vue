<template>
  <router-link
    :to="{ name: 'products', query: { category: category.slug || category.name } }"
    class="group relative block overflow-hidden rounded-lg"
  >
    <div class="aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        :src="category.image || `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(category.name)}`"
        :alt="category.name"
        class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent">
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="text-lg font-bold text-white">{{ category.name }}</h3>
        <p v-if="category.product_count" class="mt-0.5 text-sm text-gray-200">
          {{ category.product_count }} products
        </p>
        <span class="mt-2 inline-flex items-center text-sm font-medium text-white group-hover:underline">
          Shop now
          <ArrowRightIcon class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/20/solid';

defineProps({
  category: { type: Object, required: true },
});
</script>
