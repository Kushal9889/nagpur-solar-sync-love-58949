import express from "express";
import Stripe from "stripe";
import User from "../models/user";

const router = express.Router();

// ELITE-K: Initialize Stripe with Secret Key (from .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15', // Use version compatible with installed SDK
});

/**
 * POST /subscriptions/create-checkout
 * Description: Generates a secure Stripe Payment Link
 */
router.post("/create-checkout", async (req, res) => {
  try {
    const { userId, planName, priceAmount } = req.body;

    // 1. Fetch user to get email for receipt
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Create the Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // US Job = US Currency
            product_data: {
              name: `Solar Plan: ${planName}`,
            },
            unit_amount: priceAmount * 100, // Stripe expects cents (e.g. $49.00 = 4900)
          },
          quantity: 1,
        },
      ],
      mode: "payment", // or 'subscription' for recurring
      customer_email: user.email,
      // Metadata passes data to the Webhook later!
      metadata: {
        userId: userId.toString(),
        planName: planName
      },
      // Where to go after payment
      success_url: `${process.env.FRONTEND_URL}/profile?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/booking?canceled=true`,
    });

    // 3. Return the URL to Frontend
    res.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;