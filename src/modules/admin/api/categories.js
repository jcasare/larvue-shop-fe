import axios from "@/shared/helpers/axios";

export function getCategories(params = {}) {
  return axios.get("/admin/categories", { params });
}

export function getCategory(id) {
  return axios.get(`/admin/categories/${id}`);
}

export function createCategory(data) {
  return axios.post("/admin/categories", data);
}

export function updateCategory(id, data) {
  return axios.put(`/admin/categories/${id}`, data);
}

export function deleteCategory(id) {
  return axios.delete(`/admin/categories/${id}`);
}
