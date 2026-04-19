import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProductStore } from "../store/product"
import { toaster } from "../components/ui/toaster"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const CATEGORIES = ["Smartphones", "Laptops", "Gaming", "TVs", "Desktops", "Accessories"]

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ name:"", price:"", category:"", description:"", featured:false, newArrival:false })
  const { createProduct } = useProductStore()
  const navigate = useNavigate()

  const handleAdd = async () => {
    const { success, message } = await createProduct(newProduct)
    toaster.create({ title: success ? "Success" : "Error", description: message, type: success ? "success" : "error", duration: 3000 })
    if (success) navigate("/")
  }

  const inputStyle = {
    width:"100%", background:"transparent", border:"1px solid rgba(0,100,180,0.3)", borderRadius:"4px",
    padding:"9px 12px", color:"#C8D8F0", fontSize:"13px", outline:"none",
    fontFamily:"'DM Sans','Inter',sans-serif", boxSizing:"border-box",
  }

  const labelStyle = { fontSize:"9px", color:"#3A6080", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"7px", display:"block", fontFamily:"'DM Sans','Inter',sans-serif" }

  return (
    <div style={{ minHeight:"100vh", background:"#0D1321", display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Inter',sans-serif" }}>
      <Navbar />
      <div style={{ flex:1, display:"flex", justifyContent:"center", padding:"60px 20px" }}>
        <div style={{ width:"100%", maxWidth:"480px" }}>
          <h1 style={{ fontSize:"16px", fontWeight:700, letterSpacing:"3px", color:"#F0F4FF", textAlign:"center", textTransform:"uppercase", marginBottom:"40px" }}>
            New Product
          </h1>
          <div style={{ background:"linear-gradient(160deg,#0D1828,#0A1220)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"32px" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>

              <div>
                <span style={labelStyle}>Product Name</span>
                <input style={inputStyle} placeholder="Product name..." value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              </div>

              <div>
                <span style={labelStyle}>Price ($)</span>
                <input style={inputStyle} type="number" placeholder="Price..." value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              </div>

              <div>
                <span style={labelStyle}>Category</span>
                <select
                  style={{ ...inputStyle, color: newProduct.category ? "#C8D8F0" : "#2A4A6A", cursor:"pointer" }}
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                  <option value="" style={{ background:"#0D1828" }}>Select category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} style={{ background:"#0D1828" }}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <span style={labelStyle}>Description</span>
                <input style={inputStyle} placeholder="Description..." value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
              </div>

              <div style={{ display:"flex", gap:"16px" }}>
                <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                  <input type="checkbox" checked={newProduct.featured} onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })} />
                  <span style={{ fontSize:"12px", color:"#6B84A8" }}>Featured (Top Picks)</span>
                </label>
                <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                  <input type="checkbox" checked={newProduct.newArrival} onChange={(e) => setNewProduct({ ...newProduct, newArrival: e.target.checked })} />
                  <span style={{ fontSize:"12px", color:"#6B84A8" }}>New Arrival</span>
                </label>
              </div>

              <div style={{ display:"flex", gap:"12px", marginTop:"8px" }}>
                <button onClick={handleAdd}
                  style={{ flex:1, background:"rgba(0,170,255,0.09)", color:"#00AAFF", border:"1px solid rgba(0,170,255,0.25)", borderRadius:"4px", padding:"11px", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#00AAFF"; e.currentTarget.style.color = "#080E1A" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,170,255,0.09)"; e.currentTarget.style.color = "#00AAFF" }}>
                  Add Product
                </button>
                <button onClick={() => navigate("/")}
                  style={{ flex:1, background:"transparent", color:"#6B84A8", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"4px", padding:"11px", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreatePage