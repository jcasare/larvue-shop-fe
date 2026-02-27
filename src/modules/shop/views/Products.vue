<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Page header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ activeCategory ? activeCategory : 'All Products' }}
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ productStore.totalRecords }} products{{ productStore.search ? ` for "${productStore.search}"` : '' }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Mobile filter button -->
        <button
          @click="mobileFiltersOpen = true"
          class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 lg:hidden dark:border-gray-600 dark:text-gray-300"
        >
          <FunnelIcon class="h-4 w-4" />
          Filters
        </button>

        <!-- Sort dropdown -->
        <div class="relative">
          <select
            v-model="sortOption"
            @change="handleSort"
            class="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Content area -->
    <div class="mt-8 flex gap-8">
      <!-- Sidebar filters (desktop) -->
      <aside class="hidden w-64 shrink-0 lg:block">
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
      </aside>

      <!-- Product grid -->
      <div class="flex-1">
        <!-- Active filters -->
        <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap items-center gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          <span
            v-if="productStore.category"
            class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            {{ productStore.category }}
            <button @click="handleCategoryChange('')" class="hover:text-indigo-900 dark:hover:text-white">
              <XMarkIcon class="h-3 w-3" />
            </button>
          </span>
          <span
            v-if="productStore.minPrice || productStore.maxPrice"
            class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            ${{ productStore.minPrice || 0 }} - ${{ productStore.maxPrice || '∞' }}
            <button @click="productStore.setPriceRange(null, null)" class="hover:text-indigo-900 dark:hover:text-white">
              <XMarkIcon class="h-3 w-3" />
            </button>
          </span>
          <button @click="handleReset" class="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
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
        <div v-if="productStore.totalPages > 1" class="mt-8 flex items-center justify-center gap-1">
          <button
            @click="productStore.setPage(productStore.page - 1)"
            :disabled="productStore.page <= 1"
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            v-for="p in paginationPages"
            :key="p"
            @click="productStore.setPage(p)"
            class="rounded-lg px-3 py-2 text-sm font-medium"
            :class="p === productStore.page
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'"
          >
            {{ p }}
          </button>
          <button
            @click="productStore.setPage(productStore.page + 1)"
            :disabled="productStore.page >= productStore.totalPages"
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile filter drawer -->
    <Teleport to="body">
      <Transition name="filter-drawer">
        <div v-if="mobileFiltersOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="fixed inset-0 bg-black/50" @click="mobileFiltersOpen = false"></div>
          <div class="fixed inset-y-0 right-0 w-80 max-w-full overflow-y-auto bg-white p-6 shadow-xl dark:bg-gray-800">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button @click="mobileFiltersOpen = false" class="rounded-md p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <div class="mt-6">
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
import { FunnelIcon, XMarkIcon } from '@heroicons/vue/24/outline';
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

// Initialize from query params
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

// Watch route query changes
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
  transition: transform 0.3s ease;
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
