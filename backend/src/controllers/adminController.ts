import { Request, Response } from "express";
import { Order } from "../models/order";
import { MarketingLead } from "../models/funnel";
import User from "../models/user";

// ==========================================
// 1. THE EXECUTIVE SUMMARY (Stats)
// ==========================================
// Route: GET /api/admin/stats
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    // Parallel Execution for Speed
    const [totalRevenue, totalOrders, totalLeads, totalUsers] = await Promise.all([
      // A. Calculate Total Revenue
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$financials.amountPaid" } } }
      ]),
      // B. Count Orders
      Order.countDocuments(),
      // C. Count Leads
      MarketingLead.countDocuments(),
      // D. Count Registered Users
      User.countDocuments()
    ]);

    // Get Recent 5 Orders (For the Feed)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'email name');

    return res.status(200).json({
      success: true,
      stats: {
        revenue: totalRevenue[0]?.total || 0,
        orders: totalOrders,
        leads: totalLeads,
        users: totalUsers
      },
      recentOrders
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    return res.status(500).json({ error: "Failed to fetch dashboard intelligence." });
  }
};

// ==========================================
// 2. THE LEAD LIST (Marketing Data)
// ==========================================
// Route: GET /api/admin/leads
export const getMarketingLeads = async (req: Request, res: Response) => {
  try {
    const leads = await MarketingLead.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({ success: true, leads });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch leads." });
  }
};

// ==========================================
// 3. ORDER DETAILS
// ==========================================
// Route: GET /api/admin/orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('userId', 'email name phone');
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch orders." });
  }
};

// ==========================================
// 4. UPDATE ORDER STATUS
// ==========================================
// Route: PATCH /api/admin/orders/:orderId/status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['processing', 'site_visit_scheduled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update order status." });
  }
};
