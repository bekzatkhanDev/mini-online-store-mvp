"use client";

import { useEffect, useState } from "react";
import { getOrdersStats } from "@/features/orders/services/ordersService";
import SalesChart from "@/features/orders/components/SalesChart";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  avgCheck: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getOrdersStats();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) return <p>Загрузка аналитики...</p>;

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">Аналитика продаж</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Заказы" value={stats?.totalOrders ?? 0} />
        <StatCard
          title="Выручка"
          value={`${stats?.totalRevenue.toFixed(0)} ₸`}
        />
        <StatCard
          title="Средний чек"
          value={`${stats?.avgCheck.toFixed(0)} ₸`}
        />
      </div>

      <SalesChart />
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
