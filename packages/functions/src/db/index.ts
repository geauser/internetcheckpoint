import { connect as connectToPlanetscale } from "@planetscale/database";
import { MySql2Database, drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { PlanetScaleDatabase, drizzle as drizzlePlanetscale } from "drizzle-orm/planetscale-serverless";
import mysql from "mysql2/promise";
import { Config } from "sst/node/config";
import * as schema from "./schema";


let connection: any;


if (Config.STAGE.startsWith("local")) {

  // TODO: I will figure out a way to read environment variables
  connection = await mysql.createConnection({
    host:     Config.DATABASE_HOST,
    user:     Config.DATABASE_USER,
    port:     Config.DATABASE_PORT as unknown as number,
    password: Config.DATABASE_PASSWORD,
    database: Config.DATABASE_NAME,
    multipleStatements: true,
  });

} else {
  connection = connectToPlanetscale({
    host:     Config.DATABASE_HOST,
    username: Config.DATABASE_USER,
    password: Config.DATABASE_PASSWORD,
  });
}

export type MysqlDb       = MySql2Database<typeof schema>;
export type PlanetscaleDb = PlanetScaleDatabase<typeof schema>;
export const db = Config.STAGE.startsWith("local") ? drizzleMysql(connection, { schema, mode: 'planetscale' }) : drizzlePlanetscale(connection, { schema }) as unknown as MysqlDb;
