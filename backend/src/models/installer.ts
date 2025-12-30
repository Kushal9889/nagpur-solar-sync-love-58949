import mongoose, { Document, Schema } from "mongoose";

export interface InstallerDocument extends Document {
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  certified?: boolean;
  certificates?: mongoose.Types.ObjectId[];
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const installerSchema = new Schema<InstallerDocument>(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    certified: { type: Boolean, default: false },
    certificates: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    rating: { type: Number, required: false }
  },
  { timestamps: true }
);

const Installer = mongoose.models.Installer || mongoose.model<InstallerDocument>("Installer", installerSchema);
export default Installer;