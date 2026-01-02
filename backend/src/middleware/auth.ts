import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/funnel"; // Importing the "Vault" model we made in Step 1

// CONFIG: You will need this in your .env file
// JWT_SECRET=your_super_secret_key_change_this

interface JwtPayload {
  sub: string; // "Subject" (The Auth ID)
  email: string;
  role?: string;
}

/**
 * 🛡️ ELITE FIREWALL: authenticate
 * Validates the Bearer Token.
 * If valid, it attaches the User Identity to the Request.
 * If invalid, it blocks the request immediately.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if the "Passport" exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       return res.status(401).json({ 
        success: false, 
        error: "Unauthorized: No token provided." 
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify the Signature (Is this a fake passport?)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // 3. Attach Identity to Request (Lightweight)
    // We do NOT query the DB here for speed, unless absolutely necessary.
    // We trust the token's claims for basic access.
    req.user = {
      authId: decoded.sub,
      email: decoded.email,
      role: (decoded.role as any) || 'customer'
    };

    next(); // Pass to the next layer
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      error: "Forbidden: Invalid or expired token." 
    });
  }
};

/**
 * 👮‍♀️ ELITE GUARD: requireRole
 * A higher-order function to lock down routes by role.
 * Usage: router.post('/admin/delete', authenticate, requireRole(['admin']), ...)
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "Access Denied: Insufficient permissions."
      });
    }
    next();
  };
};

/**
 * 🕵️‍♂️ ELITE SYNC: attachFullProfile
 * OPTIONAL: Use this ONLY when you need the full User Document (e.g., for updating profile).
 * It performs a Database Lookup (slower but thorough).
 */
export const attachFullProfile = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.authId) {
     return res.status(401).json({ error: "Authentication required before profile sync." });
  }

  try {
    // Try to find the user in "The Vault"
    let user = await User.findOne({ authId: req.user.authId });

    // If this is their first login, we might need to Auto-Create them (Strategy Pattern)
    if (!user) {
      // In a strict system, we might error here. 
      // But for a smooth UX, we often auto-provision the user.
      user = await User.create({
        authId: req.user.authId,
        email: req.user.email,
        role: 'customer',
        profile: { verified: false }
      });
    }

    req.fullUser = user; // Attach the Mongoose Document
    req.user.mongoId = user._id.toString(); // Update the lightweight ID
    
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error during Profile Sync" });
  }
};
