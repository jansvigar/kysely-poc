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

/**
 * We should be careful not to use this global/shared db instance when using it in Cloudflare workers/page functions, create a new instance instead using createDBConnection()
 * We could run into the following issue:https://zuplo.com/blog/the-script-will-never-generate-a-response-on-cloudflare-workers
 * Basically, CloudFlare workers do some slightly unusual things with the JavaScript event loop
 */
export default createDBConnection();
