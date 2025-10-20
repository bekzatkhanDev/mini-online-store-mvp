// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Product } from "@/shared/types/Product";

// 🔹 Получение всех товаров
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Product[];

    return NextResponse.json(products);
  } catch (err) {
    console.error("Ошибка при получении товаров:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// 🔹 Добавление нового товара
export async function POST(req: Request) {
  try {
    const body: Product = await req.json();
    const docRef = await addDoc(collection(db, "products"), {
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ ...body, id: docRef.id });
  } catch (err) {
    console.error("Ошибка при добавлении товара:", err);
    return NextResponse.json({ error: "Ошибка при добавлении" }, { status: 400 });
  }
}

// 🔹 Обновление товара
export async function PUT(req: Request) {
  try {
    const { id, ...update } = await req.json();
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, update);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Ошибка при обновлении товара:", err);
    return NextResponse.json({ error: "Ошибка при обновлении" }, { status: 400 });
  }
}

// 🔹 Удаление товара
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await deleteDoc(doc(db, "products", id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Ошибка при удалении товара:", err);
    return NextResponse.json({ error: "Ошибка при удалении" }, { status: 400 });
  }
}
