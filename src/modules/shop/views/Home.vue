<template>
  <div>
    <!-- Hero Carousel -->
    <HeroCarousel :slides="mockData.heroSlides" />

    <!-- Category Previews — Bento Grid -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Browse</span>
          <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
            Shop by Category
          </h2>
        </div>
        <router-link
          to="/products"
          class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-white"
        >
          View all
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </router-link>
      </div>
      <!-- Bento grid: 2 large + 2 small on first row, then 4 equal -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="(cat, index) in displayCategories"
          :key="cat.id"
          class="animate-fade-in-up"
          :class="index < 2 ? 'lg:col-span-2 lg:row-span-1' : ''"
          :style="{ animationDelay: `${index * 0.06}s` }"
        >
          <CategoryPreview :category="cat" />
        </div>
      </div>
    </section>

    <!-- Featured Products / Today's Deals -->
    <section class="relative overflow-hidden">
      <!-- Subtle background -->
      <div class="absolute inset-0 bg-gradient-to-b from-border-light/50 to-paper dark:from-[#111] dark:to-[#0A0A0A]"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="inline-flex items-center rounded-full bg-coral/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-coral mb-2">
              Featured
            </span>
            <h2 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
              Today's Top Picks
            </h2>
          </div>
          <router-link
            to="/deals"
            class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-white"
          >
            See all deals
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </router-link>
        </div>
        <ProductGrid
          :products="featuredProducts"
          :loading="productStore.featuredLoading"
          :skeleton-count="4"
          @quickview="openQuickview"
          @add-to-cart="addToCart"
        />
      </div>
    </section>

    <!-- Promo Section -->
    <section class="py-16 sm:py-20">
      <PromoSection :promos="mockData.promos" />
    </section>

    <!-- New Arrivals -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Fresh drops</span>
          <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
            New Arrivals
          </h2>
        </div>
        <router-link
          :to="{ name: 'products', query: { sort: 'newest' } }"
          class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-white"
        >
          View all
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </router-link>
      </div>
      <ProductGrid
        :products="newArrivals"
        :loading="productStore.loading"
        :skeleton-count="4"
        @quickview="openQuickview"
        @add-to-cart="addToCart"
      />
    </section>

    <!-- Trending / Popular — Horizontal scroll -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-border-light/50 to-paper dark:from-[#111] dark:to-[#0A0A0A]"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="inline-flex items-center rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-forest dark:text-emerald-400 mb-2">
              Popular
            </span>
            <h2 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
              Trending Now
            </h2>
          </div>
          <router-link
            :to="{ name: 'products', query: { sort: 'popular' } }"
            class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-white"
          >
            View all
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </router-link>
        </div>
        <!-- Horizontal scroll row -->
        <div class="-mx-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          <div class="flex gap-4" style="min-width: max-content;">
            <div
              v-for="(product, index) in trendingProducts"
              :key="product.id"
              class="w-52 shrink-0 sm:w-60 animate-fade-in-up"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <ProductCard
                :product="product"
                @quickview="openQuickview"
                @add-to-cart="addToCart"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <NewsletterSection />

    <!-- Product Quickview Modal -->
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
import { useProductStore } from '@/modules/shop/stores/products';
import { useCartStore } from '@/modules/shop/stores/cart';
import mockData from '@/modules/shop/data/mock.json';
import HeroCarousel from '@/modules/shop/components/HeroCarousel.vue';
import CategoryPreview from '@/modules/shop/components/CategoryPreview.vue';
import ProductGrid from '@/modules/shop/components/ProductGrid.vue';
import ProductCard from '@/modules/shop/components/ProductCard.vue';
import ProductQuickview from '@/modules/shop/components/ProductQuickview.vue';
import PromoSection from '@/modules/shop/components/PromoSection.vue';
import NewsletterSection from '@/modules/shop/components/NewsletterSection.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const quickviewOpen = ref(false);
const quickviewProduct = ref({});

const displayCategories = computed(() => {
  return productStore.categories.slice(0, 8);
});

const featuredProducts = computed(() => {
  return productStore.featuredProducts.slice(0, 4);
});

const newArrivals = computed(() => {
  return productStore.products.slice(0, 4);
});

const trendingProducts = computed(() => {
  return [...productStore.products].sort((a, b) => b.reviews_count - a.reviews_count).slice(0, 8);
});

function openQuickview(product) {
  quickviewProduct.value = product;
  quickviewOpen.value = true;
}

function addToCart(product) {
  cartStore.addItem(product);
}

onMounted(() => {
  productStore.fetchCategories();
  productStore.fetchFeatured();
  productStore.fetchProducts();
});
</script>
