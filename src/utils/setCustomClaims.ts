// scripts/setCustomClaims.ts (node script)
// запустить: node -r ts-node/register scripts/setCustomClaims.ts <uid> <role>
import admin from "firebase-admin";
import fs from "fs";
const [,, uid, role] = process.argv;
if (!uid || !role) {
  console.error("Usage: node setCustomClaims.js <uid> <role>");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

(async () => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Set role=${role} for uid=${uid}`);
    // optional: also write to users/{uid} doc so front-end can read role quickly
    const db = admin.firestore();
    await db.doc(`users/${uid}`).set({ role }, { merge: true });
    console.log("Updated users doc.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
