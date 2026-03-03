<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="product ? 'Edit Product' : 'Add Product'"
    modal
    :style="{ width: '600px' }"
    :closable="!loading"
    :pt="{
      root: { class: 'admin-dialog' },
      header: { class: '!bg-surface !border-b !border-border dark:!bg-[#141414] dark:!border-white/[0.06]' },
      content: { class: '!bg-surface dark:!bg-[#141414]' },
      headerTitle: { class: '!text-ink !font-display !font-bold dark:!text-white/90' },
      closeButton: { class: '!text-ink-muted hover:!text-ink dark:!text-white/30 dark:hover:!text-white/60' },
    }"
  >
    <div v-if="fetchingProduct" class="flex items-center justify-center py-10">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-ink/10 border-t-ink dark:border-white/10 dark:border-t-white/60"></div>
    </div>
    <form v-else @submit.prevent="handleSubmit" class="space-y-5 pt-2">
      <!-- Name -->
      <div>
        <label for="name" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/35 dark:focus:border-white/15 dark:focus:ring-white/10"
        />
        <p v-if="errors.name" class="mt-1 text-[11px] text-coral">{{ errors.name }}</p>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all resize-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/35 dark:focus:border-white/15 dark:focus:ring-white/10"
        />
        <p v-if="errors.description" class="mt-1 text-[11px] text-coral">{{ errors.description }}</p>
      </div>

      <!-- Category & Price -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="category_id" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Category</label>
          <select
            id="category_id"
            v-model="form.category_id"
            class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
          >
            <option :value="null">No category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
          <p v-if="errors.category_id" class="mt-1 text-[11px] text-coral">{{ errors.category_id }}</p>
        </div>

        <div>
          <label for="price" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Price</label>
          <input
            id="price"
            v-model="form.price"
            type="number"
            step="0.01"
            min="0"
            required
            class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
          />
          <p v-if="errors.price" class="mt-1 text-[11px] text-coral">{{ errors.price }}</p>
        </div>
      </div>

      <!-- Quantity & Featured -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="quantity" class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Quantity</label>
          <input
            id="quantity"
            v-model="form.quantity"
            type="number"
            min="0"
            step="1"
            required
            class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
          />
          <p v-if="errors.quantity" class="mt-1 text-[11px] text-coral">{{ errors.quantity }}</p>
        </div>

        <div class="flex items-end pb-2.5">
          <label class="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              v-model="form.featured"
              class="h-4 w-4 rounded border-border bg-paper text-coral focus:ring-coral/30 focus:ring-offset-0 dark:border-white/10 dark:bg-white/5"
            />
            <span class="text-sm font-medium text-ink-light dark:text-white/50">Featured product</span>
          </label>
        </div>
      </div>

      <!-- Images -->
      <div>
        <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">
          Images
          <span class="text-ink-muted dark:text-white/50">(first image is the main image)</span>
        </label>

        <!-- Existing images (when editing) -->
        <div v-if="existingImages.length > 0" class="mb-3">
          <p class="text-[11px] text-ink-muted mb-2 dark:text-white/40">Current images</p>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(img, idx) in existingImages"
              :key="img.id || idx"
              class="relative group"
            >
              <img
                :src="img.image_url || img.url || img"
                alt="Product image"
                class="h-16 w-16 rounded-lg object-cover border border-border dark:border-white/[0.06]"
              />
              <button
                type="button"
                @click="removeExistingImage(idx)"
                class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
              <span v-if="idx === 0" class="absolute bottom-0.5 left-0.5 rounded bg-ink/70 px-1 py-0.5 text-[8px] font-bold text-white">Main</span>
            </div>
          </div>
        </div>

        <!-- New images upload -->
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          @change="onImagesChange"
          class="block w-full text-sm text-ink-muted file:mr-4 file:rounded-lg file:border-0 file:bg-ink/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink hover:file:bg-ink/10 dark:text-white/50 dark:file:bg-white/[0.06] dark:file:text-white/50 dark:hover:file:bg-white/10"
        />
        <p v-if="errors.image || errors.images" class="mt-1 text-[11px] text-coral">{{ errors.image || errors.images }}</p>

        <!-- New image previews -->
        <div v-if="newImagePreviews.length > 0" class="mt-3 flex flex-wrap gap-2">
          <div
            v-for="(preview, idx) in newImagePreviews"
            :key="idx"
            class="relative group"
          >
            <img
              :src="preview"
              alt="Preview"
              class="h-16 w-16 rounded-lg object-cover border border-border dark:border-white/[0.06]"
            />
            <button
              type="button"
              @click="removeNewImage(idx)"
              class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
        {{ errorMessage }}
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 transition-colors dark:border-white/[0.08] dark:text-white/40 dark:hover:bg-white/5"
          :disabled="loading"
          @click="$emit('update:visible', false)"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : (product ? 'Update' : 'Create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import { createProduct, updateProduct, getProduct } from '@/modules/admin/api/products'
import { getCategories } from '@/modules/admin/api/categories'
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
const categories = ref([])

// Image handling
const existingImages = ref([])
const newImages = ref([])
const newImagePreviews = ref([])
const removedImageIds = ref([])

const form = ref({
  name: '',
  description: '',
  price: '',
  quantity: 0,
  category_id: null,
  featured: false,
})

const fetchingProduct = ref(false)

const defaultForm = () => ({
  name: '',
  description: '',
  price: '',
  quantity: 0,
  category_id: null,
  featured: false,
})

onMounted(async () => {
  try {
    const response = await getCategories()
    categories.value = response.data.data || response.data
  } catch {
    categories.value = []
  }
})

watch(() => props.visible, async (isVisible) => {
  if (isVisible) {
    errorMessage.value = ''
    errors.value = {}
    newImages.value = []
    newImagePreviews.value = []
    removedImageIds.value = []
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
          category_id: fullProduct.category_id ?? null,
          featured: fullProduct.featured ?? false,
        }
        existingImages.value = fullProduct.images || []
      } catch {
        form.value = {
          name: props.product.name || '',
          description: props.product.description || '',
          price: props.product.price || '',
          quantity: props.product.quantity ?? 0,
          category_id: null,
          featured: false,
        }
        existingImages.value = props.product.images || []
      } finally {
        fetchingProduct.value = false
      }
    } else {
      form.value = defaultForm()
      existingImages.value = []
    }
  }
})

function onImagesChange(event) {
  const files = Array.from(event.target.files)
  for (const file of files) {
    newImages.value.push(file)
    newImagePreviews.value.push(URL.createObjectURL(file))
  }
  event.target.value = ''
}

function removeExistingImage(idx) {
  const img = existingImages.value[idx]
  if (img?.id) {
    removedImageIds.value.push(img.id)
  }
  existingImages.value.splice(idx, 1)
}

function removeNewImage(idx) {
  URL.revokeObjectURL(newImagePreviews.value[idx])
  newImages.value.splice(idx, 1)
  newImagePreviews.value.splice(idx, 1)
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
  formData.append('featured', form.value.featured ? '1' : '0')
  if (form.value.category_id) {
    formData.append('category_id', form.value.category_id)
  }
  for (const file of newImages.value) {
    formData.append('images[]', file)
  }
  for (const id of removedImageIds.value) {
    formData.append('removed_images[]', id)
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
