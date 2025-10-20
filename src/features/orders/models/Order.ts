// features/orders/models/Order.ts
export interface OrderProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  products: OrderProduct[];
  total: number;
  status: "pending" | "paid" | "shipped" | "completed";
  createdAt: Date;
  userId?: string;
}
