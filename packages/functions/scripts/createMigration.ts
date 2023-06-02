import fs from 'node:fs';


const migrationName = process.argv[2];

if (!migrationName) {
  console.error('missing migration name');
  process.exit(1);
}

const ISO8601Date = new Date().toISOString();
const migrationFileName = `${ISO8601Date}@${migrationName}.ts`;
const migrationPath = `./planetscale/migrations/${migrationFileName}`;

const migrationTemplate = `
import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {
  //
}

export async function down(db: Kysely<any>): Promise<void> {
  //
}
`;

fs.writeFileSync(migrationPath, migrationTemplate);

console.log('created migration ::', migrationFileName);
