<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
    <p class="text-7xl font-bold text-teal-600 sm:text-9xl">404</p>
    <h1 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
      Page not found
    </h1>
    <p class="mt-2 text-center text-gray-500 dark:text-gray-400">
      Sorry, we couldn't find the page you're looking for.
    </p>
    <router-link
      to="/"
      class="mt-8 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
    >
      Go back home
    </router-link>
  </div>
</template>
