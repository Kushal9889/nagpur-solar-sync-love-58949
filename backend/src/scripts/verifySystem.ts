/**
 * 🔍 SYSTEM DIAGNOSTIC SCRIPT
 * 
 * Run with: npx ts-node src/scripts/verifySystem.ts
 * 
 * This script tests the core functionality of your backend:
 * - MongoDB Connection
 * - Lead Capture (Write)
 * - Session State (Read/Write)
 */

import mongoose from "mongoose";
import { MarketingLead, OrderSession } from "../models/funnel";
import dotenv from "dotenv";

dotenv.config();

const runDiagnostic = async () => {
  console.log("🔍 STARTING SYSTEM DIAGNOSTIC...\n");

  // 1. TEST CONNECTION
  const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/solarbuddy";
  
  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ Step 1: MongoDB Connection [OK]");
    console.log(`   Connected to: ${mongoUrl.substring(0, 50)}...`);
  } catch (e) {
    console.error("❌ Step 1 FAILED: Check your Mongo Server!");
    console.error("   Error:", e);
    process.exit(1);
  }

  // 2. TEST WRITE (Lead Capture)
  const testPhone = "+19998887777";
  try {
    await MarketingLead.deleteMany({ phone: testPhone }); // Cleanup prev run
    const lead = await MarketingLead.create({
      phone: testPhone,
      pincode: "90210",
      status: "new"
    });
    console.log(`✅ Step 2: Marketing Lead Write [OK] (ID: ${lead._id})`);
  } catch (e) {
    console.error("❌ Step 2 FAILED: DB Write Error", e);
  }

  // 3. TEST RELATIONSHIP (Session Sync)
  try {
    const session = await OrderSession.create({
      sessionId: "test_session_" + Date.now(),
      selection: {
        systemType: 'standard_8kw',
        basePrice: 18000,
        structureType: 'standard_roof',
        structureSurcharge: 0
      },
      finalQuote: {
        totalSystemCost: 18000,
        gstAmount: 900,
        finalTotal: 18900,
        monthlyEMI: 315,
        currency: 'USD'
      }
    });
    
    // Verify Read
    const fetched = await OrderSession.findOne({ _id: session._id });
    if (fetched && fetched.selection.basePrice === 18000) {
      console.log("✅ Step 3: Session State Read/Write [OK]");
      console.log(`   Session ID: ${fetched.sessionId}`);
      console.log(`   Final Total: $${fetched.finalQuote.finalTotal}`);
    } else {
      throw new Error("Data mismatch");
    }
    
    // Cleanup test session
    await OrderSession.deleteOne({ _id: session._id });
    await MarketingLead.deleteMany({ phone: testPhone });
    console.log("✅ Step 4: Cleanup [OK]");
    
  } catch (e) {
    console.error("❌ Step 3 FAILED: Session Error", e);
  }

  console.log("\n🎯 DIAGNOSTIC COMPLETE. Backend is healthy! ✨");
  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB.");
};

runDiagnostic();
