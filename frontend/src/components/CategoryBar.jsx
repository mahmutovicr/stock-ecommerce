import { useProductStore } from "../store/product"

const CategoryBar = () => {
  const { categories, activeCategory, setCategory } = useProductStore()

  return (
    <>
      <style>{`
        .catbar-wrap {
          background: #0B1020;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 44px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .cat-btn {
          font-size: 14px;
          font-weight: 500;
          color: #2A3F60;
          padding: 14px 20px;
          cursor: pointer;
          border: none;
          border-bottom: 2px solid transparent;
          background: none;
          font-family: 'DM Sans','Inter',sans-serif;
          white-space: nowrap;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .cat-btn:hover { color: #6B84A8; }
        .cat-btn.active { color: #E0ECFF; border-bottom: 2px solid #00AAFF; }
        @media (max-width: 768px) {
          .catbar-wrap { padding: 0 16px; }
          .cat-btn { font-size: 13px; padding: 12px 14px; }
        }
        @media (max-width: 480px) {
          .cat-btn { font-size: 12px; padding: 10px 10px; }
        }
      `}</style>

      <div className="catbar-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </>
  )
}

export default CategoryBar