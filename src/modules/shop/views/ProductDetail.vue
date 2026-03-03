<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <!-- Loading skeleton -->
    <div v-if="loading" class="animate-pulse">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div class="aspect-square rounded-2xl shimmer"></div>
        <div class="space-y-5 py-4">
          <div class="h-3 w-20 rounded-full shimmer"></div>
          <div class="h-8 w-3/4 rounded-full shimmer"></div>
          <div class="h-4 w-1/4 rounded-full shimmer"></div>
          <div class="h-10 w-1/3 rounded-full shimmer"></div>
          <div class="space-y-2 pt-4">
            <div class="h-4 w-full rounded-full shimmer"></div>
            <div class="h-4 w-5/6 rounded-full shimmer"></div>
            <div class="h-4 w-4/6 rounded-full shimmer"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product not found -->
    <div v-else-if="!product" class="py-24 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5">
        <svg class="h-7 w-7 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      </div>
      <h2 class="mt-5 text-xl font-bold text-ink font-display dark:text-ink">Product not found</h2>
      <p class="mt-2 text-sm text-ink-muted">The product you're looking for doesn't exist or has been removed.</p>
      <router-link
        to="/products"
        class="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/80 transition-all active:scale-[0.98] dark:bg-white dark:text-ink dark:hover:bg-white/80"
      >
        Browse Products
      </router-link>
    </div>

    <!-- Product content -->
    <template v-else>
      <!-- Breadcrumb -->
      <nav class="mb-8 flex items-center gap-2 text-xs text-ink-muted animate-fade-in">
        <router-link to="/" class="hover:text-ink transition-colors dark:hover:text-ink">Home</router-link>
        <ChevronRightIcon class="h-3 w-3" />
        <router-link to="/products" class="hover:text-ink transition-colors dark:hover:text-ink">Products</router-link>
        <ChevronRightIcon class="h-3 w-3" />
        <span class="text-ink dark:text-ink font-medium">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Image gallery -->
        <div class="animate-fade-in-up">
          <div class="aspect-square overflow-hidden rounded-2xl bg-border-light dark:bg-[#1A1A1A]">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="h-full w-full object-cover object-center transition-all duration-500"
            />
          </div>
          <!-- Thumbnails -->
          <div v-if="productImages.length > 1" class="mt-4 flex gap-3">
            <button
              v-for="(img, idx) in productImages"
              :key="idx"
              @click="selectedImage = img"
              class="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200"
              :class="selectedImage === img
                ? 'border-ink dark:border-white ring-1 ring-ink/10 dark:ring-white/10'
                : 'border-border opacity-60 hover:opacity-100 dark:border-border'"
            >
              <img :src="img" :alt="`${product.name} ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product info -->
        <div class="animate-fade-in-up" style="animation-delay: 0.1s">
          <!-- Category -->
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
            {{ product.category || 'General' }}
          </span>

          <h1 class="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl font-display dark:text-ink leading-tight">
            {{ product.name }}
          </h1>

          <!-- Rating -->
          <div class="mt-4 flex items-center gap-3">
            <div class="flex items-center gap-0.5">
              <svg
                v-for="i in 5"
                :key="i"
                class="h-4 w-4"
                :class="i <= Math.round(product.rating || 4) ? 'text-amber' : 'text-border dark:text-border'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-ink-muted">
              {{ product.rating || 4 }}/5
            </span>
            <span class="text-ink-muted">&#183;</span>
            <span class="text-sm text-ink-muted">{{ product.reviews_count || 0 }} reviews</span>
          </div>

          <!-- Price -->
          <div class="mt-6 flex items-baseline gap-3">
            <span class="text-3xl font-bold text-ink font-display dark:text-ink">${{ formatPrice(product.price) }}</span>
            <span v-if="product.original_price" class="text-lg text-ink-muted line-through">
              ${{ formatPrice(product.original_price) }}
            </span>
            <span
              v-if="product.original_price"
              class="rounded-full bg-coral/10 px-3 py-1 text-[11px] font-bold text-coral"
            >
              Save {{ Math.round((1 - product.price / product.original_price) * 100) }}%
            </span>
          </div>

          <!-- Stock status -->
          <div class="mt-4">
            <span
              v-if="product.quantity > 10 || product.in_stock !== false"
              class="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest dark:text-emerald-400"
            >
              <CheckCircleIcon class="h-4 w-4" />
              In Stock
            </span>
            <span
              v-else-if="product.quantity > 0"
              class="inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber"
            >
              <ExclamationTriangleIcon class="h-4 w-4" />
              Only {{ product.quantity }} left
            </span>
            <span
              v-else
              class="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral"
            >
              <XCircleIcon class="h-4 w-4" />
              Out of Stock
            </span>
          </div>

          <!-- Divider -->
          <div class="my-6 border-t border-border dark:border-border"></div>

          <!-- Description -->
          <div>
            <p class="text-sm leading-relaxed text-ink-light dark:text-ink-muted">
              {{ product.description || 'No description available for this product.' }}
            </p>
          </div>

          <!-- Add to cart -->
          <div class="mt-8 space-y-4">
            <div class="flex items-center gap-4">
              <label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Quantity</label>
              <div class="flex items-center rounded-xl border border-border dark:border-border">
                <button
                  @click="quantity > 1 && quantity--"
                  class="flex h-10 w-10 items-center justify-center text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
                >
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="w-12 text-center text-sm font-semibold text-ink dark:text-ink">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="flex h-10 w-10 items-center justify-center text-ink-muted hover:text-ink transition-colors dark:hover:text-ink"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="handleAddToCart"
                class="flex-1 rounded-xl bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ink/20 dark:bg-white dark:text-ink dark:hover:bg-white/80 dark:focus:ring-white/20"
              >
                Add to Cart
              </button>
              <button
                class="flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-border text-ink-muted transition-all hover:border-coral hover:text-coral dark:border-border dark:text-ink-muted dark:hover:border-coral dark:hover:text-coral"
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
              <div v-if="showAddedMessage" class="flex items-center gap-2 rounded-xl bg-forest/10 p-3 text-sm font-medium text-forest dark:text-emerald-400">
                <CheckCircleIcon class="h-5 w-5" />
                Added to cart!
              </div>
            </Transition>
          </div>

          <!-- Product details accordion -->
          <div class="mt-8 divide-y divide-border border-t border-border dark:divide-border dark:border-border">
            <div class="py-4">
              <button
                @click="detailsOpen.features = !detailsOpen.features"
                class="flex w-full items-center justify-between text-sm font-semibold text-ink dark:text-ink"
              >
                Features & Details
                <ChevronDownIcon
                  class="h-4 w-4 text-ink-muted transition-transform duration-200"
                  :class="{ 'rotate-180': detailsOpen.features }"
                />
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out overflow-hidden"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-40 opacity-100"
                leave-active-class="transition-all duration-150 ease-in overflow-hidden"
                leave-from-class="max-h-40 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-show="detailsOpen.features" class="mt-3 text-sm text-ink-light dark:text-ink-muted leading-relaxed">
                  <ul class="list-inside list-disc space-y-1.5">
                    <li>Premium quality materials</li>
                    <li>Durable and long-lasting construction</li>
                    <li>Designed for everyday use</li>
                    <li>Easy to maintain and clean</li>
                  </ul>
                </div>
              </Transition>
            </div>
            <div class="py-4">
              <button
                @click="detailsOpen.shipping = !detailsOpen.shipping"
                class="flex w-full items-center justify-between text-sm font-semibold text-ink dark:text-ink"
              >
                Shipping & Returns
                <ChevronDownIcon
                  class="h-4 w-4 text-ink-muted transition-transform duration-200"
                  :class="{ 'rotate-180': detailsOpen.shipping }"
                />
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out overflow-hidden"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-40 opacity-100"
                leave-active-class="transition-all duration-150 ease-in overflow-hidden"
                leave-from-class="max-h-40 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-show="detailsOpen.shipping" class="mt-3 text-sm text-ink-light dark:text-ink-muted leading-relaxed">
                  <p>Free shipping on orders over $50. Standard delivery takes 3-5 business days.</p>
                  <p class="mt-2">30-day return policy. Items must be in original condition.</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section class="mt-20">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">You might also like</span>
            <h2 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-ink">Related Products</h2>
          </div>
        </div>
        <ProductGrid
          :products="relatedProducts"
          :loading="false"
          :skeleton-count="4"
          @quickview="openQuickview"
          @add-to-cart="cartStore.addItem($event)"
        />
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
  const mainImg = product.value.image_url || product.value.image || 'https://placehold.co/600x600/F2EFEA/A09B94?text=Product';
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
  // Use slug from route, fallback to id for legacy URLs
  const identifier = route.params.slug || route.params.id;
  const result = await productStore.fetchProduct(identifier);
  product.value = result;
  if (product.value) {
    selectedImage.value = product.value.image_url || product.value.image || 'https://placehold.co/600x600/F2EFEA/A09B94?text=Product';
  }
  loading.value = false;
}

onMounted(() => {
  loadProduct();
  productStore.fetchProducts();
});

watch(() => route.params.slug, () => {
  loadProduct();
  quantity.value = 1;
});
</script>
