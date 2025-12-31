import mongoose, { Document, Schema } from "mongoose";

export interface PaymentDocument extends Document {
  userId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    amount: { type: Number, required: true },
    currency: { type: String, default: "inr" },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    stripeSessionId: { type: String, required: true },
    stripePaymentIntentId: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

// Prevent model overwrite error if compiled multiple times
const Payment = mongoose.models.Payment || mongoose.model<PaymentDocument>("Payment", paymentSchema);
export default Payment;