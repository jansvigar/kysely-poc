import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Users Table
  await db.schema
    .createTable("users")
    .addColumn("user_id", "serial", (col) => col.primaryKey())
    .addColumn("username", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  // Categories Table
  await db.schema
    .createTable("categories")
    .addColumn("category_id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .execute();

  // Products Table
  await db.schema
    .createTable("products")
    .addColumn("product_id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar")
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("stock_quantity", "integer", (col) => col.notNull())
    .addColumn("category_id", "integer", (col) =>
      col.references("categories.category_id").notNull(),
    )
    .execute();

  // ShoppingCart Table
  await db.schema
    .createTable("shopping_cart")
    .addColumn("cart_id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("users.user_id").notNull(),
    )
    .execute();

  // ShoppingCartItem Table
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

  // Orders Table
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

  // OrderItems Table
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

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("order_items").execute();
  await db.schema.dropTable("orders").execute();
  await db.schema.dropTable("shopping_cart_item").execute();
  await db.schema.dropTable("shopping_cart").execute();
  await db.schema.dropTable("products").execute();
  await db.schema.dropTable("categories").execute();
  await db.schema.dropTable("users").execute();
}
