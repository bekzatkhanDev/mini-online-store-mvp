// shared/utils/constants.ts
export const WHATSAPP_PHONE = "77001234567"; // номер магазина без "+"
export const APP_NAME = "MiniStore";
export const DEFAULT_CURRENCY = "₸";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  COMPLETED: "completed",
} as const;
