import { create } from "zustand";
import type { Product } from "@/shared/types/Product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addToCart: (product) => {
    const existing = get().items.find((item) => item.id === product.id);
    let updatedItems;

    if (existing) {
      updatedItems = get().items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...get().items, { ...product, quantity: 1 }];
    }

    const total = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    set({ items: updatedItems, total });
  },

  removeFromCart: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    const total = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ items: updatedItems, total });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
