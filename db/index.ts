import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import { DB } from "./generated/db";

const db = new Kysely<DB>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
  }),
});

export default db;
