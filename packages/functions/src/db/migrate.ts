import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Resource } from "sst";
import chalk from "chalk";
import { db } from "@db";

try {
  console.log(
    chalk.gray('Connecting to'),
    `${chalk.white(Resource.DATABASE_URL.value)}`,
    chalk.gray('...'),
  );

  console.log(chalk.gray('Migrating on stage'), chalk.bold.yellow(process.env.SST_STAGE ?? 'unknown'), chalk.gray('...'));

  const options = { migrationsFolder: "./drizzle" };

  await migrate(db, options);

  console.log(chalk.green('Migration complete!'));
  console.log('\n');
  process.exit(0);
} catch (err) {
  console.error(`[DRIZZLE] An error occurred: ${err}`);
}
