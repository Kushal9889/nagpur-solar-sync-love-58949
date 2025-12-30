import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import devicesRouter from "./routes/devices";
import subscriptionsRouter from "./routes/subscriptions";
import paymentsRouter from "./routes/payments";
import usersRouter from "./routes/users";
import installersRouter from "./routes/installers";
import documentsRouter from "./routes/documents";

import { connectToMongo } from "./db/mongo";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files in development from backend/uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = process.env.PORT || 3000;

// Mount API routes
app.use("/devices", devicesRouter);
app.use("/subscriptions", subscriptionsRouter);
app.use("/payments", paymentsRouter);
app.use("/users", usersRouter);
app.use("/installers", installersRouter);
app.use("/documents", documentsRouter);

async function start() {
  const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/solarbuddy";
  try {
    await connectToMongo(mongoUrl);
    console.log("Connected to MongoDB:", mongoUrl);
  } catch (err) {
    console.warn("Failed to connect to MongoDB, starting server anyway:", err);
  }

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

start();