// src/app/admin/page.tsx
import { RequireAdmin } from "@/components/RequireAdmin";

export default function AdminPage() {
  return (
    <RequireAdmin>
      <main className="p-6">
        <h1>Админ-панель</h1>
        {/* CRUD UI */}
      </main>
    </RequireAdmin>
  );
}
