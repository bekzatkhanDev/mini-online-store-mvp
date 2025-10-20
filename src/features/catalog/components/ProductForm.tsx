// src/features/catalog/components/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct } from "../services/productsService";
import type { Product } from "@/shared/types/Product";

interface ProductFormProps {
  onProductAdded?: (newProduct: Product) => void;
}

export default function ProductForm({ onProductAdded }: ProductFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    categories: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🔹 Добавляем товар в Firestore
      const newProduct = await createProduct({
        title: form.title,
        description: form.description,
        price: form.price,
        imageUrl: form.imageUrl,
        categories: form.categories,
      });

      // 🔹 Оповещаем родительский компонент (если нужно)
      onProductAdded?.(newProduct);

      // 🔹 Сброс формы
      setForm({
        title: "",
        description: "",
        price: 0,
        imageUrl: "",
        categories: [],
      });
    } catch (err) {
      console.error("Ошибка при добавлении товара:", err);
      setError("Не удалось добавить товар. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg shadow-sm border"
    >
      <h2 className="text-lg font-semibold">Добавить товар</h2>

      <input
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Цена"
        value={form.price}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        name="imageUrl"
        placeholder="URL изображения"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "Добавление..." : "Добавить товар"}
      </button>
    </form>
  );
}
