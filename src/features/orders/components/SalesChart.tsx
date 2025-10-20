// features/orders/components/SalesChart.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "../services/ordersService";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import formatDate from "@/shared/utils/formatDate";

interface ChartData {
  date: string;
  total: number;
}

export default function SalesChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const load = async () => {
      const orders = await getAllOrders();
      const grouped: Record<string, number> = {};

      orders.forEach((o) => {
        const date = formatDate(o.createdAt);
        grouped[date] = (grouped[date] || 0) + o.total;
      });

      const chartData = Object.entries(grouped).map(([date, total]) => ({
        date,
        total,
      }));

      setData(chartData);
    };
    load();
  }, []);

  if (data.length === 0) {
    return <p className="text-gray-500">Недостаточно данных для графика</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-3">График продаж</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
