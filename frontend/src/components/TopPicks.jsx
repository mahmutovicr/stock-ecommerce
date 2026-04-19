import { useProductStore } from "../store/product"
import ProductCard from "./ProductCard"

const TopPicks = () => {
  const { topPicks, filteredProducts, activeCategory } = useProductStore()

  const isFiltered = activeCategory !== null
  const products = isFiltered ? filteredProducts : topPicks
  const title = isFiltered ? activeCategory : "Top Picks"

  return (
    <div style={{ padding: "36px 40px 50px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ fontSize: "18px", fontWeight: 400, color: "#C8D8F0", letterSpacing: "0.5px", fontFamily: "'DM Sans','Inter',sans-serif" }}>
          {title}
        </span>
        <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.18)", margin: "0 16px" }} />
        {!isFiltered && (
          <button style={{ background: "transparent", color: "#6B84A8", border: "1px solid rgba(107,132,168,0.25)", borderRadius: "3px", padding: "5px 14px", fontSize: "10px", fontWeight: 500, letterSpacing: "1px", cursor: "pointer", fontFamily: "'DM Sans','Inter',sans-serif" }}>
            See More
          </button>
        )}
        {isFiltered && (
          <span style={{ fontSize: "11px", color: "#6B84A8", letterSpacing: "1px", fontFamily: "'DM Sans','Inter',sans-serif" }}>
            {filteredProducts.length} items
          </span>
        )}
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <span style={{ fontSize: "13px", color: "#6B84A8", letterSpacing: "1px", fontFamily: "'DM Sans','Inter',sans-serif" }}>No products found</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default TopPicks