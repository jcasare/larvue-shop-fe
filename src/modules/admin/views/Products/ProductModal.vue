<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="product ? 'Edit Product' : 'Add Product'"
    modal
    :style="{ width: '500px' }"
    :closable="!loading"
  >
    <div v-if="fetchingProduct" class="flex items-center justify-center py-10">
      <i class="pi pi-spinner pi-spin text-2xl text-indigo-600"></i>
    </div>
    <form v-else @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
      </div>

      <!-- Price -->
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
        <input
          id="price"
          v-model="form.price"
          type="number"
          step="0.01"
          min="0"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p v-if="errors.price" class="mt-1 text-sm text-red-500">{{ errors.price }}</p>
      </div>

      <!-- Quantity -->
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Quantity</label>
        <input
          id="quantity"
          v-model="form.quantity"
          type="number"
          min="0"
          step="1"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p v-if="errors.quantity" class="mt-1 text-sm text-red-500">{{ errors.quantity }}</p>
      </div>

      <!-- Image -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          @change="onImageChange"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
        />
        <p v-if="errors.image" class="mt-1 text-sm text-red-500">{{ errors.image }}</p>
        <!-- Image preview -->
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Preview"
          class="mt-2 h-24 w-24 rounded-lg object-cover"
        />
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
        {{ errorMessage }}
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          :disabled="loading"
          @click="$emit('update:visible', false)"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : (product ? 'Update' : 'Create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { createProduct, updateProduct, getProduct } from '@/modules/admin/api/products'
import { useProductStore } from '@/modules/admin/stores/products'

const props = defineProps({
  visible: { type: Boolean, default: false },
  product: { type: Object, default: null },
})

const emit = defineEmits(['update:visible'])

const productStore = useProductStore()
const loading = ref(false)
const errorMessage = ref('')
const errors = ref({})
const imagePreview = ref(null)

const form = ref({
  name: '',
  description: '',
  price: '',
  quantity: 0,
  image: null,
})

const fetchingProduct = ref(false)

watch(() => props.visible, async (isVisible) => {
  if (isVisible) {
    errorMessage.value = ''
    errors.value = {}
    if (props.product) {
      fetchingProduct.value = true
      try {
        const response = await getProduct(props.product.id)
        const fullProduct = response.data.data || response.data
        form.value = {
          name: fullProduct.name || '',
          description: fullProduct.description || '',
          price: fullProduct.price || '',
          quantity: fullProduct.quantity ?? 0,
          image: null,
        }
        imagePreview.value = fullProduct.image_url || null
      } catch {
        form.value = {
          name: props.product.name || '',
          description: props.product.description || '',
          price: props.product.price || '',
          quantity: props.product.quantity ?? 0,
          image: null,
        }
        imagePreview.value = props.product.image_url || null
      } finally {
        fetchingProduct.value = false
      }
    } else {
      form.value = { name: '', description: '', price: '', quantity: 0, image: null }
      imagePreview.value = null
    }
  }
})

function onImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  errors.value = {}

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.description || '')
  formData.append('price', form.value.price)
  formData.append('quantity', form.value.quantity)
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  try {
    if (props.product) {
      formData.append('_method', 'PUT')
      await updateProduct(props.product.id, formData)
    } else {
      await createProduct(formData)
    }
    emit('update:visible', false)
    productStore.fetchProducts()
  } catch (err) {
    if (err.response?.status === 422 && err.response.data?.errors) {
      errors.value = {}
      for (const [key, messages] of Object.entries(err.response.data.errors)) {
        errors.value[key] = messages[0]
      }
    } else if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
