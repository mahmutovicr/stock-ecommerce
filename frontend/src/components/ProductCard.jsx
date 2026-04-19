import { useState } from "react"
import { LuPencil, LuTrash2 } from "react-icons/lu"
import { useProductStore } from "../store/product"
import { toaster } from "./ui/toaster"

const ProductCard = ({ product, isAdmin = false }) => {
  const [open, setOpen] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    description: product.description || "",
  })
  const { deleteProduct, updateProduct } = useProductStore()

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id)
    toaster.create({ title: success ? "Success" : "Error", description: message, type: success ? "success" : "error", duration: 3000 })
  }

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct)
    setOpen(false)
    toaster.create({ title: success ? "Success" : "Error", description: success ? "Product updated" : message, type: success ? "success" : "error", duration: 3000 })
  }

  return (
    <>
      <div
        style={{ background:"linear-gradient(160deg,#0D1828,#0A1220)", border:"1px solid rgba(255,255,255,0.055)", borderRadius:"10px", cursor:"pointer", transition:"border-color 0.3s,box-shadow 0.3s,transform 0.28s", display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 16px 20px", position:"relative", overflow:"hidden", textAlign:"center", fontFamily:"'DM Sans','Inter',sans-serif" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,160,255,0.22)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.7)"; e.currentTarget.style.transform = "translateY(-5px)" }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.055)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}>

        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", pointerEvents:"none" }} />

        <span style={{ fontSize:"14px", fontWeight:400, color:"#4A90C4", marginBottom:"10px", display:"inline-block", textAlign:"center", border:"1px solid rgba(0,100,180,0.3)", borderRadius:"3px", padding:"3px 10px", background:"transparent" }}>
          {product.category}
        </span>

        <span style={{ fontSize:"14px", fontWeight:700, color:"#D0E4F8", textAlign:"center", marginBottom:"7px", lineHeight:1.4, width:"100%", display:"block", wordBreak:"break-word" }}>
          {product.name}
        </span>

        <span style={{ fontSize:"14px", color:"#274060", textAlign:"center", lineHeight:1.6, width:"100%", marginBottom:"16px", flex:1, display:"block" }}>
          {product.description}
        </span>

        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:"3px", marginBottom:"14px", width:"100%" }}>
          <span style={{ fontSize:"13px", fontWeight:500, color:"#0D4F8C" }}>$</span>
          <span style={{ fontSize:"22px", fontWeight:700, color:"#0D6EBF", letterSpacing:"-0.8px" }}>{product.price}</span>
        </div>

        <button
          style={{ background:"rgba(0,80,160,0.18)", color:"#1A7ACC", border:"1px solid rgba(0,100,200,0.4)", padding:"11px 0", fontSize:"14px", fontWeight:700, letterSpacing:"0.5px", borderRadius:"4px", width:"100%", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#8B1A1A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#8B1A1A" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,80,160,0.18)"; e.currentTarget.style.color = "#1A7ACC"; e.currentTarget.style.borderColor = "rgba(0,100,200,0.4)" }}>
          Buy Now
        </button>

        {isAdmin && (
          <div style={{ display:"flex", gap:"8px", marginTop:"10px", width:"100%" }}>
            <button onClick={() => setOpen(true)}
              style={{ flex:1, background:"transparent", border:"1px solid rgba(0,170,255,0.2)", borderRadius:"4px", padding:"7px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,170,255,0.1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}>
              <LuPencil size={13} color="#00AAFF" />
            </button>
            <button onClick={handleDelete}
              style={{ flex:1, background:"transparent", border:"1px solid rgba(255,32,32,0.2)", borderRadius:"4px", padding:"7px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,32,32,0.1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}>
              <LuTrash2 size={13} color="#FF2020" />
            </button>
          </div>
        )}
      </div>

      {open && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }} onClick={() => setOpen(false)}>
          <div style={{ background:"#0D1828", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"10px", padding:"32px", width:"100%", maxWidth:"420px", fontFamily:"'DM Sans','Inter',sans-serif" }} onClick={(e) => e.stopPropagation()}>
            <p style={{ fontSize:"14px", fontWeight:700, color:"#D0E4F8", marginBottom:"24px" }}>Update Product</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {[{ label:"Product Name", key:"name" }, { label:"Price ($)", key:"price", type:"number" }, { label:"Category", key:"category" }, { label:"Description", key:"description" }].map(({ label, key, type }) => (
                <div key={key}>
                  <p style={{ fontSize:"9px", color:"#3A6080", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"7px" }}>{label}</p>
                  <input type={type || "text"} value={updatedProduct[key]} onChange={(e) => setUpdatedProduct({ ...updatedProduct, [key]: e.target.value })}
                    style={{ width:"100%", background:"transparent", border:"1px solid rgba(0,100,180,0.3)", borderRadius:"4px", padding:"8px 12px", color:"#C8D8F0", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ display:"flex", gap:"12px", marginTop:"8px" }}>
                <button onClick={handleUpdate}
                  style={{ flex:1, background:"rgba(0,170,255,0.1)", color:"#00AAFF", border:"1px solid rgba(0,170,255,0.3)", borderRadius:"4px", padding:"10px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#00AAFF"; e.currentTarget.style.color = "#080E1A" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,170,255,0.1)"; e.currentTarget.style.color = "#00AAFF" }}>
                  Update
                </button>
                <button onClick={() => setOpen(false)}
                  style={{ flex:1, background:"transparent", color:"#3A6080", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"4px", padding:"10px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard