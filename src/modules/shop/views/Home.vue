<template>
  <div>
    <!-- Hero Carousel -->
    <HeroCarousel :slides="mockData.heroSlides" />

    <!-- Category Previews -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shop by Category</h2>
        <router-link to="/products" class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
          View all <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <CategoryPreview
          v-for="cat in displayCategories"
          :key="cat.id"
          :category="cat"
        />
      </div>
    </section>

    <!-- Featured Products / Today's Deals -->
    <section class="bg-gray-50 py-12 dark:bg-gray-800/50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Products</h2>
          <router-link to="/products" class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
            See all deals <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
        <div class="mt-6">
          <ProductGrid
            :products="featuredProducts"
            :loading="productStore.featuredLoading"
            :skeleton-count="4"
            @quickview="openQuickview"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </section>

    <!-- Promo Section -->
    <section class="py-12">
      <PromoSection :promos="mockData.promos" />
    </section>

    <!-- New Arrivals -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Arrivals</h2>
        <router-link
          :to="{ name: 'products', query: { sort: 'newest' } }"
          class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400"
        >
          View all <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
      <div class="mt-6">
        <ProductGrid
          :products="newArrivals"
          :loading="productStore.loading"
          :skeleton-count="4"
          @quickview="openQuickview"
          @add-to-cart="addToCart"
        />
      </div>
    </section>

    <!-- Trending / Popular -->
    <section class="bg-gray-50 py-12 dark:bg-gray-800/50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trending Now</h2>
          <router-link
            :to="{ name: 'products', query: { sort: 'popular' } }"
            class="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400"
          >
            View all <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
        <!-- Horizontal scroll row -->
        <div class="mt-6 -mx-4 overflow-x-auto px-4 pb-4">
          <div class="flex gap-4" style="min-width: max-content;">
            <div v-for="product in trendingProducts" :key="product.id" class="w-56 shrink-0">
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
  // Sort by reviews_count (popularity) for trending
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
