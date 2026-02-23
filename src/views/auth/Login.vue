<template>
  <AuthLayout>
    <template #header>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
    </template>

    <form class="space-y-6" action="#" method="POST" @submit.prevent="handleLogin">
      <FormInput id="email" v-model="email" label="Email address" type="email" autocomplete="email" />

      <FormInput id="password" v-model="password" label="Password" type="password" autocomplete="current-password">
        <template #label-end>
          <div class="text-sm">
            <router-link :to="{ name: 'forgot-password' }" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</router-link>
          </div>
        </template>
      </FormInput>

      <div class="flex items-center">
        <input id="remember" v-model="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5" />
        <label for="remember" class="ml-2 block text-sm/6 text-gray-600 dark:text-gray-300">Remember me</label>
      </div>

      <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
        {{ error }}
      </div>

      <FormButton :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </FormButton>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
      Not a member?
      {{ ' ' }}
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Get Started</a>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormButton from '@/components/form/FormButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value, remember.value)
    router.push({ name: 'dashboard' })
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.status === 401) {
      error.value = 'Invalid email or password.'
    } else {
      error.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
