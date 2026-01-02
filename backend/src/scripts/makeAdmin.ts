/**
 * 🛠️ ADMIN PROMOTION SCRIPT
 * 
 * Run this script to promote a user to admin role.
 * 
 * Usage:
 *   npx ts-node src/scripts/makeAdmin.ts <email>
 * 
 * Example:
 *   npx ts-node src/scripts/makeAdmin.ts kushal@example.com
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error("❌ Usage: npx ts-node src/scripts/makeAdmin.ts <email>");
    console.error("   Example: npx ts-node src/scripts/makeAdmin.ts admin@solarpanda.com");
    process.exit(1);
  }

  // Check both MONGO_URI and MONGO_URL for flexibility
  const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/solarbuddy";

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to:", mongoUrl);

    // Find and update the user, or CREATE if not found
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`⚠️  User not found. Creating new admin user...`);
      user = await User.create({
        email: email.toLowerCase(),
        role: "admin",
        referralCode: `ADMIN_${Date.now()}`,
        credits: 0
      });
      console.log("\n🎉 SUCCESS! New Admin user created:");
    } else {
      user.role = "admin";
      await user.save();
      console.log("\n🎉 SUCCESS! User promoted to Admin:");
    }
    
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   ID: ${user._id}`);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB.");
  }
}

makeAdmin();
