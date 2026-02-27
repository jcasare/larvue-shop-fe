import axios from "@/shared/helpers/axios";

export function getCart() {
  return axios.get("/shop/cart");
}

export function addCartItem(productId, quantity = 1) {
  return axios.post("/shop/cart", { product_id: productId, quantity });
}

export function updateCartItem(itemId, quantity) {
  return axios.patch(`/shop/cart/${itemId}`, { quantity });
}

export function removeCartItem(itemId) {
  return axios.delete(`/shop/cart/${itemId}`);
}

export function syncCart(items) {
  return axios.post("/shop/cart/sync", { items });
}

export function clearCartApi() {
  return axios.delete("/shop/cart");
}
