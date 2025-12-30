import express from "express";
import Device from "../models/device";

const router = express.Router();

// GET /devices
router.get("/", async (req, res) => {
  try {
    const devices = await Device.find().sort({ createdAt: -1 });
    res.json(devices);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /devices
router.post("/", async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.status(201).json(device);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /devices/:id
router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });
    res.json(device);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
