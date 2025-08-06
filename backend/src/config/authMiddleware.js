import { adminAuth } from "../config/firebase-admin.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const checkPermission = (req, res, next) => {
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
    console.log("user role is: ", req.user.role);
    return res.status(403).json({ error: "Forbidden: Admin or Teacher access required" });
  }
  next();
};