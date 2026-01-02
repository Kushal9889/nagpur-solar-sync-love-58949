import { Router } from "express";
import { getAdminStats, getMarketingLeads, getAllOrders, updateOrderStatus } from "../controllers/adminController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

// 🔒 THE WALL: All routes here require "Admin" status
router.use(authenticate, requireRole(['admin']));

// 1. Dashboard Metrics
router.get("/stats", getAdminStats);

// 2. Lead Data (For the Sales Team)
router.get("/leads", getMarketingLeads);

// 3. All Orders
router.get("/orders", getAllOrders);

// 4. Update Order Status
router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
