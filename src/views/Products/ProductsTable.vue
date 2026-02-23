<template>
  <div>
    <!-- Toolbar: search + count -->
    <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Found <span class="font-semibold text-gray-900 dark:text-white">{{ productStore.totalRecords }}</span> products
      </p>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          placeholder="Search products..."
          class="w-full sm:w-72"
        />
      </IconField>
    </div>

    <!-- Table -->
    <DataTable
      :value="tableData"
      :loading="productStore.loading"
      lazy
      :paginator="true"
      :rows="productStore.perPage"
      :totalRecords="productStore.totalRecords"
      :rowsPerPageOptions="[5, 10, 25, 50]"
      :first="(productStore.page - 1) * productStore.perPage"
      sortMode="single"
      :sortField="productStore.sortField"
      :sortOrder="productStore.sortDirection === 'asc' ? 1 : -1"
      @page="onPage"
      @sort="onSort"
    >
      <Column field="id" header="ID" sortable style="width: 70px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="2rem" />
          <span v-else class="animate-fade-in-up">{{ data.id }}</span>
        </template>
      </Column>

      <Column header="Image" style="width: 100px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="3rem" height="3rem" borderRadius="8px" />
          <img
            v-else
            :src="data.image_url"
            :alt="data.name"
            class="h-12 w-12 rounded-lg object-cover animate-fade-in-up"
          />
        </template>
      </Column>

      <Column field="name" header="Name" sortable style="width: 200px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="10rem" />
          <span v-else class="font-medium text-gray-900 dark:text-white animate-fade-in-up">{{ data.name }}</span>
        </template>
      </Column>

      <Column field="price" header="Price" sortable style="width: 120px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="4rem" />
          <span v-else class="animate-fade-in-up">${{ Number(data.price).toFixed(2) }}</span>
        </template>
      </Column>

      <Column field="quantity" header="Status" sortable style="width: 150px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="5rem" height="1.5rem" borderRadius="9999px" />
          <span
            v-else
            :class="[
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium animate-fade-in-up',
              stockStatus(data.quantity).class,
            ]"
          >
            {{ stockStatus(data.quantity).label }}
          </span>
        </template>
      </Column>

      <Column field="updated_at" header="Last Updated" sortable style="width: 160px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="6rem" />
          <span v-else class="text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up">
            {{ formatDate(data.updated_at) }}
          </span>
        </template>
      </Column>

      <Column header="Actions" style="width: 120px">
        <template #body="{ data }">
          <div v-if="productStore.loading" class="flex items-center gap-2">
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="4px" />
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="4px" />
          </div>
          <div v-else class="flex items-center gap-2 animate-fade-in-up">
            <button
              class="rounded-md p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              title="Edit"
              @click="emit('edit', data)"
            >
              <PencilSquareIcon class="h-5 w-5" />
            </button>
            <button
              class="rounded-md p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              title="Delete"
              @click="handleDelete(data.id)"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useProductStore } from '@/stores/products'

const emit = defineEmits(['edit'])
const productStore = useProductStore()
const searchQuery = ref(productStore.search)

// Placeholder rows for skeleton loading
const skeletonData = Array.from({ length: productStore.perPage }, (_, i) => ({ id: i }))
const tableData = computed(() =>
  productStore.loading ? skeletonData : productStore.products
)

// Debounce search — waits 300ms after typing stops before calling API
let searchTimeout = null
watch(searchQuery, (val) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.setSearch(val)
  }, 300)
})

// When user clicks a page number
function onPage(event) {
  productStore.setPerPage(event.rows)
  productStore.setPage(event.page + 1) // PrimeVue pages are 0-indexed, Laravel is 1-indexed
}

// When user clicks a column header to sort
function onSort(event) {
  productStore.setSort(event.sortField, event.sortOrder === 1 ? 'asc' : 'desc')
}

// Delete with confirmation
function handleDelete(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.removeProduct(id)
  }
}

function formatDate(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function stockStatus(quantity) {
  const qty = Number(quantity)
  if (qty <= 0) {
    return { label: 'Out of Stock', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
  }
  if (qty <= 10) {
    return { label: 'Low Stock', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
  }
  return { label: 'In Stock', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' }
}

// Fetch products when component loads
onMounted(() => {
  productStore.fetchProducts()
})
</script>
