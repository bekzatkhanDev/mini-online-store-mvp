"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/features/catalog/services/productsService";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "@/shared/types/Product";
import formatCurrency from "@/shared/utils/formatCurrency";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Загрузка...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-red-500">Товар не найден</p>;
  }

  return (
    <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="rounded-2xl shadow-md object-cover w-full"
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold">
          {formatCurrency(product.price)}
        </p>

        <button
          onClick={() => addItem(product)}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Добавить в корзину
        </button>
      </div>
    </section>
  );
}
