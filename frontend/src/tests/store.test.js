import { describe, it, expect, beforeEach, vi } from "vitest"
import { useProductStore } from "../store/product"

const mockProducts = [
  { _id: "1", name: "iPhone 15 Pro Max", category: "Smartphones", price: 1199, description: "A17 Pro", featured: true, newArrival: false },
  { _id: "2", name: "MacBook Pro M3", category: "Laptops", price: 2499, description: "M3 Max", featured: true, newArrival: false },
  { _id: "3", name: "PS5 Pro", category: "Gaming", price: 699, description: "8K Ready", featured: false, newArrival: true },
  { _id: "4", name: "Samsung S25 Ultra", category: "Smartphones", price: 1299, description: "200MP", featured: false, newArrival: true },
]

beforeEach(() => {
  useProductStore.setState({
    products: mockProducts,
    filteredProducts: mockProducts,
    categories: ["Smartphones", "Laptops", "Gaming"],
    activeCategory: null,
    topPicks: mockProducts.filter((p) => p.featured),
    searchQuery: "",
  })
})

describe("useProductStore — setCategory", () => {
  it("filters products by category", () => {
    useProductStore.getState().setCategory("Smartphones")
    const { filteredProducts, activeCategory } = useProductStore.getState()
    expect(activeCategory).toBe("Smartphones")
    expect(filteredProducts.every((p) => p.category === "Smartphones")).toBe(true)
    expect(filteredProducts.length).toBe(2)
  })

  it("deselects category on second click", () => {
    useProductStore.getState().setCategory("Smartphones")
    useProductStore.getState().setCategory("Smartphones")
    const { activeCategory, filteredProducts } = useProductStore.getState()
    expect(activeCategory).toBeNull()
    expect(filteredProducts.length).toBe(mockProducts.length)
  })
})

describe("useProductStore — setSearch", () => {
  it("filters products by search query", () => {
    useProductStore.getState().setSearch("iphone")
    const { filteredProducts } = useProductStore.getState()
    expect(filteredProducts.length).toBe(1)
    expect(filteredProducts[0].name).toBe("iPhone 15 Pro Max")
  })

  it("returns all products on empty search", () => {
    useProductStore.getState().setSearch("")
    const { filteredProducts } = useProductStore.getState()
    expect(filteredProducts.length).toBe(mockProducts.length)
  })
})

describe("useProductStore — resetToHome", () => {
  it("resets to featured products and clears category", () => {
    useProductStore.getState().setCategory("Gaming")
    useProductStore.getState().resetToHome()
    const { activeCategory, topPicks, searchQuery } = useProductStore.getState()
    expect(activeCategory).toBeNull()
    expect(searchQuery).toBe("")
    expect(topPicks.every((p) => p.featured)).toBe(true)
  })
})