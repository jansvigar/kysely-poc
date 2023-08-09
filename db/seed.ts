import "dotenv/config";

import { Kysely } from "kysely";
import { Categories, DB, Products, Users } from "./generated/db";
import { NeonDialect } from "kysely-neon";
import ws from "ws";

import { faker } from "@faker-js/faker";

function createRandomCategory(): Omit<Categories, "category_id"> {
  const name = faker.word.noun();

  return {
    name,
  };
}

export function createRandomCategories(
  n: number,
): Array<Omit<Categories, "category_id">> {
  const categories = Array.from({ length: n }, () => createRandomCategory());
  return categories;
}

function createRandomProduct(): Omit<Products, "product_id"> {
  return {
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock_quantity: faker.number.int({ min: 1, max: 100 }),
    category_id: faker.number.int({ min: 1, max: 100 }),
  };
}

export function createRandomProducts(
  n: number,
): Array<Omit<Products, "product_id">> {
  const products = Array.from({ length: n }, () => createRandomProduct());
  return products;
}

function createRandomUser(): Omit<Users, "user_id" | "created_at"> {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function createRandomUsers(
  n: number,
): Array<Omit<Users, "user_id" | "created_at">> {
  const users = Array.from({ length: n }, () => createRandomUser());
  return users;
}

export async function populate() {
  const db = new Kysely<DB>({
    dialect: new NeonDialect({
      connectionString: process.env.DATABASE_URL,
      webSocketConstructor: ws,
    }),
  });

  const categories = createRandomCategories(100);
  await db.insertInto("categories").values(categories).execute();

  const products = createRandomProducts(5000);
  await db.insertInto("products").values(products).execute();

  const users = createRandomUsers(1000);
  await db.insertInto("users").values(users).execute();
}

populate();
