// app/(admin)/layout.tsx
"use client";

import Link from "next/link";
import  RequireAdmin  from "@/features/admin/components/RequireAdmin";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/dashboard", label: "Аналитика" },
  { href: "/products", label: "Товары" },
  { href: "/orders", label: "Заказы" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <RequireAdmin>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        <aside className="md:w-64 bg-white border-r shadow-sm">
          <h2 className="text-xl font-bold p-4">MiniStore Admin</h2>
          <nav className="flex flex-col space-y-1 p-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition",
                  pathname === href
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </RequireAdmin>
  );
}
