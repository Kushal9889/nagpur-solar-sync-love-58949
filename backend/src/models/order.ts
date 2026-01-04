import mongoose, { Document, Schema } from "mongoose";

export interface OrderDocument extends Document {
  orderId: string; // Unique Public ID (e.g., ORD-2025-001)
  userId: mongoose.Types.ObjectId; // Link to the User
  stripePaymentId: string; // The Transaction ID
  
  // The Data we saved from the Session
  systemDetails: {
    systemType: string;
    kwSize: number;
    structureType: string;
    // [NEW] Hardware is mandatory for installation
    hardware: {
      panelTechnology: string;
      panelBrand: string;
      inverterBrand: string;
    }
  };
  
  // [UPGRADED] Detailed Financial Breakdown
  financials: {
    basePrice: number;        // The plan cost
    structureSurcharge: number; // The elevated/high-rise cost
    gstAmount: number;        // Tax
    totalAmount: number;      // Grand Total
    amountPaid: number;
    currency: string;
  };

  status: 'processing' | 'site_visit_scheduled' | 'installation_pending' | 'completed';
  createdAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stripePaymentId: { type: String, required: true },
    
    systemDetails: {
      systemType: String,
      kwSize: Number,
      structureType: String,
      // [NEW] Saving the choices
      hardware: {
        panelTechnology: String,
        panelBrand: String,
        inverterBrand: String
      }
    },
    
    // [UPGRADED] Storing the breakdown
    financials: {
      basePrice: { type: Number, required: true },
      structureSurcharge: { type: Number, default: 0 },
      gstAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      amountPaid: { type: Number, required: true },
      currency: { type: String, default: 'USD' }
    },

    status: { type: String, default: 'processing' }
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);
