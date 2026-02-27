<template>
  <section class="bg-indigo-600 dark:bg-indigo-800">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-20">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Stay in the loop
        </h2>
        <p class="mt-2 max-w-md text-indigo-100">
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
            class="w-full min-w-0 rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white sm:w-72"
          />
          <button
            type="submit"
            class="shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Subscribe
          </button>
        </form>
        <p v-if="submitted" class="mt-2 text-sm text-indigo-200">
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
