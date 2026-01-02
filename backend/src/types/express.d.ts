import { EliteUserDocument } from "../models/funnel";

// We extend the global Express Request namespace.
// This tells TypeScript: "Every authenticated request MUST have a user."

declare global {
  namespace Express {
    interface Request {
      user?: {
        authId: string; // The ID from Google/Auth0
        email?: string;
        mongoId?: string; // The _id from OUR database
        role: 'customer' | 'admin' | 'installer';
      };
      // We also allow passing the full database document if needed for heavy operations
      fullUser?: EliteUserDocument; 
    }
  }
}
