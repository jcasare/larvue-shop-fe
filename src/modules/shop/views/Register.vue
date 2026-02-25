<template>
  <AuthLayout>
    <template #header>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Create your account</h2>
    </template>

    <form class="space-y-6" @submit.prevent="handleRegister">
      <FormInput id="name" v-model="name" label="Full name" type="text" autocomplete="name" />
      <FormInput id="email" v-model="email" label="Email address" type="email" autocomplete="email" />
      <FormInput id="password" v-model="password" label="Password" type="password" autocomplete="new-password" />
      <FormInput id="password_confirmation" v-model="passwordConfirmation" label="Confirm password" type="password" autocomplete="new-password" />

      <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
        {{ error }}
      </div>

      <FormButton :disabled="loading">
        {{ loading ? 'Creating account...' : 'Create account' }}
      </FormButton>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
      Already have an account?
      {{ ' ' }}
      <router-link :to="{ name: 'login' }" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Sign in</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/shared/layouts/AuthLayout.vue'
import FormInput from '@/shared/components/form/FormInput.vue'
import FormButton from '@/shared/components/form/FormButton.vue'
import { useAuthStore } from '@/modules/shop/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await authStore.register(name.value, email.value, password.value, passwordConfirmation.value)
    router.push({ name: 'home' })
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.status === 422 && err.response.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat()
      error.value = messages.join(' ')
    } else {
      error.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
