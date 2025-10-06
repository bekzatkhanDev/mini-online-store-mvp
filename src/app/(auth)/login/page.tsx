// src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { loginWithEmail, loginWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, pass);
      router.push("/"); // redirect after login
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Вход</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Пароль" type="password" className="w-full p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white">Войти</button>
        <button
          type="button"
          onClick={async () => {
            try {
              await loginWithGoogle();
              router.push("/");
            } catch (err: any) {
              setError(err.message || "Ошибка Google входа");
            }
          }}
          className="w-full p-2 border mt-2"
        >
          Войти с Google
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </main>
  );
}
