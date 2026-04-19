import { createToaster, Toaster as ChakraToaster } from "@chakra-ui/react"
// eslint-disable-next-line react-refresh/only-export-components
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export function Toaster() {
  return (
    <ChakraToaster
      toaster={toaster}
      insetInline={{ mdDown: "4" }}
    />
  )
}