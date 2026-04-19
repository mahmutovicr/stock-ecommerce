import { Box, Flex, Text } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LuSearch, LuShoppingCart, LuPlus } from "react-icons/lu"
import { useProductStore } from "../store/product"

const StockLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00AAFF" />
        <stop offset="100%" stopColor="#FF2020" />
      </linearGradient>
    </defs>
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#lg)" />
    <path d="M2 17l10 5 10-5" stroke="url(#lg)" />
    <path d="M2 12l10 5 10-5" stroke="url(#lg)" />
  </svg>
)

const Navbar = () => {
  const { setSearch, products, resetToHome } = useProductStore()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

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

  const handleLogoClick = () => {
    resetToHome()
    setQuery("")
    navigate("/")
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
          <StockLogo />
          <Text className="nb-logo-txt" fontSize="18px" fontWeight="700" letterSpacing="6px" color="#F0F4FF">STOCK</Text>
        </Flex>

        <Box className="nb-search" flex="1" mx="auto" position="relative" ref={ref}>
          <Box position="relative">
            <input
              value={query}
              onChange={handleSearch}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="SEARCH PRODUCTS..."
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid rgba(0,100,180,0.3)",
                borderRadius: "4px",
                padding: "8px 34px 8px 12px",
                color: "#4A7AAA",
                fontSize: "11px",
                outline: "none",
                letterSpacing: "0.8px",
                boxSizing: "border-box",
                fontFamily: "'DM Sans','Inter',sans-serif",
              }}
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
                  _hover={{ bg: "rgba(0,170,255,0.06)" }}
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
            _hover={{ borderColor: "rgba(0,170,255,0.3)" }}>
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
            _hover={{ bg: "rgba(0,170,255,0.18)" }}
            onClick={() => navigate("/create")}>
            <LuPlus />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar