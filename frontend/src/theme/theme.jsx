import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "'DM Sans', 'Inter', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        bg:          { value: "#0D1321" },
        surface:     { value: "#101828" },
        catBg:       { value: "#0B1020" },
        textPrimary: { value: "#F0F4FF" },
        textMuted:   { value: "#6B84A8" },
        textDim:     { value: "#2A3F60" },
        accent:      { value: "#00AAFF" },
        accentRed:   { value: "#FF2020" },
        cardBorder:  { value: "rgba(255,255,255,0.055)" },
        navBorder:   { value: "rgba(255,255,255,0.07)" },
      },
    },
  },
})

export default createSystem(defaultConfig, config)