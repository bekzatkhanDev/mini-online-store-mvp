// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export const metadata: Metadata = {
  title: "MiniStore — Онлайн-магазин",
  description: "Мини-онлайн магазин для малого бизнеса в Казахстане",
  keywords: ["онлайн-магазин", "каталог", "WhatsApp", "mini-store", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthProvider>
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
