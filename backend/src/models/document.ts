import mongoose, { Document, Schema } from "mongoose";

export interface DocumentDocument extends Document {
  owner: mongoose.Types.ObjectId;
  type: string;
  url: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

const documentSchema = new Schema<DocumentDocument>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    notes: { type: String, required: false },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User", required: false }
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: "updatedAt" } }
);

const DocumentModel = mongoose.models.Document || mongoose.model<DocumentDocument>("Document", documentSchema);
export default DocumentModel;