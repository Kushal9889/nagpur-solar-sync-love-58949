import { Request, Response } from "express";
import { MarketingLead, OrderSession } from "../models/funnel";
import User from "../models/user";
import DocumentModel from "../models/document";
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import path from 'path';
import fs from 'fs';
import { getUploadUrl } from "../services/storage";

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
// 2. SYNC & CALCULATE (The Lean Pricing Engine)
// ==========================================
export const syncSessionState = async (req: Request, res: Response) => {
  try {
    const { sessionId, updateType, data } = req.body;

    if (!sessionId) return res.status(400).json({ error: "Session ID Required" });

    let session = await OrderSession.findOne({ sessionId });
    if (!session) {
      session = await OrderSession.create({ sessionId, selection: {} });
    }

    // --- STEP 2: PLAN SELECTION ---
    if (updateType === 'PLAN_UPDATE') {
      const { planType } = data;
      session.selection.systemType = planType;
      
      switch (planType) {
        case 'basic_4kw': session.selection.basePrice = 12000; break;
        case 'standard_8kw': session.selection.basePrice = 18000; break;
        case 'premium_12kw': session.selection.basePrice = 26000; break;
        default: session.selection.basePrice = 0;
      }
      
      session.stepCompleted = Math.max(session.stepCompleted, 2);
    }

    // --- STEP 3: STRUCTURE SELECTION ---
    if (updateType === 'STRUCTURE_UPDATE') {
      const { structureType } = data;
      session.selection.structureType = structureType;

      switch (structureType) {
        case 'standard_roof': session.selection.structureSurcharge = 0; break;
        case 'elevated': session.selection.structureSurcharge = 2500; break;
        case 'high_rise': session.selection.structureSurcharge = 5000; break;
        default: session.selection.structureSurcharge = 0;
      }

      session.stepCompleted = Math.max(session.stepCompleted, 3);
    }

    // --- STEP 4: HARDWARE CONFIGURATION (The 3 Real Factors) ---
    if (updateType === 'HARDWARE_UPDATE') {
       const { selectedTechnology, selectedBrand, selectedInverter } = data;
       
       // Initialize if missing
       if (!session.selection.hardware) session.selection.hardware = {
           panelTechnology: '',
           panelBrand: '',
           inverterBrand: ''
       };

       if (selectedTechnology) session.selection.hardware.panelTechnology = selectedTechnology;
       if (selectedBrand) session.selection.hardware.panelBrand = selectedBrand;
       if (selectedInverter) session.selection.hardware.inverterBrand = selectedInverter;

       session.stepCompleted = Math.max(session.stepCompleted, 4);
    }

    // --- STEP 5: DOCUMENTS (Just tracking) ---
    if (updateType === 'DOC_UPLOAD') {
        // Doc tracking handled in upload route usually, 
        // but we can advance step here if needed
        session.stepCompleted = Math.max(session.stepCompleted, 5);
    }

    // --- PRICE CALCULATION (Runs on EVERY update) ---
    const sel = session.selection;
    
    // STRICT MATH: Base + Structure + Inverter Surcharge
    // (Panels are included in Base Price, only Inverter adds extra here)
    const totalSystemCost = 
        (sel.basePrice || 0) + 
        (sel.structureSurcharge || 0); 
        
    const gstAmount = totalSystemCost * 0.05; // 5% Tax
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
// 6. VERIFY & MIGRATE (Manual fallback)
// ==========================================
export const verifyPaymentAndMigrate = async (req: Request, res: Response) => {
    // Note: Most logic should be in the Webhook, this is a fallback
    return res.status(200).json({ success: true, message: "Use Webhook for migration" });
};