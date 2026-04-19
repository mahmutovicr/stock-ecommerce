import mongoose from "mongoose";

const featuredSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  badge: { type: String, default: "Featured" },
  originalPrice: { type: Number },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Featured = mongoose.model("Featured", featuredSchema);
export default Featured;