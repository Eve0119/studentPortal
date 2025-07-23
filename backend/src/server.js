import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import { connectDB } from './config/db.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Apply middleware to specific routes
app.use("/api/student", studentRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});