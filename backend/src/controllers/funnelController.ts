import { Request, Response } from "express";
import { MarketingLead, OrderSession } from "../models/funnel";
import User from "../models/user";
import DocumentModel from "../models/document";
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import path from 'path';
import fs from 'fs';
import { getUploadUrl } from "../services/storage";
import { Order } from "../models/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});

// ==========================================
// 1. CAPTURE LEAD (The Marketing Trap)
// ==========================================
export const captureLead = async (req: Request, res: Response) => {
  try {
    const { phone, pincode, source } = req.body;

    if (!phone || !pincode) {
      return res.status(400).json({ success: false, error: "Phone and Pincode are required." });
    }

    const lead = await MarketingLead.findOneAndUpdate(
      { phone },
      { 
        $set: { 
          pincode, 
          source: source || 'direct',
          lastActiveAt: new Date(),
          status: 'viewed_plans' 
        } 
      },
      { new: true, upsert: true }
    );

    const sessionId = uuidv4();

    return res.status(200).json({
      success: true,
      data: {
        leadId: lead._id,
        sessionId: sessionId,
        message: "Lead secured. Pipeline initialized."
      }
    });

  } catch (error) {
    console.error("Funnel Error:", error);
    return res.status(500).json({ success: false, error: "Internal System Error" });
  }
};

// ==========================================
// 2. SYNC & CALCULATE (The Boston Pricing Engine)
// ==========================================
export const syncSessionState = async (req: Request, res: Response) => {
  try {
    const { sessionId, updateType, data } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Session ID Required" });

    let session = await OrderSession.findOne({ sessionId });
    if (!session) {
      session = await OrderSession.create({ sessionId, selection: {} });
    }

    // 1. POWER PLAN RATES (Boston Market: ~$3.50-$3.80/Watt)
    if (updateType === 'PLAN_UPDATE') {
      const { planType } = data; 
      session.selection.systemType = planType;
      
      switch (planType) {
        case 'basic_4kw': session.selection.basePrice = 15200; break;    // $3.80/watt
        case 'standard_8kw': session.selection.basePrice = 28500; break; // $3.56/watt
        case 'premium_12kw': session.selection.basePrice = 39900; break; // $3.32/watt
        default: session.selection.basePrice = 0;
      }
      session.stepCompleted = Math.max(session.stepCompleted, 2);
    }

    // 2. STRUCTURE SURCHARGES (Logistics & Material)
    if (updateType === 'STRUCTURE_UPDATE') {
      const { structureType } = data; 
      session.selection.structureType = structureType;

      switch (structureType) {
        case 'standard_roof': session.selection.structureSurcharge = 0; break;
        case 'elevated': session.selection.structureSurcharge = 4200; break;   // Steel & reinforcement
        case 'high_rise': session.selection.structureSurcharge = 8500; break;  // Crane & safety
        default: session.selection.structureSurcharge = 0;
      }
      session.stepCompleted = Math.max(session.stepCompleted, 3);
    }

    // 3. HARDWARE SELECTION (Step 4 - The Logic we added earlier)
    if (updateType === 'HARDWARE_UPDATE') {
       const { selectedTechnology, selectedBrand, selectedInverter } = data;
       
       if (!session.selection.hardware) session.selection.hardware = {};
       if (selectedTechnology) session.selection.hardware.panelTechnology = selectedTechnology;
       if (selectedBrand) session.selection.hardware.panelBrand = selectedBrand;
       if (selectedInverter) session.selection.hardware.inverterBrand = selectedInverter;

       session.stepCompleted = Math.max(session.stepCompleted, 4);
    }

    // 3.5 DOC UPLOAD
    if (updateType === 'DOC_UPLOAD') {
      const { docId, fileKey } = data; 
      if (!session.documents) session.documents = {};
      session.documents[docId] = fileKey;
    }

    // 4. FINAL CALCULATION
    const base = session.selection.basePrice || 0;
    const surcharge = session.selection.structureSurcharge || 0;
    const totalSystemCost = base + surcharge;
    
    // MA Tax / GST equivalent (Using 5% placeholder or 6.25% MA Sales Tax if applicable)
    const taxRate = 0.0625; 
    const gstAmount = Math.round(totalSystemCost * taxRate);
    
    const finalTotal = totalSystemCost + gstAmount;
    const monthlyEMI = finalTotal > 0 ? Math.round(finalTotal / 60) : 0;

    session.finalQuote = {
      totalSystemCost,
      gstAmount,
      finalTotal,
      monthlyEMI,
      currency: 'USD'
    };

    await session.save();

    return res.status(200).json({ success: true, session });

  } catch (error) {
    console.error("Pricing Engine Error:", error);
    return res.status(500).json({ error: "Calculation Failed" });
  }
};

