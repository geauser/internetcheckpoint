import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Config } from "sst/node/config";
import chalk from "chalk";
import { db } from "@db";

try {
  console.log(
    chalk.gray('Connecting to'),
    `${chalk.white(Config.DATABASE_URL)}`,
    chalk.gray('...'),
  );

  console.log(chalk.gray('Migrating on stage'), chalk.bold.yellow(Config.STAGE), chalk.gray('...'));

  const options = { migrationsFolder: "./drizzle" };

  await migrate(db, options);

  console.log(chalk.green('Migration complete!'));
  console.log('\n');
  process.exit(0);
} catch (err) {
  console.error(`[DRIZZLE] An error occurred: ${err}`);
}
