<template>
  <section class="relative overflow-hidden bg-ink dark:bg-[#0A0A0A] -mb-px">
    <!-- Decorative gradient orbs -->
    <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-coral/10 blur-3xl"></div>
    <div class="absolute top-1/2 -left-24 h-72 w-72 -translate-y-1/2 rounded-full bg-forest/8 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center rounded-full border border-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-5">
          Stay Updated
        </span>
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
          Join the Larvue community
        </h2>
        <p class="mt-4 text-base text-white/40 leading-relaxed max-w-md mx-auto">
          Get early access to new arrivals, exclusive deals, and curated picks delivered to your inbox.
        </p>
        <form @submit.prevent="handleSubmit" class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/30 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all"
          />
          <button
            type="submit"
            class="shrink-0 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <p v-if="submitted" class="mt-4 text-sm text-forest dark:text-emerald-400 font-medium">
            Welcome aboard! Check your inbox for a surprise.
          </p>
        </Transition>
        <p class="mt-4 text-[11px] text-white/20">
          No spam, ever. Unsubscribe anytime.
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
  submitted.value = true;
  email.value = '';
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
}
</script>
