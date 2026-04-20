import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.route.js"
import authRoutes from "./routes/auth.route.js"
import featuredRoutes from "./routes/featured.route.js"
import searchRoutes from "./routes/search.route.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/featured", featuredRoutes)
app.use("/api/search", searchRoutes)

app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"))
})

app.listen(PORT, () => {
  connectDB()
  console.log("Server started at http://localhost:" + PORT)
})