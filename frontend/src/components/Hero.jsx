import { useNavigate } from "react-router-dom"

const MARQUEE_ITEMS = [
  { name: "Samsung S26 Ultra", category: "Smartphone" },
  { name: "iPhone 17 Pro Max", category: "Smartphone" },
  { name: "HP OmniBook 5 14", category: "Laptop" },
  { name: "Samsung S90F OLED", category: "TV" },
  { name: "HP Z8 Fury G5", category: "Desktop" },
  { name: "Nintendo Switch 2", category: "Gaming" },
  { name: "Apple Mac Studio M3", category: "Desktop" },
  { name: "Sony WH-1000XM5", category: "Accessory" },
]

const Hero = () => {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        @keyframes namarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mq-track { display:flex; white-space:nowrap; animation:namarquee 22s linear infinite; }
        .mq-set { display:inline-flex; align-items:center; flex-shrink:0; }
        .mq-item { display:inline-flex; align-items:center; gap:10px; padding:0 28px; }
        .mq-name { font-size:13px; font-weight:600; letter-spacing:1.5px; color:#E0ECFF; text-transform:uppercase; font-family:'DM Sans','Inter',sans-serif; }
        .mq-cat { font-size:8px; font-weight:600; letter-spacing:1.5px; color:#6B84A8; text-transform:uppercase; font-family:'DM Sans','Inter',sans-serif; }
        .mq-sep { color:#1E3050; font-size:14px; }
        .mq-fade-l { position:absolute; top:0; left:0; height:100%; width:60px; background:linear-gradient(90deg,rgba(4,8,15,0.9),transparent); z-index:2; pointer-events:none; }
        .mq-fade-r { position:absolute; top:0; right:0; height:100%; width:60px; background:linear-gradient(90deg,transparent,rgba(4,8,15,0.9)); z-index:2; pointer-events:none; }
        .hero-wrap {
          position: relative;
          height: 270px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 18px;
        }
        .hero-title {
          position: relative;
          z-index: 4;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 5px;
          color: #FF2020;
          text-transform: uppercase;
          text-align: center;
          width: 100%;
          font-family: 'DM Sans','Inter',sans-serif;
        }
        .hero-learn {
          position: relative;
          z-index: 4;
          background: transparent;
          color: #C8D8F0;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 10px 44px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          font-family: 'DM Sans','Inter',sans-serif;
          transition: border-color 0.2s, color 0.2s;
        }
        .hero-learn:hover { border-color: rgba(0,170,255,0.5); color: #00AAFF; }
        @media (max-width: 768px) {
          .hero-wrap { height: 220px; gap: 14px; }
          .hero-title { font-size: 14px; letter-spacing: 4px; }
          .hero-learn { padding: 9px 32px; font-size: 14px; }
          .mq-name { font-size: 11px; }
          .mq-item { padding: 0 18px; }
        }
        @media (max-width: 480px) {
          .hero-wrap { height: 190px; gap: 12px; }
          .hero-title { font-size: 12px; letter-spacing: 3px; }
          .hero-learn { padding: 8px 24px; font-size: 13px; }
          .mq-name { font-size: 10px; }
          .mq-item { padding: 0 14px; }
        }
      `}</style>

      <div className="hero-wrap">
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 15% 60%,rgba(160,30,30,0.5) 0%,transparent 44%),radial-gradient(ellipse at 85% 40%,rgba(0,90,180,0.45) 0%,transparent 44%),linear-gradient(135deg,#04080F 0%,#080C18 40%,#06090F 65%,#030508 100%)" }} />

        <div className="hero-title">New Arrivals</div>

        <div style={{ position:"relative", zIndex:4, width:"100%", overflow:"hidden" }}>
          <div className="mq-fade-l" />
          <div className="mq-fade-r" />
          <div className="mq-track">
            <div className="mq-set">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={i} className="mq-item">
                  <span className="mq-name">{item.name}</span>
                  <span className="mq-cat">{item.category}</span>
                  <span className="mq-sep">·</span>
                </div>
              ))}
            </div>
            <div className="mq-set">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={`b${i}`} className="mq-item">
                  <span className="mq-name">{item.name}</span>
                  <span className="mq-cat">{item.category}</span>
                  <span className="mq-sep">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="hero-learn" onClick={() => navigate("/new-arrivals")}>
          Learn More
        </button>
      </div>
    </>
  )
}

export default Hero
