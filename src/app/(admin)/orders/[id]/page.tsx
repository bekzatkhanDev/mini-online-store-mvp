"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/features/orders/services/ordersService";
import type { Order } from "@/features/orders/models/Order";
import formatCurrency from "@/shared/utils/formatCurrency";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    getOrderById(id).then(setOrder);
  }, [id]);

  if (!order) return <p>Загрузка заказа...</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Заказ #{order.id}</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-2">Состав заказа</h2>
        <ul className="divide-y divide-gray-200">
          {order.products.map((p) => (
            <li key={p.id} className="py-2 flex justify-between">
              <span>{p.title}</span>
              <span>
                {p.quantity} * {formatCurrency(p.price)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-right font-semibold">
          Итого: {formatCurrency(order.total)}
        </div>
      </div>

      <p className="text-gray-600">Статус: {order.status}</p>
    </section>
  );
}