// ==========================================
// 3. SECURE UPLOAD
// ==========================================
export const getSecureUploadUrl = async (req: Request, res: Response) => {
  try {
    const { sessionId, fileName, fileType } = req.body; // Changed to Body for POST
    
    if (!sessionId || !fileName || !fileType) {
      return res.status(400).json({ error: "Missing file details" });
    }

    const s3Key = `uploads/${sessionId}/${Date.now()}_${fileName}`;
    const uploadUrl = await getUploadUrl(s3Key, fileType as string);

    // Track in DB
    await OrderSession.updateOne(
      { sessionId },
      { 
        $push: { 
          uploadedDocs: { 
            docType: 'pending', 
            s3Key: s3Key 
          } 
        } 
      }
    );

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
// 4. LOCAL UPLOAD HANDLER
// ==========================================
export const handleLocalUpload = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    if (!key || typeof key !== 'string') return res.status(400).send("Missing key");

    const filePath = path.join(process.cwd(), key);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`📂 Local File Saved: ${filePath}`);
      res.status(200).send("Uploaded");
    });

  } catch (error) {
    console.error("Local Upload Error:", error);
    res.status(500).send("Failed");
  }
};

// ==========================================
// 5. INITIATE PAYMENT
// ==========================================
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    
    const session = await OrderSession.findOne({ sessionId });
    
    if (!session || !session.finalQuote.finalTotal) {
      return res.status(400).json({ error: "Session or Price invalid" });
    }

    const amountInCents = Math.round(session.finalQuote.finalTotal * 100);
    if (amountInCents < 50) return res.status(400).json({ error: "Invalid amount" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        sessionId: session.sessionId,
        planType: session.selection.systemType,
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
// 5. VERIFY & MIGRATE (Saving The Breakdown)
// ==========================================
export const verifyPaymentAndMigrate = async (req: Request, res: Response) => {
  try {
    const { sessionId, paymentIntentId } = req.body;

    const session = await OrderSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: "Session not found" });

    if (session.status === 'converted') {
        return res.status(200).json({ message: "Order already processed" });
    }

    // --- USER CREATION LOGIC (Keep existing from previous steps) ---
    let user;
    if (session.linkedLeadId) {
      const lead = await MarketingLead.findById(session.linkedLeadId);
      if (lead) {
        user = await User.findOne({ phone: lead.phone });
        if (!user) {
          user = await User.create({
            authId: `guest_${lead._id}`,
            phone: lead.phone,
            email: `guest_${lead.phone}@example.com`,
            referralCode: `REF-${lead.phone.slice(-4)}-${Date.now().toString().slice(-4)}`,
            role: 'customer'
          });
        }
      }
    }
    if (!user) {
       user = await User.create({
         authId: `guest_${sessionId}`,
         email: `session_${sessionId.slice(0,8)}@example.com`,
         referralCode: `REF-${sessionId.slice(0,6)}-${Date.now().toString().slice(-4)}`,
         role: 'customer'
       });
    }
    // -------------------------------------------------------------

    // MIGRATE DOCUMENTS (Append Mode)
    const newDocIds: any[] = [];
    if (session.documents) {
      const entries: [string, string][] = session.documents instanceof Map 
          ? Array.from(session.documents.entries()) as [string, string][]
          : Object.entries(session.documents || {}) as [string, string][];

      for (const [docType, fileKey] of entries) {
        const newDoc = await DocumentModel.create({
          owner: user._id,
          type: docType,
          url: fileKey,
          status: 'pending'
        });
        newDocIds.push(newDoc._id);
      }
    }
    user.documents = [...(user.documents || []), ...newDocIds];

    user.planDetails = {
      capacity: session.selection.systemType || 'Custom',
      category: session.selection.systemType?.split('_')[0] || 'Standard',
      plantType: session.selection.customerType
    };
    await user.save();

    // [CRITICAL] CREATE ORDER WITH FULL FINANCIAL BREAKDOWN
    const newOrder = await Order.create({
        orderId: `ORD-${Date.now()}`,
        userId: user._id,
        stripePaymentId: paymentIntentId || 'manual_check', 
        
        systemDetails: {
            systemType: session.selection.systemType,
            kwSize: session.selection.systemType === 'basic_4kw' ? 4 : 
                    session.selection.systemType === 'standard_8kw' ? 8 : 12,
            structureType: session.selection.structureType,
            hardware: {
                panelTechnology: session.selection.hardware?.panelTechnology || 'Standard',
                panelBrand: session.selection.hardware?.panelBrand || 'TBD',
                inverterBrand: session.selection.hardware?.inverterBrand || 'TBD'
            }
        },
        
        // [NEW] STORE THE MATH
        financials: {
            basePrice: session.selection.basePrice || 0,
            structureSurcharge: session.selection.structureSurcharge || 0,
            gstAmount: session.finalQuote.gstAmount || 0,
            totalAmount: session.finalQuote.finalTotal,
            amountPaid: session.finalQuote.finalTotal,
            currency: 'USD'
        },
        
        status: 'site_visit_scheduled' 
    });

    session.status = 'converted';
    await session.save();

    if (session.linkedLeadId) {
      await MarketingLead.findByIdAndUpdate(session.linkedLeadId, { status: 'converted' });
    }

    return res.status(200).json({ 
        success: true, 
        message: "Order Confirmed", 
        userId: user._id,
        orderId: newOrder.orderId,
        redirectUrl: '/order-success' 
    });

  } catch (error) {
    console.error("Migration Error:", error);
    return res.status(500).json({ error: "Order Creation Failed" });
  }
};