import { useCartStore } from "../store/cartSlice";
import type { Product } from "@/shared/types/Product";

export function useCart() {
  const {
    items,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const addItem = (product: Product) => addToCart(product);
  const removeItem = (id: string) => removeFromCart(id);
  const clear = () => clearCart();

  return {
    items,
    total,
    addItem,
    removeItem,
    clearCart: clear,
  };
}
