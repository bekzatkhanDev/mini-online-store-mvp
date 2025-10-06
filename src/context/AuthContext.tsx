// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthChanged, logout, getUserIdTokenWithClaims } from "@/services/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

type UserShape = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
};

type AuthContextShape = {
  user: UserShape | null;
  role: string | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  claims: Record<string, any> | null;
  isAdmin: boolean;
  isSeller: boolean;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserShape | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setClaims(null);
        setLoading(false);
        return;
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });

      // load role from Firestore users/{uid}
      try {
        const udoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (udoc.exists()) {
          const data = udoc.data();
          setRole(data.role || null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Failed to load user doc:", err);
        setRole(null);
      }

      // load custom claims
      try {
        const t = await getUserIdTokenWithClaims();
        setClaims(t?.claims ?? null);
      } catch (err) {
        console.warn("Failed to get token claims:", err);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // lazy imports to avoid circular deps
  const authService = require("@/src/services/auth");

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        loginWithGoogle: async () => {
          await authService.loginWithGoogle();
        },
        loginWithEmail: async (email: string, password: string) => {
          await authService.loginWithEmail(email, password);
        },
        registerWithEmail: async (email: string, password: string, displayName?: string) => {
          await authService.registerWithEmail(email, password, displayName);
        },
        logout: async () => {
          await authService.logout();
        },
        claims,
        isAdmin: !!(claims && claims.role === "admin") || role === "admin",
        isSeller: !!(claims && claims.role === "seller") || role === "seller",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
