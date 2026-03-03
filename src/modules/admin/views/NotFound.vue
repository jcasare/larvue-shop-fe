<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-paper px-4 dark:bg-[#080808]">
    <p class="text-7xl font-bold text-coral font-display sm:text-9xl animate-fade-in-up">404</p>
    <h1 class="mt-4 text-2xl font-semibold text-ink font-display sm:text-3xl animate-fade-in-up dark:text-white/90" style="animation-delay: 0.05s">
      Page not found
    </h1>
    <p class="mt-2 text-center text-ink-muted animate-fade-in-up dark:text-white/30" style="animation-delay: 0.1s">
      Sorry, we couldn't find the page you're looking for.
    </p>
    <router-link
      to="/dashboard"
      class="mt-8 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/80 transition-all active:scale-[0.98] animate-fade-in-up dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
      style="animation-delay: 0.15s"
    >
      Back to dashboard
    </router-link>
  </div>
</template>
