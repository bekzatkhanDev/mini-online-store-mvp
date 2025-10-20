// features/orders/components/OrderDetails.tsx
"use client";

import type { Order } from "../models/Order";
import formatCurrency from "@/shared/utils/formatCurrency";
import formatDate from "@/shared/utils/formatDate";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
      <h2 className="text-xl font-bold mb-3">Детали заказа</h2>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold">Дата:</span> {formatDate(order.createdAt)}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold">Статус:</span> {order.status}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Товары:</h3>
        <ul className="divide-y divide-gray-200">
          {order.products.map((p) => (
            <li key={p.id} className="flex justify-between py-2">
              <span>{p.title}</span>
              <span>
                {p.quantity} × {formatCurrency(p.price)}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-right font-bold mt-4">
          Итого: {formatCurrency(order.total)}
        </div>
      </div>
    </div>
  );
}
