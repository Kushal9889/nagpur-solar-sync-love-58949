import mongoose, { Document, Schema } from "mongoose";

export interface SubscriptionDocument extends Document {
  user: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  status: "active" | "past_due" | "canceled" | "trialing";
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    status: { type: String, enum: ["active", "past_due", "canceled", "trialing"], default: "active" },
    stripeSubscriptionId: { type: String, required: false },
    currentPeriodStart: { type: Date, required: false },
    currentPeriodEnd: { type: Date, required: false },
  },
  { timestamps: true }
);

const Subscription = mongoose.models.Subscription || mongoose.model<SubscriptionDocument>("Subscription", subscriptionSchema);
export default Subscription;