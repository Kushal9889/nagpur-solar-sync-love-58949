import express from "express";
import Installer from "../models/installer";
const router = express.Router();

/**
 * POST /installers
 */
router.post("/", async (req, res) => {
  try {
    const { name, companyName, email, phone, certified } = req.body || {};
    if (!name) return res.status(400).json({ error: "Missing name" });
    const inst = new Installer({ name, companyName, email, phone, certified: !!certified });
    await inst.save();
    res.status(201).json(inst);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /installers
 */
router.get("/", async (req, res) => {
  try {
    const list = await Installer.find().limit(200).exec();
    res.json(list);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;