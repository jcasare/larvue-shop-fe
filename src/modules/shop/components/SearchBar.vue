<template>
  <div class="relative w-full max-w-lg">
    <div class="flex">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        placeholder="Search products..."
        @input="handleInput"
        @keydown.enter="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        class="w-full rounded-l-lg border border-r-0 border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-400"
      />
      <button
        @click="handleSearch"
        class="flex items-center rounded-r-lg bg-teal-600 px-4 text-white transition-colors hover:bg-teal-700"
      >
        <MagnifyingGlassIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Suggestions dropdown -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="showSuggestions && suggestions.length > 0"
        class="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <button
          v-for="(suggestion, idx) in suggestions"
          :key="idx"
          @mousedown.prevent="selectSuggestion(suggestion)"
          class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <MagnifyingGlassIcon class="h-4 w-4 shrink-0 text-gray-400" />
          {{ suggestion }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const query = ref('');
const showSuggestions = ref(false);
const suggestions = ref([]);
const inputRef = ref(null);

let debounceTimer = null;

function handleInput() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (query.value.length >= 2) {
      // TODO: Replace with API call for search suggestions
      suggestions.value = [
        `${query.value} in Electronics`,
        `${query.value} in Clothing`,
        `${query.value} - best sellers`,
      ];
    } else {
      suggestions.value = [];
    }
  }, 300);
}

function handleSearch() {
  if (query.value.trim()) {
    showSuggestions.value = false;
    router.push({ name: 'products', query: { search: query.value.trim() } });
  }
}

function selectSuggestion(suggestion) {
  query.value = suggestion;
  showSuggestions.value = false;
  handleSearch();
}

function hideSuggestions() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 150);
}
</script>
