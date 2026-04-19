
import { IconButton } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode } from "./use-color-mode"

export function ColorModeProvider(props) {
  return (
    <ThemeProvider 
    attribute="data-theme" 
    defaultTheme="light"
    disableTransitionOnChange
      {...props} />
  )
}

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton 
    onClick={toggleColorMode}
    variant="ghost" 
    aria-label="Toggle color mode" 
    size="sm" 
    color="textPrimary">
    {colorMode === "dark" ? <LuSun /> : <LuMoon />}
    </IconButton>
  )
}