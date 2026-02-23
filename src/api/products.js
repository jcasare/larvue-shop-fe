import axios from "@/helpers/axios";

export function getProducts({ search = '', page = 1, perPage = 10, sortField = 'updated_at', sortDirection = 'desc' } = {}) {
  return axios.get("/products", {
    params: {
      search,
      page,
      per_page: perPage,
      sort_field: sortField,
      sort_direction: sortDirection,
    },
  });
}

export function getProduct(id) {
  return axios.get(`/products/${id}`);
}

export function createProduct(data) {
  return axios.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateProduct(id, data) {
  return axios.post(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteProduct(id) {
  return axios.delete(`/products/${id}`);
}
