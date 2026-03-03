<template>
  <div>
    <!-- Loading skeletons -->
    <div v-if="loading" class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="i in skeletonCount" :key="i" class="overflow-hidden rounded-2xl border border-border/50 bg-surface dark:bg-surface dark:border-border/50">
        <div class="aspect-square shimmer"></div>
        <div class="p-4 space-y-3">
          <div class="h-2 w-16 rounded-full shimmer"></div>
          <div class="h-4 w-3/4 rounded-full shimmer"></div>
          <div class="h-3 w-1/2 rounded-full shimmer"></div>
          <div class="h-5 w-1/3 rounded-full shimmer"></div>
          <div class="h-10 w-full rounded-xl shimmer"></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="products.length === 0" class="py-20 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5">
        <MagnifyingGlassIcon class="h-7 w-7 text-ink-muted" />
      </div>
      <h3 class="mt-5 text-lg font-semibold text-ink font-display dark:text-ink">No products found</h3>
      <p class="mt-2 text-sm text-ink-muted max-w-sm mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
    </div>

    <!-- Product grid -->
    <div v-else class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        class="animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.05}s` }"
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
