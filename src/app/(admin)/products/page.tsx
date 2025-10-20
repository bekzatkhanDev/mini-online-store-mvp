"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/features/catalog/services/productsService";
import ProductForm from "@/features/catalog/components/ProductForm";
import ProductCard from "@/features/catalog/components/ProductCard";
import type { Product } from "@/shared/types/Product";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const items = await getAllProducts();
      setProducts(items);
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p>Загрузка товаров...</p>;

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">Управление товарами</h1>

      <ProductForm onProductAdded={(newProduct) => setProducts([...products, newProduct])} />

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button
              onClick={() => handleDelete(product.id)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
