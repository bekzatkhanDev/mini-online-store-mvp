// shared/types/Product.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  categories: string[];
  imageUrl: string;
  isNew?: boolean;
  isTop?: boolean;
  createdAt?: Date;
}
export interface CartItem extends Product {
  quantity: number;
}