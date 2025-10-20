// shared/components/EmptyState.tsx
"use client";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = "Нет данных",
  description = "Здесь пока ничего нет",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 text-gray-600">
      <div className="text-5xl mb-2">📦</div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
