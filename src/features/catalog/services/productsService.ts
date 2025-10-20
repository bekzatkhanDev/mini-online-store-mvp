import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import type { Product } from "@/shared/types/Product";

const productsRef = collection(db, "products");

// 🔹 Получение всех товаров (если нужно SSR)
export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// 🔹 Добавление нового товара
export const createProduct = async (product: Omit<Product, "id" | "createdAt">) => {
  const docRef = await addDoc(productsRef, {
    ...product,
    createdAt: Timestamp.now(),
  });
  return { id: docRef.id, ...product };
};

// 🔹 Получение конкретного товара
export const getProductById = async (id: string): Promise<Product | null> => {
  const docSnap = await getDoc(doc(db, "products", id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Product;
};

// 🔹 Обновление товара
export const updateProduct = async (id: string, data: Partial<Product>) => {
  await updateDoc(doc(db, "products", id), data);
};

// 🔹 Удаление товара
export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};
