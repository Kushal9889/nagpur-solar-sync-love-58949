import express from "express";
import { getPlans, createPlan, createSubscription, getUserSubscriptions } from "../controllers/subscriptionController";

const router = express.Router();

/**
 * GET /subscriptions/plans
 */
router.get("/plans", getPlans);

/**
 * POST /subscriptions/plans
 */
router.post("/plans", createPlan);

/**
 * POST /subscriptions/create
 */
router.post("/create", createSubscription);

/**
 * GET /subscriptions/user/:userId
 */
router.get("/user/:userId", getUserSubscriptions);

export default router;