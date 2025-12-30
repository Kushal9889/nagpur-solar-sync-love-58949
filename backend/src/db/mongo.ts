import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};