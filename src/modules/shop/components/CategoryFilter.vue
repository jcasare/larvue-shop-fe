<template>
  <div class="space-y-6">
    <!-- Categories -->
    <div>
      <button
        @click="sectionsOpen.categories = !sectionsOpen.categories"
        class="flex w-full items-center justify-between"
      >
        <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Categories</span>
        <ChevronDownIcon
          class="h-3.5 w-3.5 text-ink-muted transition-transform duration-200"
          :class="{ 'rotate-180': sectionsOpen.categories }"
        />
      </button>
      <div v-show="sectionsOpen.categories" class="mt-3 space-y-1">
        <label
          v-for="cat in categories"
          :key="cat.id || cat.slug || cat.name"
          class="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
          :class="selectedCategory === (cat.slug || cat.name) ? 'text-ink font-medium dark:text-ink' : 'text-ink-light dark:text-ink-muted'"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-full border transition-colors"
            :class="selectedCategory === (cat.slug || cat.name) ? 'border-ink bg-ink dark:border-white dark:bg-white' : 'border-border dark:border-border'"
          >
            <span
              v-if="selectedCategory === (cat.slug || cat.name)"
              class="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#111]"
            ></span>
          </span>
          <input
            type="radio"
            name="category"
            :value="cat.slug || cat.name"
            :checked="selectedCategory === (cat.slug || cat.name)"
            @change="$emit('update:category', cat.slug || cat.name)"
            class="sr-only"
          />
          <span class="flex-1">{{ cat.name }}</span>
          <span v-if="cat.product_count" class="text-[11px] text-ink-muted">{{ cat.product_count }}</span>
        </label>
        <button
          v-if="selectedCategory"
          @click="$emit('update:category', '')"
          class="ml-2 mt-1 text-xs font-medium text-coral hover:text-coral-dark transition-colors"
        >
          Clear category
        </button>
      </div>
    </div>

    <!-- Price Range -->
    <div class="border-t border-border pt-6 dark:border-border">
      <button
        @click="sectionsOpen.price = !sectionsOpen.price"
        class="flex w-full items-center justify-between"
      >
        <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Price Range</span>
        <ChevronDownIcon
          class="h-3.5 w-3.5 text-ink-muted transition-transform duration-200"
          :class="{ 'rotate-180': sectionsOpen.price }"
        />
      </button>
      <div v-show="sectionsOpen.price" class="mt-3 space-y-3">
        <div class="flex items-center gap-2">
          <div class="relative flex-1">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted">$</span>
            <input
              type="number"
              :value="minPrice"
              @input="$emit('update:minPrice', $event.target.value ? Number($event.target.value) : null)"
              placeholder="Min"
              min="0"
              class="w-full rounded-lg border border-border bg-surface py-2 pl-6 pr-3 text-sm text-ink dark:border-border dark:bg-surface dark:text-ink"
            />
          </div>
          <span class="text-ink-muted text-xs">to</span>
          <div class="relative flex-1">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted">$</span>
            <input
              type="number"
              :value="maxPrice"
              @input="$emit('update:maxPrice', $event.target.value ? Number($event.target.value) : null)"
              placeholder="Max"
              min="0"
              class="w-full rounded-lg border border-border bg-surface py-2 pl-6 pr-3 text-sm text-ink dark:border-border dark:bg-surface dark:text-ink"
            />
          </div>
        </div>
        <!-- Quick presets -->
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="range in priceRanges"
            :key="range.label"
            @click="$emit('update:minPrice', range.min); $emit('update:maxPrice', range.max)"
            class="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-ink-light transition-all hover:border-ink hover:text-ink dark:border-border dark:text-ink-muted dark:hover:border-white/40 dark:hover:text-white"
          >
            {{ range.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Rating Filter -->
    <div class="border-t border-border pt-6 dark:border-border">
      <button
        @click="sectionsOpen.rating = !sectionsOpen.rating"
        class="flex w-full items-center justify-between"
      >
        <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Rating</span>
        <ChevronDownIcon
          class="h-3.5 w-3.5 text-ink-muted transition-transform duration-200"
          :class="{ 'rotate-180': sectionsOpen.rating }"
        />
      </button>
      <div v-show="sectionsOpen.rating" class="mt-3 space-y-1">
        <button
          v-for="stars in [4, 3, 2, 1]"
          :key="stars"
          @click="$emit('update:rating', stars)"
          class="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-ink/5 transition-colors dark:hover:bg-white/5"
        >
          <div class="flex items-center gap-0.5">
            <svg
              v-for="i in 5"
              :key="i"
              class="h-3.5 w-3.5"
              :class="i <= stars ? 'text-amber' : 'text-border dark:text-border'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-ink-muted">& up</span>
        </button>
      </div>
    </div>

    <!-- Reset Filters -->
    <div class="border-t border-border pt-6 dark:border-border">
      <button
        @click="$emit('reset')"
        class="w-full rounded-xl border border-border py-2.5 text-xs font-semibold text-ink-light transition-all hover:bg-ink/5 hover:text-ink dark:border-border dark:text-ink-muted dark:hover:bg-white/5 dark:hover:text-white"
      >
        Reset all filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

defineProps({
  categories: { type: Array, default: () => [] },
  selectedCategory: { type: String, default: '' },
  minPrice: { type: Number, default: null },
  maxPrice: { type: Number, default: null },
});

defineEmits(['update:category', 'update:minPrice', 'update:maxPrice', 'update:rating', 'reset']);

const sectionsOpen = reactive({
  categories: true,
  price: true,
  rating: true,
});

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25-$50', min: 25, max: 50 },
  { label: '$50-$100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: null },
];
</script>
