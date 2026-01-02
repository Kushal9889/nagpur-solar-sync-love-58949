import { Request, Response } from "express";
import Stripe from "stripe";
import { OrderSession, MarketingLead } from "../models/funnel";
import User from "../models/user";
import { Order } from "../models/order";
import DocumentModel from "../models/document";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // apiVersion: '2025-02-24.acacia',
});

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET; 

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    // 1. SECURITY: Verify the Event
    event = stripe.webhooks.constructEvent(req.body, sig as string, ENDPOINT_SECRET as string);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. LOGIC: Handle Successful Payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`💰 Payment captured: ${paymentIntent.id}`);
    
    // Execute the "Grand Unification"
    await promoteSessionToOrder(paymentIntent);
  }

  res.send();
};

// ==========================================
// THE GRAND UNIFIER: Session -> Permanent DB
// ==========================================
async function promoteSessionToOrder(paymentIntent: Stripe.PaymentIntent) {
  const { sessionId } = paymentIntent.metadata;

  // A. Find the Ghost Session
  const session = await OrderSession.findOne({ sessionId });
  if (!session) {
    console.error("❌ Critical: Paid session not found in DB:", sessionId);
    return;
  }

  // B. Find or Create User (Link to Lead if possible)
  let user;
  if (session.linkedLeadId) {
    const lead = await MarketingLead.findById(session.linkedLeadId);
    if (lead) {
      user = await User.findOne({ phone: lead.phone });
      // If user doesn't exist yet, create them from Lead data
      if (!user) {
        user = await User.create({
          phone: lead.phone,
          email: `customer_${lead.phone.slice(-4)}@solar-app.com`, // Placeholder until they fully register
          role: 'customer',
          profile: { verified: true }
        });
      }
      // Update Lead Status
      await MarketingLead.findByIdAndUpdate(session.linkedLeadId, { status: 'converted' });
    }
  }

  // Fallback: Create Guest User if no Lead found
  if (!user) {
     user = await User.create({
       email: `guest_${session.sessionId.slice(0,8)}@temp.com`,
       role: 'customer'
     });
  }

  // C. MIGRATE DOCUMENTS (The Missing Link)
  // We move files from "Temporary Session" tracking to "Permanent Document" table
  if (session.uploadedDocs && session.uploadedDocs.length > 0) {
    console.log(`📂 Migrating ${session.uploadedDocs.length} documents for User ${user._id}`);
    
    for (const doc of session.uploadedDocs) {
      await DocumentModel.create({
        owner: user._id,
        type: doc.docType, // e.g. 'drivers_license'
        url: doc.s3Key,    // The path in S3/Local
        status: 'verified',
        metadata: {
          uploadedAt: doc.uploadedAt,
          sessionId: sessionId
        }
      });
    }
  }

  // D. Create the Permanent Order
  const newOrder = await Order.create({
    orderId: `ORD-${Date.now()}`,
    userId: user._id,
    stripePaymentId: paymentIntent.id,
    
    systemDetails: {
      systemType: session.selection.systemType,
      kwSize: session.selection.systemSizeKw || 8, 
      structureType: session.selection.structureType
    },
    
    financials: {
      totalAmount: session.finalQuote.finalTotal,
      amountPaid: paymentIntent.amount / 100, // Convert cents to dollars
      currency: 'usd'
    },
    
    status: 'site_visit_scheduled'
  });

  console.log("✅ FULL ORDER PROCESSED:", newOrder.orderId);
}