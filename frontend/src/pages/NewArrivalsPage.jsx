import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"

const NewArrivalsPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts((data.data || []).filter((p) => p.newArrival)))
  }, [])

  return (
    <div style={{ minHeight:"100vh", background:"#0D1321", display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Inter',sans-serif" }}>
      <Navbar />
      <div style={{ padding:"38px 44px 48px", flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", marginBottom:"26px", paddingBottom:"16px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"5px", color:"#FF2020", textTransform:"uppercase" }}>
            New Arrivals
          </span>
          <div style={{ width:"1px", height:"14px", background:"rgba(255,255,255,0.15)", margin:"0 14px" }} />
          <span style={{ fontSize:"13px", color:"#6B84A8" }}>{products.length} items</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} isAdmin={false} />
          ))}
        </div>
        {products.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#6B84A8", fontSize:"14px" }}>
            No new arrivals
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default NewArrivalsPage