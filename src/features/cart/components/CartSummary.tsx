// features/cart/components/CartSummary.tsx
"use client";

import { useCart } from "../hooks/useCart";
import formatCurrency from "@/shared/utils/formatCurrency";
import WhatsAppButton from "@/shared/components/WhatsAppButton";

export default function CartSummary() {
  const { items, total, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        Корзина пуста 🛒
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-gray-200 border rounded-xl bg-white shadow-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center px-4 py-3"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(item.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>{item.quantity}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center border-t pt-3">
        <span className="font-semibold">Итого:</span>
        <span className="text-lg font-bold">{formatCurrency(total)}</span>
      </div>

      <div className="flex justify-between">
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Очистить корзину
        </button>

        <WhatsAppButton items={items} total={total} />
      </div>
    </div>
  );
}
