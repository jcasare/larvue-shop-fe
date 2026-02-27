<template>
  <div class="space-y-6">
    <!-- Categories -->
    <div>
      <button
        @click="sectionsOpen.categories = !sectionsOpen.categories"
        class="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white"
      >
        Categories
        <ChevronDownIcon
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': sectionsOpen.categories }"
        />
      </button>
      <div v-show="sectionsOpen.categories" class="mt-3 space-y-2">
        <label
          v-for="cat in categories"
          :key="cat.id || cat.slug || cat.name"
          class="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <input
            type="radio"
            name="category"
            :value="cat.slug || cat.name"
            :checked="selectedCategory === (cat.slug || cat.name)"
            @change="$emit('update:category', cat.slug || cat.name)"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
          />
          {{ cat.name }}
          <span v-if="cat.product_count" class="ml-auto text-xs text-gray-400">({{ cat.product_count }})</span>
        </label>
        <button
          v-if="selectedCategory"
          @click="$emit('update:category', '')"
          class="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Clear category
        </button>
      </div>
    </div>

    <!-- Price Range -->
    <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
      <button
        @click="sectionsOpen.price = !sectionsOpen.price"
        class="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white"
      >
        Price Range
        <ChevronDownIcon
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': sectionsOpen.price }"
        />
      </button>
      <div v-show="sectionsOpen.price" class="mt-3 space-y-3">
        <div class="flex items-center gap-2">
          <div class="relative flex-1">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
            <input
              type="number"
              :value="minPrice"
              @input="$emit('update:minPrice', $event.target.value ? Number($event.target.value) : null)"
              placeholder="Min"
              min="0"
              class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <span class="text-gray-400">-</span>
          <div class="relative flex-1">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
            <input
              type="number"
              :value="maxPrice"
              @input="$emit('update:maxPrice', $event.target.value ? Number($event.target.value) : null)"
              placeholder="Max"
              min="0"
              class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <!-- Quick presets -->
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="range in priceRanges"
            :key="range.label"
            @click="$emit('update:minPrice', range.min); $emit('update:maxPrice', range.max)"
            class="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
          >
            {{ range.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Rating Filter -->
    <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
      <button
        @click="sectionsOpen.rating = !sectionsOpen.rating"
        class="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white"
      >
        Customer Rating
        <ChevronDownIcon
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': sectionsOpen.rating }"
        />
      </button>
      <div v-show="sectionsOpen.rating" class="mt-3 space-y-2">
        <button
          v-for="stars in [4, 3, 2, 1]"
          :key="stars"
          @click="$emit('update:rating', stars)"
          class="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          <div class="flex items-center">
            <svg
              v-for="i in 5"
              :key="i"
              class="h-4 w-4"
              :class="i <= stars ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-gray-600 dark:text-gray-400">& Up</span>
        </button>
      </div>
    </div>

    <!-- Reset Filters -->
    <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
      <button
        @click="$emit('reset')"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
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
