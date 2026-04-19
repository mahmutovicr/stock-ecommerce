import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
    res.status(200).json({ success: true, token: generateToken(user._id), role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: "Please provide all fields" });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "User already exists" });

    const admin = await User.create({ name, email, password, role: "admin" });
    res.status(201).json({ success: true, message: "Admin created", admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};