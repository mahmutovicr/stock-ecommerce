import { create } from "zustand"

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  activeCategory: null,
  topPicks: [],
  searchQuery: "",
  isAdmin: false,

  checkAdmin: () => {
    const stored = localStorage.getItem("stock-admin")
    if (stored === ADMIN_PASSWORD) set({ isAdmin: true })
  },

  loginAdmin: (password) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("stock-admin", password)
      set({ isAdmin: true })
      return true
    }
    return false
  },

  logoutAdmin: () => {
    localStorage.removeItem("stock-admin")
    set({ isAdmin: false })
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      const all = data.data || []
      const cats = [...new Set(all.map((p) => p.category))]
      const picks = all.filter((p) => p.featured)
      set({ products: all, filteredProducts: all, categories: cats, topPicks: picks })
    } catch (error) {
      console.error("fetchProducts error:", error)
    }
  },

  resetToHome: () => {
    const { products } = get()
    set({
      activeCategory: null,
      topPicks: products.filter((p) => p.featured),
      searchQuery: "",
      filteredProducts: products,
    })
  },

  setCategory: (cat) => {
    const { products, activeCategory } = get()
    if (activeCategory === cat) {
      set({ activeCategory: null, filteredProducts: products })
      return
    }
    const filtered = products.filter((p) => p.category === cat)
    set({ activeCategory: cat, filteredProducts: filtered })
  },

  setSearch: (query) => {
    const { products, activeCategory } = get()
    const filtered = products.filter((p) => {
      const matchCat = !activeCategory || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchSearch
    })
    set({ searchQuery: query, filteredProducts: filtered })
  },

  createProduct: async (product) => {
    if (!product.name || !product.price || !product.category) {
      return { success: false, message: "Please fill all fields." }
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    const data = await res.json()
    set((state) => ({
      products: [...state.products, data.data],
      filteredProducts: [...state.filteredProducts, data.data],
    }))
    return { success: true, message: "Product created." }
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.map((p) => (p._id === pid ? data.data : p)),
      filteredProducts: state.filteredProducts.map((p) => (p._id === pid ? data.data : p)),
    }))
    return { success: true, message: "Product updated." }
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, { method: "DELETE" })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.filter((p) => p._id !== pid),
      filteredProducts: state.filteredProducts.filter((p) => p._id !== pid),
      topPicks: state.topPicks.filter((p) => p._id !== pid),
    }))
    return { success: true, message: "Product deleted." }
  },
}))