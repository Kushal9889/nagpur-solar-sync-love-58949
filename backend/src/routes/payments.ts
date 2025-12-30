import express from "express";
import Payment from "../models/payment";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2022-11-15" }) : null;

/**
 * POST /payments/record
 * Record a payment (or invoice) from frontend/webhook
 * Body: { userId, subscriptionId?, amount, currency, method, stripeSessionId?, status }
 */
router.post("/record", async (req, res) => {
  try {
    const { userId, subscriptionId, amount, currency = "INR", method = "manual", stripeSessionId, status = "pending" } = req.body || {};
    if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });
    const p = new Payment({ user: userId, subscription: subscriptionId, amount, currency, method, stripeSessionId, status });
    await p.save();
    res.status(201).json(p);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;