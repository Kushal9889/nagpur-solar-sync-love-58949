import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  authId?: string; // [NEW] Needed for the Unique Index
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
  planDetails?: {
    capacity?: string;
    category?: string;
    plantType?: string;
  };
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
    authId: { type: String, unique: true, sparse: true }, // [NEW] Handle the index
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ["customer", "installer", "admin"], default: "customer" },
    address: { type: addressSchema, required: false },
    referralCode: { type: String, required: true, unique: true },
    credits: { type: Number, default: 0 },
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    planDetails: {
      capacity: { type: String },
      category: { type: String },
      plantType: { type: String }
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default User;