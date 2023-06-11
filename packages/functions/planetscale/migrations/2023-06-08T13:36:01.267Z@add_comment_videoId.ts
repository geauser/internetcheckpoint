
import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {

  await db.schema
    .alterTable('comment')
    .addColumn('videoId', 'varchar(255)')
    .execute();

  await db.schema
    .createIndex('comment_videoId_idx')
    .on('comment')
    .column('videoId')
    .execute();

}

export async function down(db: Kysely<any>): Promise<void> {

  await db.schema
    .alterTable('comment')
    .dropColumn('videoId')
    .execute();

}
