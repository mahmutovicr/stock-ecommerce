import { Box, Flex, Text } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LuSearch, LuShoppingCart, LuPlus } from "react-icons/lu"
import { useProductStore } from "../store/product"
import StockLogo from "./StockLogo"

const AdminModal = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    const success = onLogin(password)
    if (!success) setError(true)
    else onClose()
  }

  return (
    <div
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      <div
        style={{ background:"#0D1828", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"10px", padding:"32px", width:"320px", fontFamily:"'DM Sans','Inter',sans-serif" }}
        onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize:"14px", fontWeight:700, color:"#D0E4F8", marginBottom:"20px" }}>Admin Access</p>
        <input
          type="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
          style={{ width:"100%", background:"transparent", border:`1px solid ${error ? "#FF2020" : "rgba(0,100,180,0.3)"}`, borderRadius:"4px", padding:"9px 12px", color:"#C8D8F0", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}
        />
        {error && <p style={{ fontSize:"11px", color:"#FF2020", marginTop:"6px" }}>Incorrect password</p>}
        <div style={{ display:"flex", gap:"10px", marginTop:"16px" }}>
          <button
            onClick={handleSubmit}
            style={{ flex:1, background:"rgba(0,170,255,0.1)", color:"#00AAFF", border:"1px solid rgba(0,170,255,0.3)", borderRadius:"4px", padding:"9px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}>
            Login
          </button>
          <button
            onClick={onClose}
            style={{ flex:1, background:"transparent", color:"#3A6080", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"4px", padding:"9px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const { setSearch, products, resetToHome, isAdmin, checkAdmin, loginAdmin, logoutAdmin } = useProductStore()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const navigate = useNavigate()
  const ref = useRef(null)
  const clickTimer = useRef(null)

  useEffect(() => {
    checkAdmin()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogoClick = () => {
    resetToHome()
    setQuery("")
    navigate("/")

    const newCount = logoClicks + 1
    setLogoClicks(newCount)

    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => setLogoClicks(0), 2000)

    if (newCount >= 3) {
      setLogoClicks(0)
      if (isAdmin) logoutAdmin()
      else setShowAdminModal(true)
    }
  }

  const handleSearch = (e) => {
    const val = e.target.value
    setQuery(val)
    setSearch(val)
    if (val.trim().length > 1) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 6)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (product) => {
    setQuery(product.name)
    setSearch(product.name)
    setShowSuggestions(false)
  }

  return (
    <>
      <style>{`
        .nb-wrap { padding: 0 44px; }
        .nb-search { max-width: 440px; }
        @media (max-width: 768px) {
          .nb-wrap { padding: 0 16px; gap: 10px !important; }
          .nb-search { max-width: 200px; }
          .nb-logo-txt { font-size: 14px !important; letter-spacing: 3px !important; }
        }
        @media (max-width: 480px) {
          .nb-search { max-width: 140px; }
          .nb-logo-txt { font-size: 12px !important; letter-spacing: 2px !important; }
        }
      `}</style>

      {showAdminModal && (
        <AdminModal onClose={() => setShowAdminModal(false)} onLogin={loginAdmin} />
      )}

      <Box
        className="nb-wrap"
        bg="rgba(13,18,32,0.98)"
        borderBottom="1px solid rgba(255,255,255,0.07)"
        h="60px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="20px"
        position="sticky"
        top="0"
        zIndex="100">

        <Flex align="center" gap="9px" minW="fit-content" cursor="pointer" onClick={handleLogoClick} flexShrink="0">
          <StockLogo size={20} gradientId="nav-gradient" />
          <Text className="nb-logo-txt" fontSize="18px" fontWeight="700" letterSpacing="6px" color="#F0F4FF">STOCK</Text>
          {isAdmin && (
            <span style={{ fontSize:"9px", background:"rgba(0,170,255,0.15)", color:"#00AAFF", border:"1px solid rgba(0,170,255,0.3)", borderRadius:"3px", padding:"2px 6px", letterSpacing:"1px" }}>
              ADMIN
            </span>
          )}
        </Flex>

        <Box className="nb-search" flex="1" mx="auto" position="relative" ref={ref}>
          <Box position="relative">
            <input
              value={query}
              onChange={handleSearch}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="SEARCH PRODUCTS..."
              style={{ width:"100%", background:"transparent", border:"1px solid rgba(0,100,180,0.3)", borderRadius:"4px", padding:"8px 34px 8px 12px", color:"#4A7AAA", fontSize:"11px", outline:"none", letterSpacing:"0.8px", boxSizing:"border-box", fontFamily:"'DM Sans','Inter',sans-serif" }}
            />
            <Box position="absolute" right="10px" top="50%" transform="translateY(-50%)" color="#2A4A6A" fontSize="14px" display="flex" alignItems="center">
              <LuSearch />
            </Box>
          </Box>

          {showSuggestions && suggestions.length > 0 && (
            <Box
              position="absolute"
              top="calc(100% + 4px)"
              left="0"
              right="0"
              bg="#0D1828"
              border="1px solid rgba(0,100,180,0.3)"
              borderRadius="4px"
              zIndex="200"
              overflow="hidden"
              boxShadow="0 8px 32px rgba(0,0,0,0.5)">
              {suggestions.map((s) => (
                <Flex
                  key={s._id}
                  px="14px"
                  py="10px"
                  align="center"
                  justify="space-between"
                  cursor="pointer"
                  borderBottom="1px solid rgba(255,255,255,0.04)"
                  _hover={{ bg:"rgba(0,170,255,0.06)" }}
                  onClick={() => handleSuggestionClick(s)}>
                  <Text fontSize="12px" color="#C8D8F0">{s.name}</Text>
                  <Text fontSize="11px" color="#0D6EBF" fontWeight="600">${s.price}</Text>
                </Flex>
              ))}
            </Box>
          )}
        </Box>

        <Flex align="center" gap="8px" flexShrink="0">
          <Box
            as="button"
            bg="transparent"
            border="1px solid rgba(255,255,255,0.09)"
            borderRadius="3px"
            w="36px"
            h="36px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#6B84A8"
            fontSize="15px"
            cursor="pointer"
            position="relative"
            _hover={{ borderColor:"rgba(0,170,255,0.3)" }}>
            <LuShoppingCart />
            <Box
              position="absolute"
              top="-5px"
              right="-5px"
              bg="#FF2020"
              color="white"
              borderRadius="full"
              w="14px"
              h="14px"
              fontSize="8px"
              fontWeight="700"
              display="flex"
              alignItems="center"
              justifyContent="center">
              2
            </Box>
          </Box>

          {isAdmin && (
            <Box
              as="button"
              bg="rgba(0,170,255,0.09)"
              color="#00AAFF"
              border="1px solid rgba(0,170,255,0.25)"
              borderRadius="3px"
              w="34px"
              h="34px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              fontSize="18px"
              transition="background 0.2s"
              _hover={{ bg:"rgba(0,170,255,0.18)" }}
              onClick={() => navigate("/create")}>
              <LuPlus />
            </Box>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default Navbar