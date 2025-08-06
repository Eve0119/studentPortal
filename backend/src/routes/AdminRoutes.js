import express from "express";
import { adminAuth } from "../config/firebase-admin.js";
import { verifyToken } from "../config/authMiddleware.js";

const router = express.Router();

router.post("/set-admin", verifyToken, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
}, async (req, res) => {
  const { uid } = req.body;
  try {
    await adminAuth.setCustomUserClaims(uid, { role: "admin" });
    res.json({ success: true, message: "User is now admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;