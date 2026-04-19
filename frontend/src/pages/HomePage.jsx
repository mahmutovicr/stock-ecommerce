import { useEffect } from "react"
import { useProductStore } from "../store/product"
import Navbar from "../components/Navbar"
import CategoryBar from "../components/CategoryBar"
import Hero from "../components/Hero"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"

const HomePage = () => {
  const { fetchProducts, topPicks, filteredProducts, activeCategory } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const showHero = activeCategory === null
  const showTopPicks = activeCategory === null

  return (
    <>
      <style>{`
        .home-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .home-grid-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .home-sec { padding: 38px 44px 48px; }
        @media (max-width: 1100px) {
          .home-grid-5 { grid-template-columns: repeat(4, 1fr); }
          .home-grid-4 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .home-grid-5 { grid-template-columns: repeat(3, 1fr); }
          .home-grid-4 { grid-template-columns: repeat(2, 1fr); }
          .home-sec { padding: 24px 20px 36px; }
        }
        @media (max-width: 600px) {
          .home-grid-5 { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .home-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .home-sec { padding: 16px 12px 28px; }
        }
        @media (max-width: 360px) {
          .home-grid-5 { grid-template-columns: 1fr; }
          .home-grid-4 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#0D1321", display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Inter',sans-serif" }}>
        <Navbar />
        <CategoryBar />

        {showHero && <Hero />}

        <div className="home-sec" style={{ flex: 1 }}>
          {showTopPicks && (
            <>
              <div style={{ display:"flex", alignItems:"center", marginBottom:"26px", paddingBottom:"16px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize:"16px", fontWeight:600, color:"#C8D8F0" }}>Top Picks</span>
              </div>
              <div className="home-grid-4">
                {topPicks.map((product) => (
                  <ProductCard key={product._id} product={product} isAdmin={true} />
                ))}
              </div>
            </>
          )}

          {!showTopPicks && (
            <>
              <div style={{ display:"flex", alignItems:"center", marginBottom:"26px", paddingBottom:"16px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize:"16px", fontWeight:600, color:"#C8D8F0" }}>{activeCategory}</span>
                <span style={{ fontSize:"13px", color:"#6B84A8", marginLeft:"14px" }}>{filteredProducts.length} items</span>
              </div>
              <div className="home-grid-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} isAdmin={false} />
                ))}
                {filteredProducts.length === 0 && (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 0", color:"#6B84A8", fontSize:"14px" }}>
                    No products found
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}

export default HomePage