
import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {

  await db.schema
    .createTable('video')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('title', 'varchar(1000)')
    .addColumn('viewCount', 'integer')
    .addColumn('likeCount', 'integer')
    .addColumn('dislikeCount', 'integer')
    .addColumn('publishedAt', 'timestamp')
    .execute();

}

export async function down(db: Kysely<any>): Promise<void> {

  await db.schema
    .dropTable('video')
    .ifExists()
    .cascade()
    .execute();

}
