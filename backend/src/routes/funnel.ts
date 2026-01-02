import express from "express";
import { captureLead, syncSessionState, getSecureUploadUrl, createPaymentIntent, verifyPaymentAndMigrate, handleLocalUpload } from "../controllers/funnelController";

const router = express.Router();

// 1. Capture Lead
// POST /api/funnel/lead
router.post("/lead", captureLead);

// 2. Sync Session State
// POST /api/funnel/session
router.post("/session", syncSessionState);

// 3. Get Secure Upload URL
// GET /api/funnel/upload-url
router.get("/upload-url", getSecureUploadUrl);

// 4. Create Payment Intent
// POST /api/funnel/create-payment
router.post("/create-payment", createPaymentIntent);

// 5. Verify Payment & Migrate
// POST /api/funnel/verify-payment
router.post("/verify-payment", verifyPaymentAndMigrate);

// LOCAL DEV ONLY: Handle the PUT request mimicking S3
router.put("/local-upload", handleLocalUpload);

export default router;
