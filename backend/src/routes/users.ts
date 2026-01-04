import express from "express";
import User from "../models/user";
import { Order } from "../models/order";
const router = express.Router();

/**
 * POST /users
 * Create or update a user by email (idempotent)
 * Body: { name, email, phone, role, address }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, role, address } = req.body || {};
    if (!email) return res.status(400).json({ error: "Missing required field: email" });

    let user = await User.findOne({ email }).exec();
    if (!user) {
      const code = (Math.random() + 1).toString(36).substring(2, 8).toUpperCase();
      user = new User({ name, email, phone, role: role || "customer", address, referralCode: code, credits: 0 });
      await user.save();
    } else {
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.role = role || user.role;
      user.address = address || user.address;
      await user.save();
    }

    return res.json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /users/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("documents").exec();
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /users/:id/orders
 * Fetch all orders for a specific user
 */
router.get("/:id/orders", async (req, res) => {
  try {
    const userId = req.params.id;
    // Find orders where userId matches
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;