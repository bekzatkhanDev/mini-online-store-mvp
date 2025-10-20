// shared/utils/formatCurrency.ts
export default function formatCurrency(value: number): string {
  if (isNaN(value)) return "0 ₸";
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(value);
}
