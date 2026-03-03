<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Saved items</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
        Your Wishlist
      </h1>
    </div>

    <!-- Empty state -->
    <div class="py-24 text-center animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-coral/5 dark:bg-coral/10">
        <HeartIcon class="h-9 w-9 text-coral/60" />
      </div>
      <h2 class="mt-6 text-lg font-semibold text-ink font-display dark:text-ink">No saved items yet</h2>
      <p class="mt-2 text-sm text-ink-muted max-w-sm mx-auto">
        Tap the heart icon on any product to save it here for later. Your favorites will be waiting for you.
      </p>
      <router-link
        to="/products"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white hover:bg-ink/80 transition-all active:scale-[0.98] dark:bg-white dark:text-ink dark:hover:bg-white/80"
      >
        Discover Products
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </router-link>
    </div>

    <!-- Recommended products -->
    <section class="mt-8 border-t border-border pt-12 dark:border-border">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">You might like</span>
          <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-ink">Recommended for You</h2>
        </div>
        <router-link
          to="/products"
          class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-ink"
        >
          View all
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </router-link>
      </div>

      <ProductGrid
        :products="recommendedProducts"
        :loading="loading"
        :skeleton-count="4"
        @quickview="openQuickview"
        @add-to-cart="addToCart"
      />
    </section>

    <!-- Quickview -->
    <ProductQuickview
      :show="quickviewOpen"
      :product="quickviewProduct"
      @close="quickviewOpen = false"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/outline';
import { useProductStore } from '@/modules/shop/stores/products';
import { useCartStore } from '@/modules/shop/stores/cart';
import ProductGrid from '@/modules/shop/components/ProductGrid.vue';
import ProductQuickview from '@/modules/shop/components/ProductQuickview.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const quickviewOpen = ref(false);
const quickviewProduct = ref({});

const recommendedProducts = computed(() => {
  return [...productStore.products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
});

function openQuickview(product) {
  quickviewProduct.value = product;
  quickviewOpen.value = true;
}

function addToCart(product) {
  cartStore.addItem(product);
}

onMounted(async () => {
  await productStore.fetchProducts();
  loading.value = false;
});
</script>
