import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Categories {
  category_id: Generated<number>;
  name: string;
}

export interface OrderItems {
  order_item_id: Generated<number>;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Orders {
  order_id: Generated<number>;
  user_id: number;
  created_at: Generated<Timestamp>;
  status: string;
}

export interface Products {
  product_id: Generated<number>;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  category_id: number;
}

export interface ShoppingCart {
  cart_id: Generated<number>;
  user_id: number;
}

export interface ShoppingCartItem {
  item_id: Generated<number>;
  cart_id: number;
  product_id: number;
  quantity: number;
}

export interface Users {
  user_id: Generated<number>;
  username: string;
  email: string;
  password: string;
  created_at: Generated<Timestamp>;
}

export interface DB {
  categories: Categories;
  order_items: OrderItems;
  orders: Orders;
  products: Products;
  shopping_cart: ShoppingCart;
  shopping_cart_item: ShoppingCartItem;
  users: Users;
}
