import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name?: string;
  email: string;
  phone?: string;
  role?: "customer" | "installer" | "admin";
  address?: {
    line1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  referralCode: string;
  credits: number;
  documents?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema(
  {
    line1: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false }
  },
  { _id: false }
);

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ["customer", "installer", "admin"], default: "customer" },
    address: { type: addressSchema, required: false },
    referralCode: { type: String, required: true, unique: true },
    credits: { type: Number, default: 0 },
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }]
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default User;