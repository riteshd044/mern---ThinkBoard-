import { create } from "zustand";
import api from "../lib/axios";

const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log("Error checking auth:", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (payload) => {
    const res = await api.post("/auth/signup", payload);
    set({ authUser: res.data });
    return res.data;
  },

  login: async (payload) => {
    const res = await api.post("/auth/login", payload);
    set({ authUser: res.data });
    return res.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ authUser: null });
  },
}));

export default useAuthStore;
