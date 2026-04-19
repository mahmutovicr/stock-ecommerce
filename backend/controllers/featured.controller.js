import Featured from "../models/featured.model.js";

export const getFeatured = async (_req, res) => {
  try {
    const featured = await Featured.find({});
    res.status(200).json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createFeatured = async (req, res) => {
  const { name, price, image, description, category, badge, originalPrice } = req.body;
  if (!name || !price || !image || !description || !category) return res.status(400).json({ success: false, message: "Please provide all required fields" });
  try {
    const product = await Featured.create({ name, price, image, description, category, badge, originalPrice });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Featured.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Featured.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};