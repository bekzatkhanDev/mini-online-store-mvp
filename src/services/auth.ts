// src/services/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  getIdTokenResult,
} from "firebase/auth";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function registerWithEmail(email: string, password: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // optionally set displayName on the Firebase user
  if (displayName) await updateProfile(user, { displayName });

  // create user doc in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: user.displayName || null,
    role: "seller", // default role for store owners — меняй по необходимости
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function loginWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function loginWithGoogle() {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;

  // create user doc if not exists
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || null,
      role: "seller",
      createdAt: serverTimestamp(),
    });
  }

  return user;
}

export async function logout() {
  await signOut(auth);
}

export function onAuthChanged(cb: (user: any) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function getUserIdTokenWithClaims() {
  const current = auth.currentUser;
  if (!current) return null;
  const tokenResult = await getIdTokenResult(current, /* forceRefresh */ true);
  return {
    token: tokenResult.token,
    claims: tokenResult.claims,
  };
}
