import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("shopping_cart_item").execute();
  await db.schema.dropTable("shopping_cart").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("shopping_cart")
    .addColumn("cart_id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("users.user_id").notNull(),
    )
    .execute();

  await db.schema
    .createTable("shopping_cart_item")
    .addColumn("item_id", "serial", (col) => col.primaryKey())
    .addColumn("cart_id", "integer", (col) =>
      col.references("shopping_cart.cart_id").notNull(),
    )
    .addColumn("product_id", "integer", (col) =>
      col.references("products.product_id").notNull(),
    )
    .addColumn("quantity", "integer", (col) => col.notNull())
    .execute();
}
