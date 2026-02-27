import { defineStore } from "pinia";
import {
  getProducts,
  getProduct,
  getCategories,
  getFeaturedProducts,
} from "@/modules/shop/api/products";
import mockData from "@/modules/shop/data/mock.json";

// Client-side filtering/sorting/pagination for mock data
function queryMockProducts({ search, category, minPrice, maxPrice, sort, page, perPage }) {
  let results = [...mockData.products];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (minPrice != null) {
    results = results.filter((p) => parseFloat(p.price) >= minPrice);
  }
  if (maxPrice != null) {
    results = results.filter((p) => parseFloat(p.price) <= maxPrice);
  }

  switch (sort) {
    case "price_asc":
      results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price_desc":
      results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
      results.sort((a, b) => b.reviews_count - a.reviews_count);
      break;
    case "newest":
    default:
      results.sort((a, b) => b.id - a.id);
      break;
  }

  const total = results.length;
  const start = (page - 1) * perPage;
  const paginated = results.slice(start, start + perPage);

  return {
    data: paginated,
    meta: {
      total,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(total / perPage) || 1,
    },
  };
}

function getMockFallback(params) {
  return queryMockProducts(params);
}

export const useProductStore = defineStore("shopProducts", {
  state: () => ({
    products: [],
    featuredProducts: [],
    categories: [],
    currentProduct: null,
    loading: false,
    featuredLoading: false,
    categoriesLoading: false,
    totalRecords: 0,
    totalPages: 0,
    page: 1,
    perPage: 12,
    search: "",
    category: "",
    minPrice: null,
    maxPrice: null,
    sort: "newest",
  }),

  actions: {
    _useMockProducts() {
      const mock = getMockFallback({
        search: this.search,
        category: this.category,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        sort: this.sort,
        page: this.page,
        perPage: this.perPage,
      });
      this.products = mock.data;
      this.totalRecords = mock.meta.total;
      this.totalPages = mock.meta.last_page;
    },

    async fetchProducts() {
      this.loading = true;
      try {
        const response = await getProducts({
          search: this.search,
          page: this.page,
          perPage: this.perPage,
          category: this.category,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          sort: this.sort,
        });
        const data = response.data.data;
        if (data && data.length > 0) {
          this.products = data;
          this.totalRecords = response.data.meta?.total ?? data.length;
          this.totalPages = response.data.meta?.last_page ?? 1;
        } else {
          // API returned empty — use mock data
          this._useMockProducts();
        }
      } catch {
        this._useMockProducts();
      } finally {
        this.loading = false;
      }
    },

    async fetchProduct(id) {
      this.loading = true;
      try {
        const response = await getProduct(id);
        const data = response.data.data ?? response.data;
        this.currentProduct = data && Object.keys(data).length > 0 ? data : null;
      } catch {
        this.currentProduct = null;
      }
      // Fallback to mock if not found from API
      if (!this.currentProduct) {
        this.currentProduct =
          mockData.products.find((p) => p.id === Number(id)) || null;
      }
      this.loading = false;
      return this.currentProduct;
    },

    async fetchFeatured() {
      this.featuredLoading = true;
      try {
        const response = await getFeaturedProducts();
        const data = response.data.data ?? response.data;
        if (Array.isArray(data) && data.length > 0) {
          this.featuredProducts = data;
        } else {
          this.featuredProducts = mockData.products.filter((p) => p.featured);
        }
      } catch {
        this.featuredProducts = mockData.products.filter((p) => p.featured);
      } finally {
        this.featuredLoading = false;
      }
    },

    async fetchCategories() {
      this.categoriesLoading = true;
      try {
        const response = await getCategories();
        const data = response.data.data ?? response.data;
        if (Array.isArray(data) && data.length > 0) {
          this.categories = data;
        } else {
          this.categories = mockData.categories;
        }
      } catch {
        this.categories = mockData.categories;
      } finally {
        this.categoriesLoading = false;
      }
    },

    setPage(page) {
      this.page = page;
      this.fetchProducts();
    },

    setSort(sort) {
      this.sort = sort;
      this.page = 1;
      this.fetchProducts();
    },

    setCategory(category) {
      this.category = category;
      this.page = 1;
      this.fetchProducts();
    },

    setSearch(value) {
      this.search = value;
      this.page = 1;
      this.fetchProducts();
    },

    setPriceRange(min, max) {
      this.minPrice = min;
      this.maxPrice = max;
      this.page = 1;
      this.fetchProducts();
    },

    resetFilters() {
      this.search = "";
      this.category = "";
      this.minPrice = null;
      this.maxPrice = null;
      this.sort = "newest";
      this.page = 1;
      this.fetchProducts();
    },
  },
});
