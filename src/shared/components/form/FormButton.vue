<template>
  <button
    type="submit"
    class="flex w-full justify-center rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-ink dark:hover:bg-white/80 dark:focus-visible:outline-white/50"
  >
    <slot />
  </button>
</template>
