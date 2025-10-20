// features/orders/services/ordersService.ts
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import type { Order } from "../models/Order";

const ordersRef = collection(db, "orders");

// Получить все заказы
export const getAllOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(query(ordersRef, orderBy("createdAt", "desc")));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

// Получить заказ по ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  const ref = doc(db, "orders", id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Order) : null;
};

// Создать заказ
export const createOrder = async (order: Omit<Order, "id" | "createdAt">) => {
  const docRef = await addDoc(ordersRef, {
    ...order,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// Получить сводку для Dashboard
export const getOrdersStats = async () => {
  const orders = await getAllOrders();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgCheck = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  return { totalOrders, totalRevenue, avgCheck };
};
