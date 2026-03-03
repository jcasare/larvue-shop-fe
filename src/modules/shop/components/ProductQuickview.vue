<template>
  <Teleport to="body">
    <Transition name="quickview">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl dark:bg-surface"
            @click.stop
          >
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-muted hover:bg-ink/10 hover:text-ink transition-colors dark:bg-white/10 dark:text-ink-muted dark:hover:bg-white/20 dark:hover:text-white"
            >
              <XMarkIcon class="h-4 w-4" />
            </button>

            <div class="grid grid-cols-1 sm:grid-cols-2">
              <!-- Image -->
              <div class="aspect-square bg-border-light dark:bg-[#1A1A1A]">
                <img
                  :src="product.image_url || product.image || 'https://placehold.co/500x500/F2EFEA/A09B94?text=Product'"
                  :alt="product.name"
                  class="h-full w-full object-cover object-center"
                />
              </div>

              <!-- Details -->
              <div class="flex flex-col p-6">
                <span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {{ product.category || 'General' }}
                </span>
                <h2 class="mt-1.5 text-xl font-bold text-ink font-display dark:text-ink">{{ product.name }}</h2>

                <!-- Rating -->
                <div class="mt-3 flex items-center gap-2">
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
                  <span class="text-xs text-ink-muted">{{ product.reviews_count || 0 }} reviews</span>
                </div>

                <!-- Price -->
                <div class="mt-4 flex items-baseline gap-2">
                  <span class="text-2xl font-bold text-ink font-display dark:text-ink">${{ formatPrice(product.price) }}</span>
                  <span v-if="product.original_price" class="text-sm text-ink-muted line-through">
                    ${{ formatPrice(product.original_price) }}
                  </span>
                  <span
                    v-if="product.original_price"
                    class="rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold text-coral"
                  >
                    -{{ Math.round((1 - product.price / product.original_price) * 100) }}%
                  </span>
                </div>

                <!-- Description -->
                <p class="mt-4 text-sm leading-relaxed text-ink-light line-clamp-3 dark:text-ink-muted">
                  {{ product.description || 'No description available.' }}
                </p>

                <!-- Stock -->
                <div class="mt-4">
                  <span
                    v-if="product.quantity > 10 || product.in_stock !== false"
                    class="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-semibold text-forest dark:text-emerald-400"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-forest dark:bg-emerald-400"></span>
                    In Stock
                  </span>
                  <span
                    v-else-if="product.quantity > 0"
                    class="inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-2.5 py-1 text-[11px] font-semibold text-amber"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-amber"></span>
                    Only {{ product.quantity }} left
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-1 text-[11px] font-semibold text-coral"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-coral"></span>
                    Out of Stock
                  </span>
                </div>

                <!-- Quantity + Actions -->
                <div class="mt-auto pt-6 space-y-3">
                  <div class="flex items-center gap-3">
                    <label class="text-xs font-medium text-ink-light dark:text-ink-muted">Qty</label>
                    <select
                      v-model="quantity"
                      class="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-ink dark:border-border dark:bg-surface dark:text-ink"
                    >
                      <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>
                  </div>
                  <button
                    @click="handleAddToCart"
                    class="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] dark:bg-white dark:text-[#111] dark:hover:bg-white/80"
                  >
                    Add to Cart
                  </button>
                  <router-link
                    :to="{ name: 'product-detail', params: { category: product.category || 'shop', slug: product.slug || product.id } }"
                    @click="$emit('close')"
                    class="block text-center text-xs font-medium text-ink-muted hover:text-ink transition-colors dark:hover:text-white"
                  >
                    View full details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  show: { type: Boolean, default: false },
  product: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['close', 'addToCart']);

const quantity = ref(1);

function handleAddToCart() {
  emit('addToCart', props.product, quantity.value);
  emit('close');
}

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}
</script>

<style scoped>
.quickview-enter-active {
  transition: opacity 0.25s ease;
}
.quickview-enter-active > div:last-child > div:last-child {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}
.quickview-leave-active {
  transition: opacity 0.2s ease;
}
.quickview-enter-from,
.quickview-leave-to {
  opacity: 0;
}
.quickview-enter-from > div:last-child > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>
