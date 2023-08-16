import { createDBConnection } from "..";
import { Products } from "../generated/db";

export async function insertProduct(product: Omit<Products, "product_id">) {
  const _db = createDBConnection();
  await _db.insertInto("products").values(product).execute();
}

export async function getAllProducts() {
  const _db = createDBConnection();
  return await _db.selectFrom("products").selectAll().execute();
}

export async function getProductById(productId: number) {
  const _db = createDBConnection();
  return await _db
    .selectFrom("products")
    .selectAll()
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function updateProductById(
  productId: number,
  updatedFields: Partial<Omit<Products, "product_id">>,
) {
  const _db = createDBConnection();
  return await _db
    .updateTable("products")
    .set(updatedFields)
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function deleteProductById(productId: number) {
  const _db = createDBConnection();
  return await _db
    .deleteFrom("products")
    .where("product_id", "=", productId)
    .executeTakeFirst();
}

export async function getProductsByCategory(categoryId: number) {
  const _db = createDBConnection();
  return await _db
    .selectFrom("products")
    .selectAll()
    .where("category_id", "=", categoryId)
    .execute();
}

export async function getAllProductsWithCategories() {
  const _db = createDBConnection();
  return await _db
    .selectFrom("products")
    .innerJoin("categories as c", "c.category_id", "products.category_id")
    .select(["c.name as category_name"])
    .selectAll("products")
    .execute();
}
