<template>
  <div class="rounded-2xl border border-border bg-surface overflow-hidden dark:border-white/[0.06] dark:bg-white/[0.02]">
    <!-- Toolbar -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 border-b border-border dark:border-white/[0.06]">
      <p class="text-sm text-ink-muted dark:text-white/50">
        <span class="font-semibold text-ink dark:text-white/70">{{ productStore.totalRecords }}</span> products
      </p>
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted dark:text-white/50" />
        <input
          v-model="searchQuery"
          placeholder="Search products..."
          class="h-9 w-full sm:w-64 rounded-lg border border-border bg-paper pl-9 pr-4 text-[13px] text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white/80 dark:placeholder:text-white/35 dark:focus:border-white/10 dark:focus:ring-white/10"
        />
      </div>
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
      :pt="{
        root: { class: 'admin-table' },
      }"
    >
      <Column field="id" header="ID" sortable style="width: 70px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="2rem" />
          <span v-else class="text-[13px] text-ink-muted font-mono dark:text-white/50">{{ data.id }}</span>
        </template>
      </Column>

      <Column header="Image" style="width: 70px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="2.5rem" height="2.5rem" borderRadius="10px" />
          <img
            v-else
            :src="data.image_url"
            :alt="data.name"
            class="h-10 w-10 rounded-[10px] object-cover"
          />
        </template>
      </Column>

      <Column field="name" header="Name" sortable style="min-width: 180px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="10rem" />
          <span v-else class="text-[13px] font-medium text-ink dark:text-white/80">{{ data.name }}</span>
        </template>
      </Column>

      <Column field="price" header="Price" sortable style="width: 100px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="4rem" />
          <span v-else class="text-[13px] font-semibold text-ink font-display dark:text-white/80">${{ Number(data.price).toFixed(2) }}</span>
        </template>
      </Column>

      <Column field="quantity" header="Status" sortable style="width: 120px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="5rem" height="1.5rem" borderRadius="9999px" />
          <span
            v-else
            :class="[
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold',
              stockStatus(data.quantity).class,
            ]"
          >
            <span :class="['h-1.5 w-1.5 rounded-full', stockStatus(data.quantity).dot]"></span>
            {{ stockStatus(data.quantity).label }}
          </span>
        </template>
      </Column>

      <Column field="updated_at" header="Updated" sortable style="width: 140px">
        <template #body="{ data }">
          <Skeleton v-if="productStore.loading" width="6rem" />
          <span v-else class="text-[12px] text-ink-muted dark:text-white/40">
            {{ formatDate(data.updated_at) }}
          </span>
        </template>
      </Column>

      <Column header="" style="width: 110px">
        <template #body="{ data }">
          <div v-if="productStore.loading" class="flex items-center gap-1">
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="6px" />
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="6px" />
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="6px" />
          </div>
          <div v-else class="flex items-center gap-1">
            <button
              class="rounded-lg p-1.5 text-ink-muted hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/60"
              title="Edit"
              @click="emit('edit', data)"
            >
              <PencilSquareIcon class="h-4 w-4" />
            </button>
            <button
              class="rounded-lg p-1.5 text-ink-muted hover:bg-amber/10 hover:text-amber transition-colors dark:text-white/40 dark:hover:bg-amber/10 dark:hover:text-amber"
              title="Discounts"
              @click="emit('discount', data)"
            >
              <TagIcon class="h-4 w-4" />
            </button>
            <button
              class="rounded-lg p-1.5 text-ink-muted hover:bg-coral/10 hover:text-coral transition-colors dark:text-white/40 dark:hover:bg-coral/10 dark:hover:text-coral"
              title="Delete"
              @click="handleDelete(data.id)"
            >
              <TrashIcon class="h-4 w-4" />
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
import { PencilSquareIcon, TrashIcon, TagIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useProductStore } from '@/modules/admin/stores/products'

const emit = defineEmits(['edit', 'discount'])
const productStore = useProductStore()
const searchQuery = ref(productStore.search)

const skeletonData = Array.from({ length: productStore.perPage }, (_, i) => ({ id: i }))
const tableData = computed(() =>
  productStore.loading ? skeletonData : productStore.products
)

let searchTimeout = null
watch(searchQuery, (val) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.setSearch(val)
  }, 300)
})

function onPage(event) {
  productStore.setPerPage(event.rows)
  productStore.setPage(event.page + 1)
}

function onSort(event) {
  productStore.setSort(event.sortField, event.sortOrder === 1 ? 'asc' : 'desc')
}

function handleDelete(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.removeProduct(id)
  }
}

function formatDate(dateString) {
  if (!dateString) return '\u2014'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function stockStatus(quantity) {
  const qty = Number(quantity)
  if (qty <= 0) {
    return { label: 'Out of Stock', class: 'bg-coral/10 text-coral', dot: 'bg-coral' }
  }
  if (qty <= 10) {
    return { label: 'Low Stock', class: 'bg-amber/10 text-amber', dot: 'bg-amber' }
  }
  return { label: 'In Stock', class: 'bg-forest/10 text-forest dark:text-emerald-400', dot: 'bg-forest dark:bg-emerald-400' }
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>
