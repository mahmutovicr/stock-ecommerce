const StockLogo = ({ size = 20, gradientId = "stock-grad" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00AAFF" />
        <stop offset="100%" stopColor="#FF2020" />
      </linearGradient>
    </defs>
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={`url(#${gradientId})`} />
    <path d="M2 17l10 5 10-5" stroke={`url(#${gradientId})`} />
    <path d="M2 12l10 5 10-5" stroke={`url(#${gradientId})`} />
  </svg>
)

export default StockLogo