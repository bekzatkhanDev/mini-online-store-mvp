// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import CatalogGrid from "@/features/catalog/components/CatalogGrid";
import WhatsAppButton from "@/shared/components/WhatsAppButton";
import { getAllProducts } from "@/features/catalog/services/productsService";
import type { Product } from "@/shared/types/Product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getAllProducts();
      setProducts(items);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="space-y-8">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">MiniStore</h1>
        <p className="text-gray-600">
          Каталог товаров для Instagram / TikTok-магазинов
        </p>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка...</p>
      ) : (
        <CatalogGrid products={products} />
      )}

      <div className="flex justify-center mt-10">
      </div>
    </section>
  );
}
