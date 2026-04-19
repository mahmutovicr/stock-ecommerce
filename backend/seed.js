import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
})

const Product = mongoose.model("Product", productSchema)

const products = [
  { name: "iPhone 15 Pro Max", category: "Smartphones", price: 1199, featured: true, newArrival: false, description: "A17 Pro · 48MP · Titanium · 6.7\"" },
  { name: "iPhone 16 Pro", category: "Smartphones", price: 999, featured: false, newArrival: false, description: "A18 Pro · 48MP · Desert Titanium · 6.3\"" },
  { name: "Samsung Galaxy S25 Ultra", category: "Smartphones", price: 1299, featured: false, newArrival: false, description: "Snapdragon 8 Elite · 200MP · S Pen · 6.9\"" },
  { name: "Samsung Galaxy S25+", category: "Smartphones", price: 999, featured: false, newArrival: false, description: "Snapdragon 8 Elite · 50MP · 6.7\" AMOLED" },
  { name: "Google Pixel 9 Pro XL", category: "Smartphones", price: 1099, featured: false, newArrival: false, description: "Tensor G4 · 50MP · 6.8\" LTPO OLED" },
  { name: "OnePlus 13", category: "Smartphones", price: 799, featured: false, newArrival: false, description: "Snapdragon 8 Elite · 50MP · Hasselblad" },
  { name: "Xiaomi 14 Ultra", category: "Smartphones", price: 899, featured: false, newArrival: false, description: "Snapdragon 8 Gen 3 · Leica · 1\" sensor" },
  { name: "Sony Xperia 1 VI", category: "Smartphones", price: 1299, featured: false, newArrival: false, description: "Snapdragon 8 Gen 3 · 52MP Zeiss · 4K OLED" },
  { name: "Samsung Galaxy S26 Ultra", category: "Smartphones", price: 1399, featured: false, newArrival: true, description: "Snapdragon 8 Gen 4 · 200MP · S Pen · 6.9\"" },
  { name: "iPhone 17 Pro Max", category: "Smartphones", price: 1299, featured: false, newArrival: true, description: "A19 Pro · 48MP · Titanium · 6.9\"" },

  { name: "MacBook Pro M3 Max", category: "Laptops", price: 2499, featured: true, newArrival: false, description: "M3 Max · 36GB · 16\" Liquid Retina XDR" },
  { name: "MacBook Air M3", category: "Laptops", price: 1299, featured: false, newArrival: false, description: "M3 · 16GB · 15.3\" Liquid Retina" },
  { name: "Dell XPS 15", category: "Laptops", price: 1799, featured: false, newArrival: false, description: "Core Ultra 9 · RTX 4070 · 15.6\" OLED" },
  { name: "ASUS ROG Zephyrus G16", category: "Laptops", price: 2199, featured: false, newArrival: false, description: "Ryzen 9 · RTX 4090 · 16\" OLED 240Hz" },
  { name: "HP OmniBook 5 14", category: "Laptops", price: 1199, featured: false, newArrival: true, description: "Core Ultra 7 · Intel Arc · 14\" IPS" },
  { name: "Lenovo ThinkPad X1 Carbon", category: "Laptops", price: 1699, featured: false, newArrival: false, description: "Core Ultra 7 · 32GB · 14\" IPS · 1.12kg" },
  { name: "Razer Blade 16", category: "Laptops", price: 2799, featured: false, newArrival: false, description: "Core i9 · RTX 4090 · 16\" QHD+ 240Hz" },
  { name: "Microsoft Surface Laptop 6", category: "Laptops", price: 1399, featured: false, newArrival: false, description: "Core Ultra 5 · 16GB · 13.5\" PixelSense" },
  { name: "Acer Swift X 14", category: "Laptops", price: 999, featured: false, newArrival: false, description: "Ryzen 7 · RTX 4060 · 14\" 2.8K OLED" },
  { name: "LG Gram 16", category: "Laptops", price: 1499, featured: false, newArrival: false, description: "Core Ultra 7 · 32GB · 16\" IPS · 1.19kg" },

  { name: "PS5 Pro", category: "Gaming", price: 699, featured: true, newArrival: false, description: "8K Ready · 2TB SSD · DualSense Edge" },
  { name: "Xbox Series X", category: "Gaming", price: 499, featured: false, newArrival: false, description: "12 TFLOPS · 1TB SSD · 120fps" },
  { name: "Nintendo Switch 2", category: "Gaming", price: 449, featured: false, newArrival: true, description: "DLSS · 7.9\" LCD · 4K Docked" },
  { name: "ASUS ROG Ally X", category: "Gaming", price: 899, featured: false, newArrival: false, description: "Ryzen Z1 Extreme · 24GB · 7\" FHD 120Hz" },
  { name: "Valve Steam Deck OLED", category: "Gaming", price: 549, featured: false, newArrival: false, description: "Custom APU · 7.4\" OLED · 90Hz · 512GB" },
  { name: "Logitech G Pro X Superlight 2", category: "Gaming", price: 159, featured: false, newArrival: false, description: "32K DPI · Hero 2 · 60g · USB-C" },
  { name: "SteelSeries Arctis Nova Pro", category: "Gaming", price: 349, featured: false, newArrival: false, description: "ANC · Multi-System · 2.4GHz · OLED" },
  { name: "Corsair K100 RGB", category: "Gaming", price: 229, featured: false, newArrival: false, description: "OPX Switches · 4000Hz · iCUE · Aluminum" },
  { name: "Razer DeathAdder V3 Pro", category: "Gaming", price: 159, featured: false, newArrival: false, description: "30K DPI · Focus Pro · 90h Battery · 63g" },
  { name: "HyperX Cloud Alpha Wireless", category: "Gaming", price: 199, featured: false, newArrival: false, description: "300h Battery · 50mm Drivers · USB-A" },

  { name: "Samsung S90F OLED 65\"", category: "TVs", price: 1799, featured: true, newArrival: true, description: "OLED · 4K · 144Hz · Dolby Atmos" },
  { name: "LG C4 OLED 65\"", category: "TVs", price: 1499, featured: false, newArrival: false, description: "4K OLED · 120Hz · α9 AI · Dolby Vision" },
  { name: "Sony Bravia 9 Mini LED 75\"", category: "TVs", price: 2499, featured: false, newArrival: false, description: "Mini LED · 4K · 144Hz · XR Processor" },
  { name: "TCL QM891G QLED 65\"", category: "TVs", price: 999, featured: false, newArrival: false, description: "Mini LED QLED · 4K · 144Hz" },
  { name: "Hisense U8N 75\"", category: "TVs", price: 1299, featured: false, newArrival: false, description: "Mini LED · 4K · 144Hz · Dolby Vision IQ" },
  { name: "Samsung Neo QLED 8K 85\"", category: "TVs", price: 3499, featured: false, newArrival: false, description: "8K Neo QLED · 144Hz · Neural Quantum" },
  { name: "LG G4 OLED 77\"", category: "TVs", price: 2999, featured: false, newArrival: false, description: "Evo OLED · 4K · 144Hz · Gallery Design" },
  { name: "Philips OLED+959 65\"", category: "TVs", price: 2199, featured: false, newArrival: false, description: "OLED · 4K · 120Hz · Ambilight 4-sided" },
  { name: "Panasonic Z95A 65\"", category: "TVs", price: 2699, featured: false, newArrival: false, description: "OLED · 4K · 144Hz · Filmmaker Mode" },
  { name: "TCL C855 75\"", category: "TVs", price: 1099, featured: false, newArrival: false, description: "Mini LED · 4K · 144Hz · Google TV" },

  { name: "Apple Mac Studio M3 Ultra", category: "Desktops", price: 3999, featured: false, newArrival: true, description: "M3 Ultra · 192GB · 80-core GPU" },
  { name: "HP Z8 Fury G5", category: "Desktops", price: 3499, featured: false, newArrival: true, description: "Xeon W · 128GB ECC · Dual GPU Ready" },
  { name: "Mac Mini M4 Pro", category: "Desktops", price: 1399, featured: false, newArrival: false, description: "M4 Pro · 24GB · Thunderbolt 5" },
  { name: "ASUS ProArt Station PD5", category: "Desktops", price: 2199, featured: false, newArrival: false, description: "Core i9 · RTX 4080 · 64GB DDR5" },
  { name: "Dell OptiPlex 7020", category: "Desktops", price: 899, featured: false, newArrival: false, description: "Core Ultra 5 · 16GB · SFF · Win 11" },
  { name: "Lenovo Legion Tower 7i", category: "Desktops", price: 2499, featured: false, newArrival: false, description: "Core i9 · RTX 4090 · 64GB · 2TB NVMe" },
  { name: "iMac M3 24\"", category: "Desktops", price: 1599, featured: false, newArrival: false, description: "M3 · 16GB · 24\" 4.5K Retina · 10-core GPU" },
  { name: "HP Envy Desktop 2024", category: "Desktops", price: 1299, featured: false, newArrival: false, description: "Core Ultra 7 · RTX 4060 · 32GB" },
  { name: "ASUS ROG Strix G35", category: "Desktops", price: 3299, featured: false, newArrival: false, description: "Core i9 · RTX 4090 · 64GB · 4TB" },
  { name: "Alienware Aurora R16", category: "Desktops", price: 3499, featured: false, newArrival: false, description: "Core i9 · RTX 4090 · 64GB DDR5" },

  { name: "Apple AirPods Pro 2", category: "Accessories", price: 249, featured: false, newArrival: false, description: "ANC · H2 Chip · USB-C · MagSafe" },
  { name: "Sony WH-1000XM5", category: "Accessories", price: 349, featured: false, newArrival: true, description: "ANC · 30h Battery · LDAC · Hi-Res" },
  { name: "Apple Watch Ultra 2", category: "Accessories", price: 799, featured: false, newArrival: false, description: "49mm · Titanium · GPS+Cell · 36h Battery" },
  { name: "Samsung Galaxy Watch 7", category: "Accessories", price: 299, featured: false, newArrival: false, description: "1.5\" AMOLED · BioActive · Wear OS" },
  { name: "Logitech MX Master 3S", category: "Accessories", price: 99, featured: false, newArrival: false, description: "8K DPI · Silent Click · USB-C · Ergonomic" },
  { name: "Apple Magic Keyboard Touch ID", category: "Accessories", price: 129, featured: false, newArrival: false, description: "Touch ID · USB-C · Scissor Switch" },
  { name: "Samsung Odyssey G9 OLED 49\"", category: "Accessories", price: 1299, featured: false, newArrival: false, description: "49\" DQHD · 240Hz · OLED · HDR2000" },
  { name: "Bose QuietComfort 45", category: "Accessories", price: 279, featured: false, newArrival: false, description: "ANC · 24h Battery · Foldable · USB-C" },
  { name: "Apple iPad Pro M4 13\"", category: "Accessories", price: 1299, featured: false, newArrival: false, description: "M4 · OLED · 13\" · Nano-texture Glass" },
  { name: "Razer DeathAdder V3 Pro", category: "Accessories", price: 159, featured: false, newArrival: false, description: "30K DPI · Focus Pro · 90h Battery · 63g" },
]

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  await Product.deleteMany({})
  await Product.insertMany(products)
  console.log("Seeded", products.length, "products —", products.length / 10, "categories × 10")
  process.exit(0)
}

seed()