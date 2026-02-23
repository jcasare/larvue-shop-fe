<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
      <button class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700" @click="openAddProductModal">
        Add Product
      </button>
    </div>
    <ProductsTable @edit="openEditProductModal" />
    <ProductModal v-model:visible="modalVisible" :product="selectedProduct" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductsTable from './ProductsTable.vue'
import ProductModal from './ProductModal.vue'

const modalVisible = ref(false)
const selectedProduct = ref(null)

function openAddProductModal() {
  selectedProduct.value = null
  modalVisible.value = true
}

function openEditProductModal(product) {
  selectedProduct.value = product
  modalVisible.value = true
}
</script>
