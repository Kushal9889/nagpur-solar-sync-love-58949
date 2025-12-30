import express from "express";
import multer from "multer";
import path from "path";
import DocumentModel from "../models/document";
import User from "../models/user";

const router = express.Router();

// Save uploads to backend/uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (_req, file, cb) {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

/**
 * POST /documents/upload
 * form-data: file (file), owner (userId), type (string)
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const owner = req.body.owner;
    const type = req.body.type || "unknown";
    if (!req.file) return res.status(400).json({ error: "Missing file" });
    if (!owner) return res.status(400).json({ error: "Missing owner id" });

    // Save document record
    const url = `/uploads/${req.file.filename}`; // local URL path
    const doc = new DocumentModel({ owner, type, url, status: "pending" });
    await doc.save();

    // attach to user documents array (optional)
    await User.findByIdAndUpdate(owner, { $push: { documents: doc._id } }).exec();

    res.status(201).json(doc);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /documents/:id/approve
 * Body: { status: "approved" | "rejected", notes, reviewedBy }
 */
router.patch("/:id/approve", async (req, res) => {
  try {
    const id = req.params.id;
    const { status, notes, reviewedBy } = req.body || {};
    const doc = await DocumentModel.findById(id).exec();
    if (!doc) return res.status(404).json({ error: "Not found" });
    if (status) doc.status = status;
    if (notes) doc.notes = notes;
    if (reviewedBy) doc.reviewedBy = reviewedBy;
    await doc.save();
    res.json(doc);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;