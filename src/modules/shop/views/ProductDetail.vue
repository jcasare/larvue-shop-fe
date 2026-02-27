<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Loading skeleton -->
    <div v-if="loading" class="animate-pulse">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        <div class="space-y-4">
          <div class="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-10 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="space-y-2">
            <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
            <div class="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div class="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product not found -->
    <div v-else-if="!product" class="py-16 text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
      <p class="mt-2 text-gray-500 dark:text-gray-400">The product you're looking for doesn't exist.</p>
      <router-link
        to="/products"
        class="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Browse Products
      </router-link>
    </div>

    <!-- Product content -->
    <template v-else>
      <!-- Breadcrumb -->
      <nav class="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <router-link to="/" class="hover:text-gray-700 dark:hover:text-white">Home</router-link>
        <ChevronRightIcon class="h-4 w-4" />
        <router-link to="/products" class="hover:text-gray-700 dark:hover:text-white">Products</router-link>
        <ChevronRightIcon class="h-4 w-4" />
        <span class="text-gray-900 dark:text-white">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Image gallery -->
        <div>
          <div class="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <!-- Thumbnails -->
          <div v-if="productImages.length > 1" class="mt-4 flex gap-3">
            <button
              v-for="(img, idx) in productImages"
              :key="idx"
              @click="selectedImage = img"
              class="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors"
              :class="selectedImage === img ? 'border-indigo-600' : 'border-gray-200 dark:border-gray-700'"
            >
              <img :src="img" :alt="`${product.name} ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product info -->
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {{ product.name }}
          </h1>

          <!-- Rating -->
          <div class="mt-3 flex items-center gap-2">
            <div class="flex items-center">
              <svg
                v-for="i in 5"
                :key="i"
                class="h-5 w-5"
                :class="i <= Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ product.rating || 4 }} out of 5 ({{ product.reviews_count || 0 }} reviews)
            </span>
          </div>

          <!-- Price -->
          <div class="mt-6 flex items-baseline gap-3">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ formatPrice(product.price) }}</span>
            <span v-if="product.original_price" class="text-lg text-gray-500 line-through dark:text-gray-400">
              ${{ formatPrice(product.original_price) }}
            </span>
            <span
              v-if="product.original_price"
              class="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400"
            >
              Save {{ Math.round((1 - product.price / product.original_price) * 100) }}%
            </span>
          </div>

          <!-- Stock status -->
          <div class="mt-4">
            <span
              v-if="product.quantity > 10 || product.in_stock !== false"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400"
            >
              <CheckCircleIcon class="h-5 w-5" />
              In Stock
            </span>
            <span
              v-else-if="product.quantity > 0"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-600 dark:text-yellow-400"
            >
              <ExclamationTriangleIcon class="h-5 w-5" />
              Only {{ product.quantity }} left in stock
            </span>
            <span
              v-else
              class="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400"
            >
              <XCircleIcon class="h-5 w-5" />
              Out of Stock
            </span>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Description</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {{ product.description || 'No description available for this product.' }}
            </p>
          </div>

          <!-- Add to cart -->
          <div class="mt-8 space-y-4">
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
              <div class="flex items-center rounded-lg border border-gray-300 dark:border-gray-600">
                <button
                  @click="quantity > 1 && quantity--"
                  class="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="w-12 text-center text-sm font-medium text-gray-900 dark:text-white">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="handleAddToCart"
                class="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Add to Cart
              </button>
              <button
                class="rounded-lg border border-gray-300 px-4 py-3 text-gray-500 transition-colors hover:border-red-300 hover:text-red-500 dark:border-gray-600 dark:text-gray-400 dark:hover:border-red-500 dark:hover:text-red-400"
              >
                <HeartIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Added confirmation -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="translate-y-2 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="showAddedMessage" class="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircleIcon class="h-5 w-5" />
                Added to cart!
              </div>
            </Transition>
          </div>

          <!-- Product details accordion -->
          <div class="mt-8 divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            <div class="py-4">
              <button
                @click="detailsOpen.features = !detailsOpen.features"
                class="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white"
              >
                Features & Details
                <ChevronDownIcon
                  class="h-5 w-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': detailsOpen.features }"
                />
              </button>
              <div v-show="detailsOpen.features" class="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <ul class="list-inside list-disc space-y-1">
                  <li>Premium quality materials</li>
                  <li>Durable and long-lasting construction</li>
                  <li>Designed for everyday use</li>
                  <li>Easy to maintain and clean</li>
                </ul>
              </div>
            </div>
            <div class="py-4">
              <button
                @click="detailsOpen.shipping = !detailsOpen.shipping"
                class="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white"
              >
                Shipping & Returns
                <ChevronDownIcon
                  class="h-5 w-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': detailsOpen.shipping }"
                />
              </button>
              <div v-show="detailsOpen.shipping" class="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <p>Free shipping on orders over $50. Standard delivery takes 3-5 business days.</p>
                <p class="mt-2">30-day return policy. Items must be in original condition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You may also like</h2>
        <div class="mt-6">
          <ProductGrid
            :products="relatedProducts"
            :loading="false"
            :skeleton-count="4"
            @quickview="openQuickview"
            @add-to-cart="cartStore.addItem($event)"
          />
        </div>
      </section>
    </template>

    <!-- Quickview for related products -->
    <ProductQuickview
      :show="quickviewOpen"
      :product="quickviewProduct"
      @close="quickviewOpen = false"
      @add-to-cart="cartStore.addItem($event)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';
import { useProductStore } from '@/modules/shop/stores/products';
import { useCartStore } from '@/modules/shop/stores/cart';
import ProductGrid from '@/modules/shop/components/ProductGrid.vue';
import ProductQuickview from '@/modules/shop/components/ProductQuickview.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const product = ref(null);
const quantity = ref(1);
const selectedImage = ref('');
const showAddedMessage = ref(false);
const quickviewOpen = ref(false);
const quickviewProduct = ref({});

const detailsOpen = reactive({
  features: false,
  shipping: false,
});

const productImages = computed(() => {
  if (!product.value) return [];
  const mainImg = product.value.image_url || product.value.image || 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Product';
  if (product.value.images?.length) {
    return [mainImg, ...product.value.images];
  }
  return [mainImg];
});

const relatedProducts = computed(() => {
  return productStore.products.filter((p) => p.id !== product.value?.id).slice(0, 4);
});

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

function handleAddToCart() {
  cartStore.addItem(product.value, quantity.value);
  showAddedMessage.value = true;
  setTimeout(() => {
    showAddedMessage.value = false;
  }, 2000);
}

function openQuickview(p) {
  quickviewProduct.value = p;
  quickviewOpen.value = true;
}

async function loadProduct() {
  loading.value = true;
  const result = await productStore.fetchProduct(route.params.id);
  product.value = result;
  if (product.value) {
    selectedImage.value = product.value.image_url || product.value.image || 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Product';
  }
  loading.value = false;
}

onMounted(() => {
  loadProduct();
  productStore.fetchProducts();
});

watch(() => route.params.id, () => {
  loadProduct();
  quantity.value = 1;
});
</script>
