"use client";

import { useEffect, useState } from "react";
import CatalogGrid from "@/features/catalog/components/CatalogGrid";
import { getAllProducts } from "@/features/catalog/services/productsService";
import type { Product } from "@/shared/types/Product";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Каталог товаров</h1>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm mt-2 sm:mt-0"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">Все категории</option>
          <option value="clothes">Одежда</option>
          <option value="accessories">Аксессуары</option>
          <option value="shoes">Обувь</option>
        </select>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка товаров...</p>
      ) : (
        <CatalogGrid products={products} />
      )}
    </section>
  );
}
