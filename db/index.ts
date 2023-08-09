import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import { DB } from "./generated/db";

export const createDBConnection = () => {
  const db = new Kysely<DB>({
    dialect: new NeonDialect({
      connectionString: process.env.DATABASE_URL,
    }),
  });
  return db;
};

export default createDBConnection();
