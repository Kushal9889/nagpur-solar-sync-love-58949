import mongoose, { Document, Schema } from "mongoose";

export interface ReferralDocument extends Document {
  code: string;
  referrer: mongoose.Types.ObjectId;
  referred: mongoose.Types.ObjectId;
  creditAmount: number;
  createdAt: Date;
}

const referralSchema = new Schema<ReferralDocument>(
  {
    code: { type: String, required: true, index: true },
    referrer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referred: { type: Schema.Types.ObjectId, ref: "User", required: true },
    creditAmount: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Referral = mongoose.models.Referral || mongoose.model<ReferralDocument>("Referral", referralSchema);
export default Referral;