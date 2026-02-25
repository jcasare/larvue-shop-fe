<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
    <p class="text-7xl font-bold text-red-600 sm:text-9xl">!</p>
    <h1 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
      Invalid Subdomain
    </h1>
    <p class="mt-2 max-w-md text-center text-gray-500 dark:text-gray-400">
      The subdomain <strong class="text-gray-700 dark:text-gray-300">{{ hostname }}</strong> is not recognized. Please use one of the following:
    </p>
    <ul class="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
      <li><strong>shop.</strong> — Customer store</li>
      <li><strong>manage.</strong> — Admin dashboard</li>
    </ul>
  </div>
</template>

<script setup>
const hostname = window.location.hostname
</script>
