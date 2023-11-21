import { migrate as migrateMysql } from "drizzle-orm/mysql2/migrator";
import { migrate as migratePlanetscale } from "drizzle-orm/planetscale-serverless/migrator";
import { Config } from "sst/node/config";
import chalk from "chalk";
import { PlanetscaleDb, db } from "@db";


try {

  console.log(
    chalk.gray('Connecting to'),
    `${chalk.white('mysql://')}${chalk.white(Config.DATABASE_HOST)}:${chalk.white(Config.DATABASE_PORT)}/${chalk.bold.yellow(Config.DATABASE_NAME)}`,
    chalk.gray('...'),
  );

  console.log(chalk.gray('Migrating on stage'), chalk.bold.yellow(Config.STAGE), chalk.gray('...'));

  const options = { migrationsFolder: "./drizzle" };

  if (Config.STAGE.startsWith("local")) await migrateMysql(db, options);
  else await migratePlanetscale(db as unknown as PlanetscaleDb, options);

  console.log(chalk.green('Migration complete!'));
  console.log('\n');
  process.exit(0);
} catch (err) {
  console.error(`[DRIZZLE] An error occurred: ${err}`);
}

