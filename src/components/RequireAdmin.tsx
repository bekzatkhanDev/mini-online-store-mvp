// src/components/RequireAdmin.tsx
"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/"); // redirect not allowed
    }
  }, [loading, isAdmin, router]);

  if (loading) return <div>Загрузка...</div>;
  if (!isAdmin) return null;
  return <>{children}</>;
};
