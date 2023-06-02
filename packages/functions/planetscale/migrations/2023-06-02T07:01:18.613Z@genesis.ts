
import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {

  await db.schema
    .createTable('comment')
    .addColumn('id', 'varchar(100)', (col) => col.primaryKey())
    .addColumn('authorUid', 'varchar(40)')
    .addColumn('authorChannelId', 'varchar(150)')
    .addColumn('text', 'varchar(10000)')
    .addColumn('importedAuthorName', 'varchar(200)')
    .addColumn('importedAuthorPhoto', 'varchar(300)')
    .addColumn('votes', 'integer', (col) => col.defaultTo(0))
    .addColumn('repliesCount', 'integer', (col) => col.defaultTo(0))
    .addColumn('createdAt', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex('comment_repliesCount_idx')
    .on('comment')
    .column('repliesCount')
    .execute();

  await db.schema
    .createIndex('comment_votes_idx')
    .on('comment')
    .column('votes')
    .execute();

}

export async function down(db: Kysely<any>): Promise<void> {

  await db.schema.dropTable('comment').ifExists().cascade().execute();

}
