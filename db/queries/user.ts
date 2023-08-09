import db from "..";
import { Users } from "../generated/db";

export async function insertUser(user: Omit<Users, "user_id" | "created_at">) {
  await db.insertInto("users").values(user).execute();
}

export async function getAllUsers() {
  return await db.selectFrom("users").selectAll().execute();
}

export async function getUserById(userId: number) {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirst();
}

export async function updateUserById(
  userId: number,
  updatedFields: Partial<Omit<Users, "user_id" | "created_at">>,
) {
  return await db
    .updateTable("users")
    .set(updatedFields)
    .where("user_id", "=", userId)
    .executeTakeFirst();
}

export async function deleteUserById(userId: number) {
  return await db
    .deleteFrom("users")
    .where("user_id", "=", userId)
    .executeTakeFirst();
}
