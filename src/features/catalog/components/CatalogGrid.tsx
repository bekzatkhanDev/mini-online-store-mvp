// features/catalog/components/CatalogGrid.tsx
"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/shared/types/Product";

interface CatalogGridProps {
  products: Product[];
}

export default function CatalogGrid({ products }: CatalogGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-600">Нет товаров для отображения</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
