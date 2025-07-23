import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY ;

const serviceAccount = JSON.parse(
  readFileSync(new URL(serviceAccountPath, import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

export const adminAuth = getAuth();