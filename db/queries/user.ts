import { createDBConnection } from "..";
import { Users } from "../generated/db";

export async function insertUser(user: Omit<Users, "user_id" | "created_at">) {
  const _db = createDBConnection();
  await _db.insertInto("users").values(user).execute();
}

export async function getAllUsers() {
  const _db = createDBConnection();
  return await _db.selectFrom("users").selectAll().execute();
}

export async function getUserById(userId: number) {
  const _db = createDBConnection();
  return await _db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirst();
}

export async function updateUserById(
  userId: number,
  updatedFields: Partial<Omit<Users, "user_id" | "created_at">>,
) {
  const _db = createDBConnection();
  return await _db
    .updateTable("users")
    .set(updatedFields)
    .where("user_id", "=", userId)
    .executeTakeFirst();
}

export async function deleteUserById(userId: number) {
  const _db = createDBConnection();
  return await _db
    .deleteFrom("users")
    .where("user_id", "=", userId)
    .executeTakeFirst();
}
