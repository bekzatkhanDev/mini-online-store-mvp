"use client";

import OrdersList from "@/features/orders/components/OrdersList";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/features/orders/services/ordersService";
import type { Order } from "@/features/orders/models/Order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Загрузка заказов...</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Заказы</h1>
      <OrdersList orders={orders} />
    </section>
  );
}
