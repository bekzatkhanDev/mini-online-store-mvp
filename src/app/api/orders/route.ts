// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import type { Order } from "@/features/orders/models/Order";

// 🔹 Получение всех заказов
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "orders"));
    const orders = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Order[];

    return NextResponse.json(orders);
  } catch (err) {
    console.error("Ошибка при получении заказов:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// 🔹 Создание нового заказа
export async function POST(req: Request) {
  try {
    const body: Omit<Order, "id" | "createdAt"> = await req.json();
    const docRef = await addDoc(collection(db, "orders"), {
      ...body,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id, ...body });
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    return NextResponse.json({ error: "Ошибка создания заказа" }, { status: 400 });
  }
}
