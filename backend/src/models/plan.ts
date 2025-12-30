import mongoose, { Document, Schema } from "mongoose";

export interface PlanDocument extends Document {
  name: string;
  price: number;
  interval: "month" | "year";
  stripeProductId?: string;
  stripePriceId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<PlanDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    interval: { type: String, enum: ["month", "year"], default: "month" },
    stripeProductId: { type: String, required: false },
    stripePriceId: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model<PlanDocument>("Plan", planSchema);
export default Plan;