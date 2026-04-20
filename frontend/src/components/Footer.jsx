const Footer = () => (
  <div style={{ background:"#090D1A", borderTop:"1px solid rgba(255,255,255,0.06)", fontFamily:"'DM Sans','Inter',sans-serif" }}>
    <style>{`
      .footer-inner {
        padding: 28px 44px;
      }
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
      .footer-copy {
        border-top: 1px solid rgba(255,255,255,0.05);
        padding-top: 16px;
        font-size: 13px;
        color: #2A3F60;
      }
      @media (max-width: 768px) {
        .footer-inner { padding: 24px 20px; }
        .footer-top { flex-direction: column; align-items: flex-start; gap: 14px; }
        .footer-links { gap: 16px; }
      }
      @media (max-width: 480px) {
        .footer-inner { padding: 20px 16px; }
        .footer-links { gap: 12px; }
        .footer-copy { font-size: 12px; }
      }
    `}</style>
    <div className="footer-inner">
      <div className="footer-top">
        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00AAFF"/><stop offset="100%" stopColor="#FF2020"/></linearGradient></defs>
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#fg)" />
            <path d="M2 17l10 5 10-5" stroke="url(#fg)" />
            <path d="M2 12l10 5 10-5" stroke="url(#fg)" />
          </svg>
          <span style={{ fontSize:"18px", fontWeight:700, letterSpacing:"6px", color:"#F0F4FF", fontFamily:"'DM Sans','Inter',sans-serif" }}>STOCK</span>
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
      <div className="footer-copy">
        © 2026 STOCK — All rights reserved.
      </div>
    </div>
  </div>
)

export default Footer
