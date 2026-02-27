import axios from "@/shared/helpers/axios";

export function getProducts({
  search = "",
  page = 1,
  perPage = 12,
  category = "",
  minPrice = null,
  maxPrice = null,
  sort = "newest",
} = {}) {
  return axios.get("/shop/products", {
    params: {
      search,
      page,
      per_page: perPage,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      sort,
    },
  });
}

export function getProduct(id) {
  return axios.get(`/shop/products/${id}`);
}

export function getCategories() {
  return axios.get("/shop/categories");
}

export function getFeaturedProducts() {
  return axios.get("/shop/products/featured");
}
