<template>
  <div>
    <!-- Deals hero -->
    <section class="relative overflow-hidden bg-ink dark:bg-[#0A0A0A]">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-coral/20 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber/20 rounded-full blur-[100px]"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div class="max-w-2xl animate-fade-in-up">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-coral/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-coral">
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
            </svg>
            Hot Deals
          </span>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-[1.1]">
            Up to 50% Off
          </h1>
          <p class="mt-4 text-base text-white/50 leading-relaxed max-w-md">
            Don't miss out on these incredible deals. Limited time offers on top-rated products across all categories.
          </p>

          <!-- Countdown timer (decorative) -->
          <div class="mt-8 flex items-center gap-3">
            <span class="text-xs text-white/40 uppercase tracking-wider font-semibold">Ends in</span>
            <div class="flex items-center gap-2">
              <div class="flex flex-col items-center">
                <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white font-display">{{ countdown.hours }}</span>
                <span class="mt-1 text-[9px] text-white/30 uppercase">hrs</span>
              </div>
              <span class="text-white/30 text-lg font-bold mb-4">:</span>
              <div class="flex flex-col items-center">
                <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white font-display">{{ countdown.minutes }}</span>
                <span class="mt-1 text-[9px] text-white/30 uppercase">min</span>
              </div>
              <span class="text-white/30 text-lg font-bold mb-4">:</span>
              <div class="flex flex-col items-center">
                <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white font-display">{{ countdown.seconds }}</span>
                <span class="mt-1 text-[9px] text-white/30 uppercase">sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Deal products -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Save big</span>
          <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
            Best Deals Right Now
          </h2>
        </div>
        <span class="text-xs text-ink-muted">{{ dealProducts.length }} deals available</span>
      </div>

      <ProductGrid
        :products="dealProducts"
        :loading="loading"
        :skeleton-count="8"
        @quickview="openQuickview"
        @add-to-cart="addToCart"
      />
    </section>

    <!-- All featured products -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-border-light/50 to-paper dark:from-[#111] dark:to-[#0A0A0A]"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Curated</span>
            <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
              Featured Products
            </h2>
          </div>
          <router-link
            to="/products"
            class="flex items-center gap-1.5 text-xs font-semibold text-ink-light hover:text-ink transition-colors dark:text-ink-muted dark:hover:text-white"
          >
            View all products
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

    <!-- Newsletter -->
    <NewsletterSection />

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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProductStore } from '@/modules/shop/stores/products';
import { useCartStore } from '@/modules/shop/stores/cart';
import ProductGrid from '@/modules/shop/components/ProductGrid.vue';
import ProductQuickview from '@/modules/shop/components/ProductQuickview.vue';
import NewsletterSection from '@/modules/shop/components/NewsletterSection.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const quickviewOpen = ref(false);
const quickviewProduct = ref({});

// Countdown timer
const countdown = ref({ hours: '12', minutes: '34', seconds: '56' });
let countdownInterval = null;

function updateCountdown() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay - now;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  countdown.value = {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

const dealProducts = computed(() => {
  return productStore.products.filter(p => p.original_price).slice(0, 8);
});

const featuredProducts = computed(() => {
  return productStore.featuredProducts.slice(0, 4);
});

function openQuickview(product) {
  quickviewProduct.value = product;
  quickviewOpen.value = true;
}

function addToCart(product) {
  cartStore.addItem(product);
}

onMounted(async () => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  await productStore.fetchProducts();
  await productStore.fetchFeatured();
  loading.value = false;
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>
