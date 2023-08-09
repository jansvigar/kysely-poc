import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Categories {
  category_id: Generated<number>;
  name: string;
}

export interface Products {
  product_id: Generated<number>;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  category_id: number;
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
  products: Products;
  users: Users;
}
