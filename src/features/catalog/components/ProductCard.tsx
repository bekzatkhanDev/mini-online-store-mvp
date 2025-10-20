"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "@/shared/types/Product";
import WhatsAppButton from "@/shared/components/WhatsAppButton";
import { useCartStore } from "@/features/cart/store/cartSlice"; // путь к твоему Zustand store

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state: { addToCart: any; }) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between transition hover:shadow-md">
      {/* 🖼️ Изображение */}
      <div className="relative w-full h-56 mb-3">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 h-full rounded-lg text-gray-400 text-sm">
            Нет изображения
          </div>
        )}
      </div>

      {/* 📦 Информация */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description || "Описание отсутствует"}
        </p>
        <p className="text-indigo-600 font-bold text-lg mb-4">
          {product.price.toLocaleString()} ₸
        </p>
      </div>

      {/* 🛒 Кнопки */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          🛒 В корзину
        </button>

        <WhatsAppButton
          product={product}
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-center"
        >
          💬 Купить
        </WhatsAppButton>
      </div>
    </div>
  );
}
