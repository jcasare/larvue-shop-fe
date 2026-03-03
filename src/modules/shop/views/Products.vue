<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <!-- Page header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div class="animate-fade-in-up">
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">Browse</span>
        <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl font-display dark:text-ink">
          {{ activeCategory ? activeCategory : 'All Products' }}
        </h1>
        <p class="mt-1 text-sm text-ink-muted">
          {{ productStore.totalRecords }} products{{ productStore.search ? ` for "${productStore.search}"` : '' }}
        </p>
      </div>
      <div class="flex items-center gap-3 animate-fade-in-up" style="animation-delay: 0.05s">
        <!-- Mobile filter button -->
        <button
          @click="mobileFiltersOpen = true"
          class="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-ink-light transition-all hover:border-ink hover:text-ink lg:hidden dark:border-border dark:text-ink-muted dark:hover:border-white/40 dark:hover:text-ink"
        >
          <FunnelIcon class="h-4 w-4" />
          Filters
        </button>

        <!-- Sort dropdown -->
        <div class="relative">
          <select
            v-model="sortOption"
            @change="handleSort"
            class="appearance-none rounded-xl border border-border bg-surface py-2.5 pl-4 pr-9 text-xs font-medium text-ink cursor-pointer hover:border-ink/30 transition-colors dark:border-border dark:bg-surface dark:text-ink dark:hover:border-white/30"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDownIcon class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
        </div>
      </div>
    </div>

    <!-- Content area -->
    <div class="flex gap-10">
      <!-- Sidebar filters (desktop) -->
      <aside class="hidden w-56 shrink-0 lg:block animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="sticky top-36">
          <CategoryFilter
            :categories="displayCategories"
            :selected-category="productStore.category"
            :min-price="productStore.minPrice"
            :max-price="productStore.maxPrice"
            @update:category="handleCategoryChange"
            @update:min-price="handleMinPrice"
            @update:max-price="handleMaxPrice"
            @reset="handleReset"
          />
        </div>
      </aside>

      <!-- Product grid -->
      <div class="flex-1 min-w-0">
        <!-- Active filters -->
        <div v-if="hasActiveFilters" class="mb-5 flex flex-wrap items-center gap-2 animate-fade-in">
          <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Filters:</span>
          <span
            v-if="productStore.category"
            class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-ink dark:border-border dark:bg-surface dark:text-ink"
          >
            {{ productStore.category }}
            <button @click="handleCategoryChange('')" class="text-ink-muted hover:text-ink transition-colors dark:hover:text-ink">
              <XMarkIcon class="h-3 w-3" />
            </button>
          </span>
          <span
            v-if="productStore.minPrice || productStore.maxPrice"
            class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-ink dark:border-border dark:bg-surface dark:text-ink"
          >
            ${{ productStore.minPrice || 0 }} - ${{ productStore.maxPrice || '...' }}
            <button @click="productStore.setPriceRange(null, null)" class="text-ink-muted hover:text-ink transition-colors dark:hover:text-ink">
              <XMarkIcon class="h-3 w-3" />
            </button>
          </span>
          <button @click="handleReset" class="text-[11px] font-semibold text-coral hover:text-coral-dark transition-colors">
            Clear all
          </button>
        </div>

        <ProductGrid
          :products="productStore.products"
          :loading="productStore.loading"
          @quickview="openQuickview"
          @add-to-cart="addToCart"
        />

        <!-- Pagination -->
        <div v-if="productStore.totalPages > 1" class="mt-10 flex items-center justify-center gap-1.5">
          <button
            @click="productStore.setPage(productStore.page - 1)"
            :disabled="productStore.page <= 1"
            class="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-ink-light transition-all hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink-light dark:border-border dark:text-ink-muted dark:hover:border-white/40 dark:hover:text-ink"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            v-for="p in paginationPages"
            :key="p"
            @click="productStore.setPage(p)"
            class="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition-all"
            :class="p === productStore.page
              ? 'bg-ink text-white dark:bg-white dark:text-ink'
              : 'text-ink-light hover:bg-ink/5 dark:text-ink-muted dark:hover:bg-white/5'"
          >
            {{ p }}
          </button>
          <button
            @click="productStore.setPage(productStore.page + 1)"
            :disabled="productStore.page >= productStore.totalPages"
            class="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-ink-light transition-all hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink-light dark:border-border dark:text-ink-muted dark:hover:border-white/40 dark:hover:text-ink"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile filter drawer -->
    <Teleport to="body">
      <Transition name="filter-drawer">
        <div v-if="mobileFiltersOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="fixed inset-0 bg-ink/40 backdrop-blur-sm" @click="mobileFiltersOpen = false"></div>
          <div class="fixed inset-y-0 right-0 w-80 max-w-full overflow-y-auto bg-surface p-6 shadow-2xl dark:bg-surface">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-ink font-display dark:text-ink">Filters</h2>
              <button @click="mobileFiltersOpen = false" class="rounded-full p-2 text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors dark:hover:bg-white/5 dark:hover:text-ink">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <CategoryFilter
              :categories="displayCategories"
              :selected-category="productStore.category"
              :min-price="productStore.minPrice"
              :max-price="productStore.maxPrice"
              @update:category="(v) => { handleCategoryChange(v); mobileFiltersOpen = false; }"
              @update:min-price="handleMinPrice"
              @update:max-price="handleMaxPrice"
              @reset="handleReset"
            />
          </div>
        </div>
      </Transition>
    </Teleport>

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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { FunnelIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { useProductStore } from '@/modules/shop/stores/products';
import { useCartStore } from '@/modules/shop/stores/cart';
import ProductGrid from '@/modules/shop/components/ProductGrid.vue';
import ProductQuickview from '@/modules/shop/components/ProductQuickview.vue';
import CategoryFilter from '@/modules/shop/components/CategoryFilter.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const mobileFiltersOpen = ref(false);
const quickviewOpen = ref(false);
const quickviewProduct = ref({});
const sortOption = ref('newest');

const displayCategories = computed(() => productStore.categories);

const activeCategory = computed(() => {
  if (!productStore.category) return '';
  const cat = displayCategories.value.find(
    (c) => (c.slug || c.name) === productStore.category
  );
  return cat?.name || productStore.category;
});

const hasActiveFilters = computed(() => {
  return productStore.category || productStore.minPrice || productStore.maxPrice;
});

const paginationPages = computed(() => {
  const total = productStore.totalPages;
  const current = productStore.page;
  const pages = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function handleSort() {
  productStore.setSort(sortOption.value);
}

function handleCategoryChange(cat) {
  productStore.setCategory(cat);
}

let priceDebounce = null;
function handleMinPrice(val) {
  clearTimeout(priceDebounce);
  priceDebounce = setTimeout(() => {
    productStore.setPriceRange(val, productStore.maxPrice);
  }, 500);
}

function handleMaxPrice(val) {
  clearTimeout(priceDebounce);
  priceDebounce = setTimeout(() => {
    productStore.setPriceRange(productStore.minPrice, val);
  }, 500);
}

function handleReset() {
  sortOption.value = 'newest';
  productStore.resetFilters();
}

function openQuickview(product) {
  quickviewProduct.value = product;
  quickviewOpen.value = true;
}

function addToCart(product) {
  cartStore.addItem(product);
}

onMounted(() => {
  if (route.query.category) {
    productStore.category = route.query.category;
  }
  if (route.query.search) {
    productStore.search = route.query.search;
  }
  if (route.query.sort) {
    productStore.sort = route.query.sort;
    sortOption.value = route.query.sort;
  }
  productStore.fetchProducts();
  productStore.fetchCategories();
});

watch(
  () => route.query,
  (query) => {
    if (query.category !== undefined) productStore.category = query.category || '';
    if (query.search !== undefined) productStore.search = query.search || '';
    if (query.sort !== undefined) {
      productStore.sort = query.sort || 'newest';
      sortOption.value = query.sort || 'newest';
    }
    productStore.page = 1;
    productStore.fetchProducts();
  }
);
</script>

<style scoped>
.filter-drawer-enter-active,
.filter-drawer-leave-active {
  transition: opacity 0.3s ease;
}
.filter-drawer-enter-active > div:last-child,
.filter-drawer-leave-active > div:last-child {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.filter-drawer-enter-from,
.filter-drawer-leave-to {
  opacity: 0;
}
.filter-drawer-enter-from > div:last-child {
  transform: translateX(100%);
}
.filter-drawer-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
