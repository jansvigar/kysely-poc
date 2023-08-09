import db, { createDBConnection } from "..";
import { Categories } from "../generated/db";

export async function insertCategory(
  category: Omit<Categories, "category_id">,
) {
  await db.insertInto("categories").values(category).execute();
}

export async function getAllCategories() {
  const _db = createDBConnection();
  return await _db.selectFrom("categories").selectAll().execute();
}

export async function getCategoryById(categoryId: number) {
  return await db
    .selectFrom("categories")
    .selectAll()
    .where("category_id", "=", categoryId)
    .executeTakeFirst();
}

export async function updateCategoryById(
  categoryId: number,
  updatedFields: Partial<Omit<Categories, "category_id">>,
) {
  return await db
    .updateTable("categories")
    .set(updatedFields)
    .where("category_id", "=", categoryId)
    .executeTakeFirst();
}

export async function deleteCategoryById(categoryId: number) {
  return await db
    .deleteFrom("categories")
    .where("category_id", "=", categoryId)
    .executeTakeFirst();
}
