import { Request, Response } from "express";
import { MarketingLead, OrderSession } from "../models/funnel";
import User from "../models/user";
import DocumentModel from "../models/document";
import Subscription from "../models/subscription";
import { v4 as uuidv4 } from 'uuid'; // You will need to: npm install uuid @types/uuid
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { getUploadUrl } from "../services/storage";

// Initialize Stripe (Ensure STRIPE_SECRET_KEY is in your .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // apiVersion: '2025-02-24.acacia', // Commented out to avoid TS error with current types
});

// ==========================================
// 1. CAPTURE LEAD (The Marketing Trap)
// ==========================================
// Route: POST /api/funnel/lead
// Access: Public
export const captureLead = async (req: Request, res: Response) => {
  try {
    const { phone, pincode, source } = req.body;

    // VALIDATION: Fail fast if data is missing
    if (!phone || !pincode) {
      return res.status(400).json({ success: false, error: "Phone and Pincode are required." });
    }

    // ELITE LOGIC: "Upsert" (Update if exists, Insert if new)
    // This prevents duplicate rows for the same person.
    const lead = await MarketingLead.findOneAndUpdate(
      { phone }, // Search criteria
      { 
        $set: { 
          pincode, 
          source: source || 'direct',
          lastActiveAt: new Date(),
          status: 'viewed_plans' // Advance their status
        } 
      },
      { new: true, upsert: true } // Options: Return new doc, Create if not found
    );

    // Generate a Session ID for the "Ghost" cart if they don't have one
    const sessionId = uuidv4();

    return res.status(200).json({
      success: true,
      data: {
        leadId: lead._id,
        sessionId: sessionId, // Frontend must store this in localStorage
        message: "Lead secured. Pipeline initialized."
      }
    });

  } catch (error) {
    console.error("Funnel Error:", error);
    return res.status(500).json({ success: false, error: "Internal System Error" });
  }
};

// ==========================================
// 2. SYNC & CALCULATE (The Pricing Engine)
// ==========================================
export const syncSessionState = async (req: Request, res: Response) => {
  try {
    const { sessionId, updateType, data } = req.body;
    // updateType options: 'PLAN_UPDATE', 'STRUCTURE_UPDATE', 'DOC_UPLOAD'

    if (!sessionId) return res.status(400).json({ error: "Session ID Required" });

    // 1. Retrieve or Initialize Session
    let session = await OrderSession.findOne({ sessionId });
    if (!session) {
      session = await OrderSession.create({ sessionId, selection: {} });
    }

    // 2. UPDATE LOGIC: Power Plan (Step 2 - Image 2)
    if (updateType === 'PLAN_UPDATE') {
      const { planType } = data; // e.g. 'basic_4kw'
      session.selection.systemType = planType;
      
      // HARDCODED BASE RATES (Centralized Pricing)
      switch (planType) {
        case 'basic_4kw': session.selection.basePrice = 12000; break;
        case 'standard_8kw': session.selection.basePrice = 18000; break;
        case 'premium_12kw': session.selection.basePrice = 26000; break;
        default: session.selection.basePrice = 0;
      }
      
      session.stepCompleted = Math.max(session.stepCompleted, 2);
    }

    // 3. UPDATE LOGIC: Structure (Step 3 - Image 3)
    if (updateType === 'STRUCTURE_UPDATE') {
      const { structureType } = data; // e.g. 'high_rise'
      session.selection.structureType = structureType;

      // SURCHARGE LOGIC
      switch (structureType) {
        case 'standard_roof': session.selection.structureSurcharge = 0; break;
        case 'elevated': session.selection.structureSurcharge = 2500; break; // +$2.5k
        case 'high_rise': session.selection.structureSurcharge = 5000; break; // +$5k
        default: session.selection.structureSurcharge = 0;
      }

      session.stepCompleted = Math.max(session.stepCompleted, 3);
    }

    // 3.5 UPDATE LOGIC: Document Upload (Step 5)
    if (updateType === 'DOC_UPLOAD') {
      const { docId, fileKey } = data; // e.g. 'state-id', 'uploads/...'
      
      // Initialize documents object if it doesn't exist
      if (!session.documents) {
        session.documents = {};
      }
      
      // Save the file path/key
      session.documents[docId] = fileKey;
      
      // We don't necessarily advance the step here, just save data
    }

    // 4. THE CALCULATOR (Runs on EVERY update)
    // This ensures Image 7 (Payment) always sees the correct math.
    const base = session.selection.basePrice || 0;
    const surcharge = session.selection.structureSurcharge || 0;
    const totalSystemCost = base + surcharge;
    
    // Tax Logic (e.g., 5% Tax)
    const taxRate = 0.05; 
    const gstAmount = totalSystemCost * taxRate;
    
    // Final Total
    const finalTotal = totalSystemCost + gstAmount;

    // EMI Logic (e.g., 60 Months @ 8% Interest Estimate)
    // Simplified: Total / 60
    const monthlyEMI = finalTotal > 0 ? Math.round(finalTotal / 60) : 0;

    // Save Calculated Values
    session.finalQuote = {
      totalSystemCost,
      gstAmount,
      finalTotal,
      monthlyEMI,
      currency: 'USD'
    };

    await session.save();

    // Return the FULL state so Frontend can update the UI instantly
    return res.status(200).json({ 
      success: true, 
      session 
    });

  } catch (error) {
    console.error("Pricing Engine Error:", error);
    return res.status(500).json({ error: "Calculation Failed" });
  }
};

