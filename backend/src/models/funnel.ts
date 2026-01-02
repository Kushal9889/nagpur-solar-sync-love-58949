import mongoose, { Document, Schema } from "mongoose";

// ==========================================
// TIER 1: THE MARKETING TRAP (High Velocity)
// ==========================================
// Purpose: Captures Zip + Phone immediately. 
// strictly separated from the User profile to avoid pollution.

export interface MarketingLeadDocument extends Document {
  phone: string;
  pincode: string;
  source?: string; // e.g., 'facebook', 'direct'
  status: 'new' | 'viewed_plans' | 'checkout_started' | 'converted';
  lastActiveAt: Date;
}

const MarketingLeadSchema = new Schema<MarketingLeadDocument>(
  {
    phone: { type: String, required: true, index: true }, // Fast lookups
    pincode: { type: String, required: true },
    source: { type: String, default: 'direct' },
    status: { 
      type: String, 
      enum: ['new', 'viewed_plans', 'checkout_started', 'converted'], 
      default: 'new' 
    },
    lastActiveAt: { type: Date, default: Date.now }
  },
  { 
    timestamps: true,
    collection: 'marketing_leads' // Explicit collection name
  }
);

// ==========================================
// TIER 2: THE GHOST PIPELINE (Composite Logic)
// ==========================================
// ELITE STRATEGY: We separate the "Power System" cost from the "Structure" cost.
// This allows dynamic pricing without hardcoding rigid plans.

export interface OrderSessionDocument extends Document {
  sessionId: string;
  linkedLeadId?: mongoose.Types.ObjectId;
  
  // THE COMPOSITE SELECTION STATE
  selection: {
    // FACTOR 1: The Power Plan (from Image 2)
    systemType: 'basic_4kw' | 'standard_8kw' | 'premium_12kw' | null;
    basePrice: number; 

    // FACTOR 2: The Structure (from Image 3)
    structureType: 'standard_roof' | 'elevated' | 'high_rise' | null;
    structureSurcharge: number; // The extra cost for the structure

    // FACTOR 3: User Segment
    customerType: 'residential' | 'commercial';
  };

  // AUTOMATICALLY CALCULATED QUOTE
  finalQuote: {
    totalSystemCost: number; // Base + Structure
    gstAmount: number;       // e.g., 18% or relevant tax
    finalTotal: number;      // Grand total
    monthlyEMI: number;      // Estimated monthly payment
    currency: string;
  };

  uploadedDocs: {
    docType: string;
    s3Key: string;
    uploadedAt: Date;
  }[];
  
  // Add documents map for easier access
  documents?: { [key: string]: string };

  stepCompleted: number;
  expiresAt: Date;
}

const OrderSessionSchema = new Schema<OrderSessionDocument>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    linkedLeadId: { type: Schema.Types.ObjectId, ref: 'MarketingLead' },
    
    selection: {
      systemType: { 
        type: String, 
        enum: ['basic_4kw', 'standard_8kw', 'premium_12kw', null],
        default: null
      },
      basePrice: { type: Number, default: 0 },
      
      structureType: { 
        type: String, 
        enum: ['standard_roof', 'elevated', 'high_rise', null],
        default: 'standard_roof' 
      },
      structureSurcharge: { type: Number, default: 0 },
      
      customerType: { 
        type: String, 
        enum: ['residential', 'commercial'], 
        default: 'residential' 
      }
    },

    finalQuote: {
      totalSystemCost: { type: Number, default: 0 },
      gstAmount: { type: Number, default: 0 },
      finalTotal: { type: Number, default: 0 },
      monthlyEMI: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' }
    },

    uploadedDocs: [{
      docType: String,
      s3Key: String,
      uploadedAt: { type: Date, default: Date.now }
    }],
    
    documents: { type: Map, of: String },

    stepCompleted: { type: Number, default: 0 },
    expiresAt: { type: Date, default: Date.now, index: { expires: '24h' } }
  },
  { timestamps: true, collection: 'order_sessions' }
);

// ==========================================
// TIER 3: THE VAULT (The Real User)
// ==========================================
// We are upgrading your existing User Interface to be stricter.

export interface EliteUserDocument extends Document {
  authId: string; // The OAuth Provider ID (e.g., "auth0|12345")
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    verified: boolean;
  };
  role: 'customer' | 'admin' | 'installer';
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: { lat: number; lng: number };
  };
  subscription?: {
    status: 'active' | 'past_due' | 'none';
    planId?: mongoose.Types.ObjectId;
  };
}

const EliteUserSchema = new Schema<EliteUserDocument>(
  {
    authId: { type: String, required: true, unique: true, index: true }, // The Primary Key for Auth
    email: { type: String, required: true, unique: true },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      phone: { type: String },
      verified: { type: Boolean, default: false }
    },
    role: { type: String, enum: ['customer', 'admin', 'installer'], default: 'customer' },
    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: { lat: Number, lng: Number }
    },
    subscription: {
      status: { type: String, enum: ['active', 'past_due', 'none'], default: 'none' },
      planId: { type: Schema.Types.ObjectId, ref: 'Plan' }
    }
  },
  { timestamps: true, collection: 'users' }
);

// ==========================================
// EXPORTS
// ==========================================

export const MarketingLead = mongoose.models.MarketingLead || mongoose.model<MarketingLeadDocument>("MarketingLead", MarketingLeadSchema);
export const OrderSession = mongoose.models.OrderSession || mongoose.model<OrderSessionDocument>("OrderSession", OrderSessionSchema);
export const User = mongoose.models.User || mongoose.model<EliteUserDocument>("User", EliteUserSchema);