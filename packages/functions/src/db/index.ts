import { drizzle } from "drizzle-orm/postgres-js";
import { Resource } from "sst";
import * as schema from "./schema";
import postgres from "postgres";


const connection = postgres(Resource.DATABASE_URL.value, { prepare: true });

// Create the Drizzle ORM instance
export const db = drizzle(connection, { schema });
