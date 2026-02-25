import { defineStore } from "pinia";
import { getProducts, deleteProduct } from "@/modules/admin/api/products";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    loading: false,
    totalRecords: 0,
    search: "",
    page: 1,
    perPage: 10,
    sortField: "updated_at",
    sortDirection: "desc",
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await getProducts({
          search: this.search,
          page: this.page,
          perPage: this.perPage,
          sortField: this.sortField,
          sortDirection: this.sortDirection,
        });
        this.products = response.data.data;
        this.totalRecords = response.data.meta.total;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.products = [];
        this.totalRecords = 0;
      } finally {
        this.loading = false;
      }
    },

    async removeProduct(id) {
      await deleteProduct(id);
      await this.fetchProducts();
    },

    setPage(page) {
      this.page = page;
      this.fetchProducts();
    },

    setSort(field, direction) {
      this.sortField = field;
      this.sortDirection = direction;
      this.page = 1;
      this.fetchProducts();
    },

    setSearch(value) {
      this.search = value;
      this.page = 1;
      this.fetchProducts();
    },

    setPerPage(value) {
      this.perPage = value;
      this.page = 1;
      this.fetchProducts();
    },
  },
});
