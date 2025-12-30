import mongoose, { Document, Schema } from "mongoose";

export interface DeviceDocument extends Document {
  name: string;
  serial?: string;
  owner?: mongoose.Types.ObjectId;
  installer?: mongoose.Types.ObjectId;
  installationDate?: Date;
  panelSpecs?: {
    model?: string;
    capacityKw?: number;
  };
  inverterSpecs?: {
    model?: string;
    capacityKw?: number;
  };
  location?: string;
  status?: "pending" | "installed" | "inactive";
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<DeviceDocument>(
  {
    name: { type: String, required: true },
    serial: { type: String, required: false, index: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: false },
    installer: { type: Schema.Types.ObjectId, ref: "Installer", required: false },
    installationDate: { type: Date, required: false },
    panelSpecs: { type: Schema.Types.Mixed, required: false },
    inverterSpecs: { type: Schema.Types.Mixed, required: false },
    location: { type: String, required: false },
    status: { type: String, enum: ["pending", "installed", "inactive"], default: "pending" },
    metadata: { type: Schema.Types.Mixed, required: false }
  },
  { timestamps: true }
);

const Device = mongoose.models.Device || mongoose.model<DeviceDocument>("Device", deviceSchema);
export default Device;