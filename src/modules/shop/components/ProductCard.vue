<template>
  <div class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-ink/[0.04] dark:bg-surface dark:border-border/50 dark:hover:border-border dark:hover:shadow-white/[0.02]">
    <!-- Image -->
    <router-link :to="{ name: 'product-detail', params: { category: product.category || 'shop', slug: product.slug || product.id } }" class="relative aspect-square overflow-hidden bg-border-light dark:bg-[#1A1A1A]">
      <img
        :src="product.image_url || product.image || 'https://placehold.co/400x400/F2EFEA/A09B94?text=Product'"
        :alt="product.name"
        class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <!-- Discount badge -->
      <span
        v-if="product.original_price"
        class="absolute top-3 left-3 inline-flex items-center rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide"
      >
        -{{ Math.round((1 - product.price / product.original_price) * 100) }}%
      </span>
      <!-- Quick view overlay -->
      <div class="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          @click.prevent="$emit('quickview', product)"
          class="translate-y-3 rounded-full bg-surface px-5 py-2 text-xs font-semibold text-ink shadow-lg transition-all duration-300 group-hover:translate-y-0 hover:bg-ink hover:text-white dark:bg-surface dark:text-ink dark:hover:bg-white dark:hover:text-[#0A0A0A]"
        >
          Quick view
        </button>
      </div>
    </router-link>

    <!-- Info -->
    <div class="flex flex-1 flex-col p-4">
      <!-- Category label -->
      <span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted mb-1.5">
        {{ product.category || 'General' }}
      </span>

      <router-link
        :to="{ name: 'product-detail', params: { category: product.category || 'shop', slug: product.slug || product.id } }"
        class="text-sm font-medium text-ink leading-snug line-clamp-2 hover:text-coral transition-colors dark:text-ink dark:hover:text-coral"
      >
        {{ product.name }}
      </router-link>

      <!-- Rating -->
      <div class="mt-2 flex items-center gap-1.5">
        <div class="flex items-center gap-0.5">
          <svg
            v-for="i in 5"
            :key="i"
            class="h-3.5 w-3.5"
            :class="i <= Math.round(product.rating || 4) ? 'text-amber' : 'text-border dark:text-border'"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-[11px] text-ink-muted">({{ product.reviews_count || 0 }})</span>
      </div>

      <!-- Price + Add to cart (pushed to bottom) -->
      <div class="mt-auto pt-3">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold text-ink font-display dark:text-ink">${{ formatPrice(product.price) }}</span>
          <span v-if="product.original_price" class="text-xs text-ink-muted line-through">
            ${{ formatPrice(product.original_price) }}
          </span>
        </div>

        <button
          @click="$emit('addToCart', product)"
          class="mt-3 w-full rounded-xl bg-ink py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-ink/80 active:scale-[0.98] dark:bg-white dark:text-ink dark:hover:bg-white/80"
        >
          Add to Cart
        </button>
      </div>
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
