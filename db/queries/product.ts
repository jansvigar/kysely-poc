import db from "..";
import { Products } from "../generated/db";

export async function insertProduct(product: Omit<Products, "product_id">) {
  await db.insertInto("products").values(product).execute();
}

export async function getAllProducts() {
  return await db.selectFrom("products").selectAll().execute();
}

export async function getProductById(productId: number) {
  return await db
    .selectFrom("products")
    .selectAll()
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function updateProductById(
  productId: number,
  updatedFields: Partial<Omit<Products, "product_id">>,
) {
  return await db
    .updateTable("products")
    .set(updatedFields)
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function deleteProductById(productId: number) {
  return await db
    .deleteFrom("products")
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function getProductsByCategory(categoryId: number) {
  return await db
    .selectFrom("products")
    .selectAll()
    .where("category_id", "=", categoryId)
    .execute();
}
