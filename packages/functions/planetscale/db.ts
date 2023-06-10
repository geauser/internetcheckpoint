import { Kysely, MysqlDialect } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { createPool } from "mysql2";
import { Config } from "sst/node/config";


export interface CommentTable {
  id: string,
  videoId: string,
  authorUid: string | null
  authorChannelId: string | null,
  text: string,
  importedAuthorName: string | null,
  importedAuthorPhoto: string | null,
  votes: number,
  repliesCount: number,
  score?: number,
  createdAt?: Date | null,
}

export interface VideoTable {
  id: string,
  title: string,
  viewCount: number,
  likeCount: number,
  dislikeCount: number,
  publishedAt: Date,
}

interface Database {
  comment: CommentTable,
  video: VideoTable,
}

export const db = new Kysely<Database>({
  dialect: (() => {

    if (Config.STAGE === 'local') {
      return new MysqlDialect({
        pool: createPool({
          user: 'root',
          host: '127.0.0.1',
          database: 'internetcheckpoint',
        })
      });
    } else {
      return new PlanetScaleDialect({
        url: Config.DATABASE_URL,
      });
    }

  })()
});
