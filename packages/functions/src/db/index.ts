import { drizzle } from "drizzle-orm/postgres-js";
import { Config } from "sst/node/config";
import * as schema from "./schema";
import postgres from "postgres";


const connection = postgres(Config.DATABASE_URL, { prepare: true });

// Create the Drizzle ORM instance
export const db = drizzle(connection, { schema });
