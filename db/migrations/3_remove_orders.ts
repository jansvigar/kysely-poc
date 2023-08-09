import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("order_items").execute();
  await db.schema.dropTable("orders").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("orders")
    .addColumn("order_id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("users.user_id").notNull(),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("status", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("order_items")
    .addColumn("order_item_id", "serial", (col) => col.primaryKey())
    .addColumn("order_id", "integer", (col) =>
      col.references("orders.order_id").notNull(),
    )
    .addColumn("product_id", "integer", (col) =>
      col.references("products.product_id").notNull(),
    )
    .addColumn("quantity", "integer", (col) => col.notNull())
    .addColumn("price", "real", (col) => col.notNull())
    .execute();
}
