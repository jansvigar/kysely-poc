import "dotenv/config";

import { Kysely } from "kysely";
import { DB } from "./generated/db";
import { NeonDialect } from "kysely-neon";
import ws from "ws";

export async function seed() {
  const db = new Kysely<DB>({
    dialect: new NeonDialect({
      connectionString: process.env.DATABASE_URL,
      webSocketConstructor: ws,
    }),
  });

  const categories = [
    { name: "Electronics" },
    { name: "Clothing" },
    { name: "Books" },
    { name: "Furniture" },
    { name: "Groceries" },
    { name: "Toys" },
  ];
  await db.insertInto("categories").values(categories).execute();

  const products = [
    {
      name: "Smartphone",
      description: "Latest model",
      price: 699.99,
      stock_quantity: 50,
      category_id: 1,
    },
    {
      name: "Laptop",
      description: "Powerful performance",
      price: 999.99,
      stock_quantity: 30,
      category_id: 1,
    },
    {
      name: "Jeans",
      description: "Comfortable fit",
      price: 49.99,
      stock_quantity: 100,
      category_id: 2,
    },
    {
      name: "T-Shirt",
      description: "Soft fabric",
      price: 19.99,
      stock_quantity: 200,
      category_id: 2,
    },
    {
      name: "Novel",
      description: "Bestselling author",
      price: 14.99,
      stock_quantity: 70,
      category_id: 3,
    },
    {
      name: "Chair",
      description: "Ergonomic design",
      price: 89.99,
      stock_quantity: 40,
      category_id: 4,
    },
    {
      name: "Fruit Basket",
      description: "Fresh fruits",
      price: 29.99,
      stock_quantity: 60,
      category_id: 5,
    },
    {
      name: "Toy Car",
      description: "For ages 3+",
      price: 12.99,
      stock_quantity: 80,
      category_id: 6,
    },
  ];
  await db.insertInto("products").values(products).execute();

  const users = [
    {
      username: "john_doe",
      email: "john.doe@example.com",
      password: "hashed_password1",
      created_at: new Date(),
    },
    {
      username: "jane_doe",
      email: "jane.doe@example.com",
      password: "hashed_password2",
      created_at: new Date(),
    },
    {
      username: "alice",
      email: "alice@example.com",
      password: "hashed_password3",
      created_at: new Date(),
    },
    {
      username: "bob",
      email: "bob@example.com",
      password: "hashed_password4",
      created_at: new Date(),
    },
  ];
  await db.insertInto("users").values(users).execute();
}

seed();
