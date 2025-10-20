// shared/components/Loader.tsx
"use client";

export default function Loader({ text = "Загрузка..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin mb-3"></div>
      <p>{text}</p>
    </div>
  );
}
