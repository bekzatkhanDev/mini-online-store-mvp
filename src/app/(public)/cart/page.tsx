"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import WhatsAppButton from "@/shared/components/WhatsAppButton";
import formatCurrency from "@/shared/utils/formatCurrency";

export default function CartPage() {
  const { items, total, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return <p className="text-center text-gray-600 mt-20">Корзина пуста 🛍️</p>;
  }

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Ваша корзина</h1>

      <ul className="divide-y divide-gray-200 border rounded-lg">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.quantity} × {formatCurrency(item.price)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          Итого: {formatCurrency(total)}
        </p>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Очистить корзину
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <WhatsAppButton items={items} total={total} />
      </div>
    </section>
  );
}
