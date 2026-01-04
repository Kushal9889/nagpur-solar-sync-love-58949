import mongoose from 'mongoose';
import { Order } from '../models/order';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
const envPath = path.resolve(__dirname, '../../.env');
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "FOUND" : "NOT FOUND");

const API_URL = 'http://localhost:3000/api/funnel';

async function runSmokeTest() {
  console.log("🔥 STARTING SMOKE TEST 🔥");

  try {
    // 1. Capture Lead
    console.log("\nStep 1: Capturing Lead...");
    const leadRes = await fetch(`${API_URL}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: "555-000-1234",
        pincode: "90210",
        source: "smoke_test"
      })
    });
    const leadData = await leadRes.json();
    if (!leadData.success) throw new Error("Lead capture failed: " + JSON.stringify(leadData));
    const { sessionId } = leadData.data;
    console.log("✅ Lead Captured. Session ID:", sessionId);

    // 2. Select Plan
    console.log("\nStep 2: Selecting Plan...");
    await fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        updateType: "PLAN_UPDATE",
        data: { planType: "standard_8kw" }
      })
    });
    console.log("✅ Plan Selected: standard_8kw");

    // 3. Select Structure
    console.log("\nStep 3: Selecting Structure...");
    await fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        updateType: "STRUCTURE_UPDATE",
        data: { structureType: "elevated" }
      })
    });
    console.log("✅ Structure Selected: elevated");

    // 4. Select Hardware (CRITICAL)
    console.log("\nStep 4: Selecting Hardware (The Critical Fix)...");
    await fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        updateType: "HARDWARE_UPDATE",
        data: {
          selectedTechnology: "topcon",
          selectedBrand: "panasonic",
          selectedInverter: "enphase"
        }
      })
    });
    console.log("✅ Hardware Selected: TOPCon / Panasonic / Enphase");

    // 5. Verify Payment & Migrate
    console.log("\nStep 5: Simulating Payment & Migration...");
    const migrateRes = await fetch(`${API_URL}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        paymentIntentId: "pi_smoke_test_123"
      })
    });
    const migrateData = await migrateRes.json();
    
    if (migrateData.success) {
        console.log("✅ Order Created. Order ID:", migrateData.orderId);
        
        // 6. THE VAULT CHECK
        console.log("\nStep 6: THE VAULT CHECK (Database Verification)...");
        
        // Connect to DB to verify
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI not found in .env");
        }
        await mongoose.connect(mongoUri);
        
        const order = await Order.findOne({ orderId: migrateData.orderId });
        
        if (!order) {
            console.error("❌ FATAL: Order not found in database!");
            process.exit(1);
        }

        console.log("Order Found:", order.orderId);
        console.log("System Details:", JSON.stringify(order.systemDetails, null, 2));

        const hw = order.systemDetails.hardware;
        if (
            hw.panelBrand === 'panasonic' && 
            hw.inverterBrand === 'enphase' && 
            hw.panelTechnology === 'topcon'
        ) {
            console.log("\n🎉 PASS: HARDWARE DATA SURVIVED MIGRATION! 🎉");
        } else {
            console.error("\n❌ FAIL: HARDWARE DATA MISMATCH OR MISSING");
            console.error("Expected: panasonic, enphase, topcon");
            console.error("Got:", hw);
        }

        await mongoose.disconnect();

    } else {
        console.error("❌ Migration Failed:", migrateData);
    }

  } catch (error: any) {
    console.error("❌ Smoke Test Failed:", error.message);
  }
}

runSmokeTest();