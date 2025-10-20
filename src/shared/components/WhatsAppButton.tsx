// src/shared/components/WhatsAppButton.tsx
"use client";

import React, { useMemo } from "react";
import type { Product, CartItem} from "@/shared/types/Product";


interface WhatsAppButtonProps {
  product?: Product;
  items?: CartItem[];
  total?: number;
  className?: string;
  phoneNumber?: string;
  children?: React.ReactNode;
}

export default function WhatsAppButton({
  product,
  items,
  total,
  className,
  phoneNumber = "77788152803",
  children,
}: WhatsAppButtonProps) {
  const message = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    if (product) {
      return encodeURIComponent(
        `Здравствуйте! 👋 Я хочу купить товар:
📦 *${product.title}*
💰 Цена: ${product.price} ₸
Ссылка на товар: ${origin}/product/${product.id}`
      );
    }

    if (items && items.length > 0) {
      const list = items
        .map((item) => `${item.quantity} × ${item.title} — ${item.price} ₸`)
        .join("\n");
      return encodeURIComponent(
        `Здравствуйте! 👋 Я хочу купить следующие товары:\n${list}\n\nИтого: ${total} ₸`
      );
    }

    return encodeURIComponent("Здравствуйте! 👋 Я хочу купить товар.");
  }, [product, items, total]);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || "Купить в WhatsApp"}
    </a>
  );
}
