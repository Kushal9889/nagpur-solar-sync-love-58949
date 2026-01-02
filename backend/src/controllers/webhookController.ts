import { Request, Response } from "express";
import Stripe from "stripe";
import { OrderSession } from "../models/funnel";
import User from "../models/user";
import { Order } from "../models/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Using default API version from the library
});

// You get this from Stripe Dashboard > Developers > Webhooks
const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET; 

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    // 1. SECURITY: Verify the Event came from Stripe
    // Note: req.body MUST be a raw buffer here, not JSON.
    event = stripe.webhooks.constructEvent(req.body, sig as string, ENDPOINT_SECRET as string);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. LOGIC: Handle Successful Payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    console.log(`💰 Payment captured: ${paymentIntent.id}`);

    // 3. THE PROMOTION: Move Data from Ghost -> Permanent
    await promoteSessionToOrder(paymentIntent);
  }

  // Return 200 to Stripe quickly
  res.send();
};

// ==========================================
// INTERNAL HELPER: The Data Migration
// ==========================================
async function promoteSessionToOrder(paymentIntent: Stripe.PaymentIntent) {
  const { sessionId } = paymentIntent.metadata;

  // A. Find the Ghost Session
  const session = await OrderSession.findOne({ sessionId });
  if (!session) {
    console.error("❌ Critical: Paid session not found in DB:", sessionId);
    return;
  }

  // B. Find or Create the User (if they were a guest)
  // In a real app, you might look up by email from the session
  let user = await User.findOne({ email: `guest_${session.sessionId}@temp.com` }); // Simplified
  if (!user) {
     // Create a placeholder user if they don't exist
     user = await User.create({
       email: `guest_${session.sessionId}@temp.com`,
       referralCode: `REF_${Date.now()}`,
       role: 'customer'
     });
  }

  // C. Create the Permanent Order
  const newOrder = await Order.create({
    orderId: `ORD-${Date.now()}`,
    userId: user._id,
    stripePaymentId: paymentIntent.id,
    
    systemDetails: {
      systemType: session.selection.systemType,
      kwSize: 8, // You should save this in session.selection too
      structureType: session.selection.structureType
    },
    
    financials: {
      totalAmount: session.finalQuote.finalTotal,
      amountPaid: paymentIntent.amount / 100, // Convert cents to dollars
      currency: 'usd'
    },
    
    status: 'processing'
  });

  console.log("✅ ORDER CONFIRMED:", newOrder.orderId);

  // D. Kill the Ghost (Optional: or keep it for analytics)
  // await OrderSession.deleteOne({ sessionId }); 
}
