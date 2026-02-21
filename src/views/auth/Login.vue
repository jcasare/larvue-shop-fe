<template>
  <AuthLayout>
    <template #header>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
    </template>

    <form class="space-y-6" action="#" method="POST">
      <FormInput id="email" label="Email address" type="email" autocomplete="email" />

      <FormInput id="password" label="Password" type="password" autocomplete="current-password">
        <template #label-end>
          <div class="text-sm">
            <router-link :to="{ name: 'forgot-password' }" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</router-link>
          </div>
        </template>
      </FormInput>

      <div class="flex items-center">
        <input id="remember" v-model="remember" type="checkbox" class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" />
        <label for="remember" class="ml-2 block text-sm/6 text-gray-300">Remember me</label>
      </div>

      <FormButton>Sign in</FormButton>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-400">
      Not a member?
      {{ ' ' }}
      <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Get Started</a>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormButton from '@/components/form/FormButton.vue'

const remember = ref(false)
</script>
