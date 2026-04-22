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
    featured: product.featured || false,
    newArrival: product.newArrival || false,
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
      <style>{`
        .pcard {
          background: linear-gradient(160deg,#0D1828,#0A1220);
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.28s;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px 20px;
          position: relative;
          overflow: hidden;
          text-align: center;
          font-family: 'DM Sans','Inter',sans-serif;
        }
        .pcard:hover {
          border-color: rgba(0,160,255,0.22);
          box-shadow: 0 16px 48px rgba(0,0,0,0.7);
          transform: translateY(-5px);
        }
        @media (hover: none) {
          .pcard:hover {
            border-color: rgba(255,255,255,0.055);
            box-shadow: none;
            transform: none;
          }
        }
        .pcard-cat { font-size: 14px; font-weight: 400; color: #4A90C4; margin-bottom: 10px; display: inline-block; border: 1px solid rgba(0,100,180,0.3); border-radius: 3px; padding: 3px 10px; }
        .pcard-name { font-size: 14px; font-weight: 700; color: #D0E4F8; margin-bottom: 7px; line-height: 1.4; width: 100%; display: block; word-break: break-word; }
        .pcard-desc { font-size: 14px; color: #274060; line-height: 1.6; width: 100%; margin-bottom: 16px; flex: 1; display: block; }
        .pcard-price-sym { font-size: 13px; font-weight: 500; color: #0D4F8C; }
        .pcard-price { font-size: 22px; font-weight: 700; color: #0D6EBF; letter-spacing: -0.8px; }
        .pcard-buy {
          background: rgba(0,80,160,0.18);
          color: #1A7ACC;
          border: 1px solid rgba(0,100,200,0.4);
          padding: 11px 0;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-radius: 4px;
          width: 100%;
          cursor: pointer;
          font-family: 'DM Sans',sans-serif;
          transition: all 0.2s;
        }
        .pcard-buy:hover { background: #8B1A1A; color: #fff; border-color: #8B1A1A; }
        @media (max-width: 600px) {
          .pcard { padding: 16px 12px 14px; }
          .pcard-cat { font-size: 12px; padding: 2px 8px; margin-bottom: 8px; }
          .pcard-name { font-size: 13px; margin-bottom: 5px; }
          .pcard-desc { font-size: 12px; margin-bottom: 12px; }
          .pcard-price { font-size: 18px; }
          .pcard-buy { font-size: 13px; padding: 9px 0; }
        }
        @media (max-width: 360px) {
          .pcard { padding: 14px 10px 12px; }
          .pcard-name { font-size: 12px; }
          .pcard-desc { font-size: 11px; }
        }
      `}</style>

      <div className="pcard">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", pointerEvents:"none" }} />

        <span className="pcard-cat">{product.category}</span>
        <span className="pcard-name">{product.name}</span>
        <span className="pcard-desc">{product.description}</span>

        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:"3px", marginBottom:"14px", width:"100%" }}>
          <span className="pcard-price-sym">$</span>
          <span className="pcard-price">{product.price}</span>
        </div>

        <button className="pcard-buy">Buy Now</button>

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
              <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
                <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                  <input type="checkbox" checked={updatedProduct.featured} onChange={(e) => setUpdatedProduct({ ...updatedProduct, featured: e.target.checked })} />
                  <span style={{ fontSize:"12px", color:"#6B84A8" }}>Featured (Top Picks)</span>
                </label>
                <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                  <input type="checkbox" checked={updatedProduct.newArrival} onChange={(e) => setUpdatedProduct({ ...updatedProduct, newArrival: e.target.checked })} />
                  <span style={{ fontSize:"12px", color:"#6B84A8" }}>New Arrival</span>
                </label>
              </div>
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