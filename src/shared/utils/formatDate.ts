// shared/utils/formatDate.ts
export default function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "—";

  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
