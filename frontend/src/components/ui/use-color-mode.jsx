import { useTheme } from "next-themes"

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  return {
    colorMode: resolvedTheme ?? "light",
    toggleColorMode: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
  }
}