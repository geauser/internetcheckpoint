
import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {

  await db.schema
    .alterTable('comment')
    .addColumn('score', 'float8')
    .execute();

  await db.schema
    .createIndex('comment_score_idx')
    .on('comment')
    .column('score')
    .execute();

}

export async function down(db: Kysely<any>): Promise<void> {

  await db.schema
    .alterTable('comment')
    .dropColumn('score')
    .execute();

}
