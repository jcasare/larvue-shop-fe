<template>
  <div>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 animate-fade-in-up">
      <div>
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/40">Catalog</span>
        <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Products</h1>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
        @click="openAddProductModal"
      >
        <PlusIcon class="h-4 w-4" />
        Add Product
      </button>
    </div>
    <ProductsTable @edit="openEditProductModal" @discount="openDiscountModal" />
    <ProductModal v-model:visible="modalVisible" :product="selectedProduct" />
    <DiscountModal v-model:visible="discountModalVisible" :product="discountProduct" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import ProductsTable from './ProductsTable.vue'
import ProductModal from './ProductModal.vue'
import DiscountModal from './DiscountModal.vue'

const modalVisible = ref(false)
const selectedProduct = ref(null)
const discountModalVisible = ref(false)
const discountProduct = ref(null)

function openAddProductModal() {
  selectedProduct.value = null
  modalVisible.value = true
}

function openEditProductModal(product) {
  selectedProduct.value = product
  modalVisible.value = true
}

function openDiscountModal(product) {
  discountProduct.value = product
  discountModalVisible.value = true
}
</script>
