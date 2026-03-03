import axios from "@/shared/helpers/axios";

export function getDiscounts(productId) {
  return axios.get(`/admin/products/${productId}/discounts`);
}

export function createDiscount(productId, data) {
  return axios.post(`/admin/products/${productId}/discounts`, data);
}

export function updateDiscount(productId, discountId, data) {
  return axios.put(`/admin/products/${productId}/discounts/${discountId}`, data);
}

export function deleteDiscount(productId, discountId) {
  return axios.delete(`/admin/products/${productId}/discounts/${discountId}`);
}
