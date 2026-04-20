const Footer = () => (
  <div style={{ background:"#090D1A", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"28px 44px", fontFamily:"'DM Sans','Inter',sans-serif" }}>
    <style>{`
      .footer-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 16px;
      }
      .footer-links {
        display: flex;
        gap: 26px;
        flex-wrap: wrap;
      }
      @media (max-width: 600px) {
        .footer-top {
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-links {
          gap: 16px;
        }
      }
    `}</style>
    <div className="footer-top">
      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00AAFF"/><stop offset="100%" stopColor="#FF2020"/></linearGradient></defs>
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#fg)" />
          <path d="M2 17l10 5 10-5" stroke="url(#fg)" />
          <path d="M2 12l10 5 10-5" stroke="url(#fg)" />
        </svg>
        <span style={{ fontSize:"16px", fontWeight:700, letterSpacing:"5px", color:"#E8F0FF" }}>STOCK</span>
      </div>
      <div className="footer-links">
        {["Terms of Use", "Legal Notice", "Privacy Policy", "Contact"].map((link) => (
          <a key={link} href="#" style={{ color:"#2A3F60", fontSize:"14px", fontWeight:500, textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#6B84A8" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#2A3F60" }}>
            {link}
          </a>
        ))}
      </div>
    </div>
    <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:"16px", fontSize:"14px", color:"#2A3F60" }}>
      © 2026 STOCK — All rights reserved.
    </div>
  </div>
)

export default Footer