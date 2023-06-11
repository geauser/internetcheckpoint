import path from 'node:path';
import { run } from 'kysely-migration-cli';
import { promises as fs } from 'node:fs';
import { db } from 'database';
import { FileMigrationProvider, Migrator } from 'kysely';

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(process.cwd(), 'planetscale/migrations'),
  })
});

run(db, migrator);