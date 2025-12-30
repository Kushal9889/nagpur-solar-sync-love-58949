import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Subscription from "../models/subscription";
import Payment from "../models/payment";

dotenv.config();

const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2022-11-15" }) : null;

// NOTE: This route expects the raw body (Stripe signature verification)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe) return res.status(500).send("Stripe not configured");

    const sig = req.headers["stripe-signature"] as string | undefined;
    if (!sig || !webhookSecret) {
      // If signature or secret missing, don't attempt verification — still try to parse
      console.warn("Missing webhook signature or secret");
      return res.status(400).send("Webhook config error");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event types we care about
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          // The controller saved the checkout session id on the Subscription.stripeSubscriptionId
          if (session.id) {
            const sub = await Subscription.findOne({ stripeSubscriptionId: session.id }).exec();
            if (sub) {
              sub.status = "active";
              // If Stripe provides the actual subscription id, store/replace it
              if ((session as any).subscription) sub.stripeSubscriptionId = (session as any).subscription;
              sub.currentPeriodStart = new Date();
              // naive 30 day period if Stripe doesn't provide periods yet
              sub.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 3600 * 1000);
              await sub.save();
              console.log("Marked subscription active for", sub._id.toString());
            } else {
              console.warn("No subscription found for session id", session.id);
            }
          }
          break;
        }

        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          // If you want to record payments in the Payment model
          try {
            const metadata = (invoice as any).metadata || {};
            const userId = metadata.userId;
            if (userId) {
              const p = new Payment({ user: userId, amount: invoice.amount_paid, currency: invoice.currency, method: "stripe", stripeSessionId: invoice.id, status: "paid" });
              await p.save();
            }
          } catch (err) {
            console.warn("Failed to record invoice payment:", err);
          }
          break;
        }

        // Add more event handlers as needed
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      console.error("Error handling webhook event:", err);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

export default router;
