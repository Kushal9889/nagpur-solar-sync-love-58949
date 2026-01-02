import express from "express";
import Stripe from "stripe";
import User from "../models/user";
import Payment from "../models/payment"; 

const router = express.Router();

// ELITE-K: Initialize Stripe lazily to ensure env is loaded
// Ensure STRIPE_SECRET_KEY is in your .env file
const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    // apiVersion will use library default
  });
};

/**
 * POST /subscriptions/create-checkout
 * Description: Generates a Stripe Checkout Session URL
 * Resume Keyword: "PCI-Compliant Payment Orchestration"
 */
router.post("/create-checkout", async (req, res) => {
  try {
    const { userId, planName, priceAmount, metaData } = req.body;

    console.log("Initiating Checkout for:", planName, "Amount:", priceAmount);

    // 1. Validate User (Optional - can be skipped for guest checkout if needed)
    // For now, we allow "guest" if no userId is provided to unblock you
    let userEmail = "guest@example.com";
    if (userId && userId !== "guest") {
      try {
        const user = await User.findById(userId);
        if (user) userEmail = user.email;
      } catch (err) {
        console.warn("User ID lookup failed, proceeding as guest:", err);
      }
    }

    // 2. Create the Stripe Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr", // Set to INR for Indian Context (or USD for US jobs)
            product_data: {
              name: `Solar Installation: ${planName}`,
              description: "Booking Advance / Consultation Fee",
            },
            unit_amount: Math.round(priceAmount * 100), // Stripe expects paise/cents (integer)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      metadata: {
        userId: userId || "guest",
        planName: planName,
        ...metaData // Pass the solar calculation details here
      },
      // ELITE-K: Dynamic Success/Cancel URLs
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/residential?canceled=true`,
    });

    // 3. Log the intent in MongoDB (Audit Trail)
    // This allows you to follow up with users who clicked "Buy" but didn't finish
    await Payment.create({
      userId: (userId && userId !== "guest") ? userId : null,
      amount: priceAmount,
      currency: "inr",
      status: "pending",
      stripeSessionId: session.id,
      description: `Checkout initiated for ${planName}`
    });

    // 4. Return the URL to Frontend
    res.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;