import * as path from 'node:path'
import { promises as fs } from 'node:fs'
import { db } from '../planetscale/db';
import {
  Migrator,
  FileMigrationProvider
} from 'kysely'

const action = process.argv[2];


async function migrate() {

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), 'planetscale/migrations'),
    })
  });

  const actionFnName = { latest: 'migrateToLatest', down: 'migrateDown', up: 'migrateUp' }[action] ?? 'migrateToLatest';
  const { error, results } = await migrator[actionFnName]();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  })

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrate();
