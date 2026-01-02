import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import devicesRouter from "./routes/devices";
import subscriptionsRouter from "./routes/subscriptions";
import paymentsRouter from "./routes/payments";
import usersRouter from "./routes/users";
import installersRouter from "./routes/installers";
import documentsRouter from "./routes/documents";
import funnelRouter from "./routes/funnel";
import adminRouter from "./routes/admin";
import { handleStripeWebhook } from "./controllers/webhookController";

import { connectToMongo } from "./db/mongo";

dotenv.config();

const app = express();

// ==========================================
// 1. WEBHOOK ROUTE (MUST BE BEFORE JSON PARSER)
// ==========================================
// Stripe needs the RAW body to verify the signature
app.post(
  "/api/webhook", 
  express.raw({ type: "application/json" }), 
  handleStripeWebhook
);

// ==========================================
// 2. GLOBAL MIDDLEWARE
// ==========================================
app.use(cors());
app.use(express.json()); // Normal JSON parser for everything else

// Serve uploaded files in development from backend/uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = process.env.PORT || 3000;

// Mount API routes
app.use("/api/devices", devicesRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/installers", installersRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/funnel", funnelRouter);
app.use("/api/admin", adminRouter);

async function start() {
  // Check both MONGO_URI and MONGO_URL for flexibility
  const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/solarbuddy";
  try {
    await connectToMongo(mongoUrl);
    console.log("Connected to MongoDB:", mongoUrl);
  } catch (err) {
    console.warn("Failed to connect to MongoDB, starting server anyway:", err);
  }

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

start();