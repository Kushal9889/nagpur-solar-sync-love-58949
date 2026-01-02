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
  };
  
  financials: {
    totalAmount: number;
    amountPaid: number;
    currency: string;
  };

  status: 'processing' | 'site_visit_scheduled' | 'completed';
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
      structureType: String
    },
    
    financials: {
      totalAmount: Number,
      amountPaid: Number,
      currency: String
    },

    status: { type: String, default: 'processing' }
  },
  { timestamps: true }
);

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
