import db from "..";
import { Orders } from "../generated/db";
import { OrderItems } from "../generated/db";

export async function insertOrder(
  order: Omit<Orders, "order_id" | "created_at">,
) {
  await db.insertInto("orders").values(order).execute();
}

export async function getAllOrders() {
  return await db.selectFrom("orders").selectAll().execute();
}

export async function getOrderById(orderId: number) {
  return await db
    .selectFrom("orders")
    .selectAll()
    .where("order_id", "=", orderId)
    .executeTakeFirst();
}

export async function updateOrderById(
  orderId: number,
  updatedFields: Partial<Omit<Orders, "order_id" | "created_at">>,
) {
  return await db
    .updateTable("orders")
    .set(updatedFields)
    .where("order_id", "=", orderId)
    .executeTakeFirst();
}

export async function deleteOrderById(orderId: number) {
  return await db
    .deleteFrom("orders")
    .where("order_id", "=", orderId)
    .executeTakeFirst();
}

export async function insertOrderItem(
  orderItem: Omit<OrderItems, "order_item_id">,
) {
  await db.insertInto("order_items").values(orderItem).execute();
}

export async function getAllOrderItems(orderId: number) {
  return await db
    .selectFrom("order_items")
    .selectAll()
    .where("order_id", "=", orderId)
    .execute();
}

export async function getOrderItemById(orderItemId: number) {
  return await db
    .selectFrom("order_items")
    .selectAll()
    .where("order_item_id", "=", orderItemId)
    .executeTakeFirst();
}

export async function updateOrderItemById(
  orderItemId: number,
  updatedFields: Partial<Omit<OrderItems, "order_item_id">>,
) {
  return await db
    .updateTable("order_items")
    .set(updatedFields)
    .where("order_item_id", "=", orderItemId)
    .executeTakeFirst();
}

export async function deleteOrderItemById(orderItemId: number) {
  return await db
    .deleteFrom("order_items")
    .where("order_item_id", "=", orderItemId)
    .executeTakeFirst();
}
