import db from "..";
import { ShoppingCart, ShoppingCartItem } from "../generated/db";

export async function insertShoppingCart(cart: Omit<ShoppingCart, "cart_id">) {
  await db.insertInto("shopping_cart").values(cart).execute();
}

export async function getShoppingCartById(cartId: number) {
  return await db
    .selectFrom("shopping_cart")
    .selectAll()
    .where("cart_id", "=", cartId)
    .executeTakeFirst();
}

export async function deleteShoppingCartById(cartId: number) {
  return await db
    .deleteFrom("shopping_cart")
    .where("cart_id", "=", cartId)
    .executeTakeFirst();
}

export async function insertShoppingCartItem(
  item: Omit<ShoppingCartItem, "item_id">,
) {
  await db.insertInto("shopping_cart_item").values(item).execute();
}

export async function getAllCartItems(cartId: number) {
  return await db
    .selectFrom("shopping_cart_item")
    .selectAll()
    .where("cart_id", "=", cartId)
    .execute();
}

export async function getCartItemById(itemId: number) {
  return await db
    .selectFrom("shopping_cart_item")
    .selectAll()
    .where("item_id", "=", itemId)
    .executeTakeFirst();
}

export async function updateCartItemById(
  itemId: number,
  updatedFields: Partial<Omit<ShoppingCartItem, "item_id">>,
) {
  return await db
    .updateTable("shopping_cart_item")
    .set(updatedFields)
    .where("item_id", "=", itemId)
    .executeTakeFirst();
}

export async function deleteCartItemById(itemId: number) {
  return await db
    .deleteFrom("shopping_cart_item")
    .where("item_id", "=", itemId)
    .executeTakeFirst();
}
