// features/auth/utils/setCustomClaims.ts
import * as admin from "firebase-admin";

// Убедись, что Firebase Admin SDK инициализирован
if (!admin.apps.length) {
  admin.initializeApp();
}

export const setCustomClaims = async (uid: string, role: "admin" | "user") => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`✅ Custom claims set for user ${uid}: role=${role}`);
  } catch (error) {
    console.error("❌ Error setting custom claims:", error);
    throw error;
  }
};