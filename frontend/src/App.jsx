import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NewArrivalsPage from "./pages/NewArrivalsPage"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <Box minH="100vh" bg="bg">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
      </Routes>
      <Toaster />
    </Box>
  )
}

export default App