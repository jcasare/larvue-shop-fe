import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
  getters: {
    getCount: (state) => state.count,
  },
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: true,
  }),
  actions: {
    setAuthenticated(value) {
      this.isAuthenticated = value;
    },
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
  },
});