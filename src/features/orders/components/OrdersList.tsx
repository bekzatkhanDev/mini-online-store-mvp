// features/orders/components/OrdersList.tsx
"use client";

import Link from "next/link";
import type { Order } from "../models/Order";
import formatCurrency from "@/shared/utils/formatCurrency";
import formatDate from "@/shared/utils/formatDate";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return <p className="text-center text-gray-600">Заказов пока нет</p>;
  }

  return (
    <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
      <thead className="bg-gray-100 text-sm text-gray-600">
        <tr>
          <th className="py-2 px-4 text-left">ID</th>
          <th className="py-2 px-4 text-left">Дата</th>
          <th className="py-2 px-4 text-left">Сумма</th>
          <th className="py-2 px-4 text-left">Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            className="border-t hover:bg-gray-50 transition cursor-pointer"
          >
            <td className="py-2 px-4">
              <Link
                href={`/admin/orders/${order.id}`}
                className="text-indigo-600 hover:underline"
              >
                {order.id.slice(0, 6)}...
              </Link>
            </td>
            <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
            <td className="py-2 px-4">{formatCurrency(order.total)}</td>
            <td className="py-2 px-4 capitalize">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
