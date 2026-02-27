<template>
  <section class="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-20">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Stay in the loop
        </h2>
        <p class="mt-2 max-w-md text-gray-600 dark:text-gray-400">
          Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
        </p>
      </div>
      <div class="mt-8 lg:mt-0 lg:shrink-0">
        <form @submit.prevent="handleSubmit" class="flex gap-3">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:w-72 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
          />
          <button
            type="submit"
            class="shrink-0 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Subscribe
          </button>
        </form>
        <p v-if="submitted" class="mt-2 text-sm text-teal-600 dark:text-teal-400">
          Thanks for subscribing!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const submitted = ref(false);

function handleSubmit() {
  // TODO: Wire up newsletter subscription API
  submitted.value = true;
  email.value = '';
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
}
</script>