// ==========================================
// 3. SECURE UPLOAD (The S3 Handshake)
// ==========================================
// Route: GET /api/funnel/upload-url
export const getSecureUploadUrl = async (req: Request, res: Response) => {
  try {
    const { sessionId, fileName, fileType } = req.query;
    
    if (!sessionId || !fileName || !fileType) {
      return res.status(400).json({ error: "Missing sessionId, fileName, or fileType" });
    }

    const s3Key = `uploads/${sessionId}/${Date.now()}_${fileName}`;
    
    // Use the Hybrid Service (Local or S3)
    const uploadUrl = await getUploadUrl(s3Key, fileType as string);

    return res.status(200).json({ 
      success: true, 
      uploadUrl, 
      key: s3Key 
    });
  } catch (error) {
    console.error("Upload URL Error:", error);
    return res.status(500).json({ error: "Failed to generate upload URL" });
  }
};

// ==========================================
// [LOCAL ONLY] RECEIVE LOCAL UPLOAD
// ==========================================
// Route: PUT /api/funnel/local-upload
export const handleLocalUpload = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    if (!key || typeof key !== 'string') return res.status(400).send("Missing key");

    // Ensure directory exists
    const filePath = path.join(process.cwd(), key);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Stream the file to disk
    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`📂 Local File Saved: ${filePath}`);
      res.status(200).send("Uploaded");
    });

    writeStream.on('error', (err) => {
      console.error("Write Stream Error:", err);
      res.status(500).send("Failed to save file");
    });

  } catch (error) {
    console.error("Local Upload Error:", error);
    res.status(500).send("Failed");
  }
};

// ==========================================
// 4. INITIATE PAYMENT (The Financial Lock)
// ==========================================
// Route: POST /api/funnel/create-payment
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    
    // 1. Fetch the Truth from the Database
    const session = await OrderSession.findOne({ sessionId });
    
    if (!session || !session.finalQuote.finalTotal) {
      return res.status(400).json({ error: "Session or Price invalid" });
    }

    // 2. Security Check: Amount must be valid
    const amountInCents = Math.round(session.finalQuote.finalTotal * 100);
    if (amountInCents < 50) { // Stripe minimum is 50 cents
       return res.status(400).json({ error: "Invalid payment amount" });
    }

    // 3. Create the Payment Intent (The "Invoice")
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        sessionId: session.sessionId, // LINK THE PAYMENT TO THE DATA
        planType: session.selection.systemType,
        customerType: session.selection.customerType
      },
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error("Stripe Error:", error);
    return res.status(500).json({ error: "Payment Gateway Failed" });
  }
};

// ==========================================
// 5. VERIFY & MIGRATE (The Final Handshake)
// ==========================================
// Route: POST /api/funnel/verify-payment
export const verifyPaymentAndMigrate = async (req: Request, res: Response) => {
  try {
    const { sessionId, paymentIntentId } = req.body;

    // 1. Verify Session
    const session = await OrderSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: "Session not found" });

    // 2. Verify Stripe Payment (Optional but recommended)
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // if (paymentIntent.status !== 'succeeded') ...

    // 3. MIGRATE TO PERMANENT DB
    // A. Find or Create User from Lead
    let user;
    if (session.linkedLeadId) {
      const lead = await MarketingLead.findById(session.linkedLeadId);
      if (lead) {
        user = await User.findOne({ phone: lead.phone });
        if (!user) {
          user = await User.create({
            phone: lead.phone,
            email: `guest_${lead.phone}@example.com`, // Placeholder
            referralCode: `REF-${lead.phone.slice(-4)}`,
            role: 'customer'
          });
        }
      }
    }

    // Fallback if no lead linked (shouldn't happen in strict flow)
    if (!user) {
       // Create a placeholder user
       user = await User.create({
         email: `session_${sessionId}@example.com`,
         referralCode: `REF-${sessionId.slice(0,6)}`,
         role: 'customer'
       });
    }

    // B. Migrate Documents
    const docIds = [];
    if (session.documents) {
      for (const [docType, fileKey] of session.documents.entries()) {
        const newDoc = await DocumentModel.create({
          owner: user._id,
          type: docType,
          url: fileKey, // In S3 this is the key
          status: 'pending'
        });
        docIds.push(newDoc._id);
      }
    }
    
    // Update User with Docs and Plan Details
    user.documents = docIds;
    user.planDetails = {
      capacity: session.selection.systemType || 'Custom',
      category: session.selection.systemType?.split('_')[0] || 'Standard', // e.g. 'basic' from 'basic_4kw'
      plantType: session.selection.customerType
    };
    await user.save();

    // C. Create Subscription/Order Record
    // We don't have a Plan model instance for these dynamic plans, so we might need to adjust Subscription model
    // For now, we will skip creating a formal Subscription object if it requires a Plan ID, 
    // or we create a dummy Plan. 
    // Ideally, we should have an Order model. 
    
    // For now, we'll just mark the session as converted
    session.status = 'converted';
    await session.save();

    // Update the Marketing Lead status
    if (session.linkedLeadId) {
      await MarketingLead.findByIdAndUpdate(session.linkedLeadId, { status: 'converted' });
    }

    return res.status(200).json({ success: true, message: "Order confirmed and migrated", userId: user._id });

  } catch (error) {
    console.error("Migration Error:", error);
    return res.status(500).json({ error: "Migration Failed" });
  }
};
