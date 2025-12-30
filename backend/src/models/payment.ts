import mongoose, { Document, Schema } from "mongoose";

export interface PaymentDocument extends Document {
  user: mongoose.Types.ObjectId;
  subscription?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  method: string;
  stripeSessionId?: string;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription", required: false },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    method: { type: String, required: true },
    stripeSessionId: { type: String, required: false },
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" }
  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model<PaymentDocument>("Payment", paymentSchema);
export default Payment;