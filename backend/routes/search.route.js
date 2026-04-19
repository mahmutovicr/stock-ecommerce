import express from "express"
import Product from "../models/product.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const { q, category } = req.query
  try {
    let query = {}
    if (q) query.name = { $regex: q, $options: "i" }
    if (category) query.category = category

    const products = await Product.find(query)
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, message: "Search failed" })
  }
})

export default router