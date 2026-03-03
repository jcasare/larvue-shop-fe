<template>
  <div class="relative w-full">
    <div class="relative">
      <MagnifyingGlassIcon class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        placeholder="Search for products..."
        @input="handleInput"
        @keydown.enter="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        class="w-full rounded-xl border border-border bg-ink/[0.03] pl-10 pr-4 py-2.5 text-sm text-ink placeholder-ink-muted focus:border-ink/20 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:bg-white/5 dark:border-border dark:text-ink dark:placeholder-ink-muted dark:focus:bg-surface dark:focus:border-white/20 dark:focus:ring-white/10"
      />
      <kbd
        v-if="!query"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center rounded border border-border px-1.5 text-[10px] font-medium text-ink-muted"
      >
        /
      </kbd>
    </div>

    <!-- Suggestions dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-[0.98] opacity-0 -translate-y-1"
      enter-to-class="scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="showSuggestions && suggestions.length > 0"
        class="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-ink/5 dark:border-border dark:bg-surface"
      >
        <button
          v-for="(suggestion, idx) in suggestions"
          :key="idx"
          @mousedown.prevent="selectSuggestion(suggestion)"
          class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-light hover:bg-ink/5 transition-colors dark:hover:bg-white/5"
        >
          <MagnifyingGlassIcon class="h-3.5 w-3.5 shrink-0 text-ink-muted" />
          <span>{{ suggestion }}</span>
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
