import {
  doublePrecision,
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/pg-core";

const len = (length: number) => ({ length });


export type Comment = typeof Comments.$inferSelect;
export const Comments = pgTable("comments", {

	id:                  varchar("id", len(100)).notNull(),
	authorChannelId:     varchar("authorChannelId", len(150)),
	text:                varchar("text", len(10000)),
	importedAuthorName:  varchar("importedAuthorName", len(200)),
	importedAuthorPhoto: varchar("importedAuthorPhoto", len(300)),
	votes:               integer("votes").default(0),
	repliesCount:        integer("repliesCount").default(0),
	createdAt:           timestamp("createdAt", { mode: 'string' }).defaultNow(),
	score:               doublePrecision("score"),
	videoId:             varchar("videoId", len(255)),

},
(table) => [
  index("comment_repliesCount_idx").on(table.repliesCount),
  index("comment_score_idx").on(table.score),
  index("comment_videoId_idx").on(table.videoId),
  index("comment_votes_idx").on(table.votes),
  index("comment_authorChannelId_idx").on(table.authorChannelId),
  primaryKey({ columns: [table.id] })
]);

export type Video = typeof Videos.$inferSelect;
export const Videos = pgTable("videos", {

	id:           varchar("id", len(255)).notNull(),
	title:        varchar("title", len(1000)),
	viewCount:    integer("viewCount"),
	likeCount:    integer("likeCount"),
	dislikeCount: integer("dislikeCount"),
	publishedAt:  timestamp("publishedAt", { mode: 'string' }),

},
(table) => [primaryKey({ columns: [table.id] })]
);

export type Owner = typeof Owners.$inferSelect;
export const Owners = pgTable("owners", {
  uid:       varchar("uid", len(255)).primaryKey(),
  channelId: varchar("channelId", len(255)),
}, (table) => ([
  uniqueIndex("uid_channelId_unique_idx").on(table.uid, table.channelId),
]));


// export const comment = mysqlTable("comment", {

//   id:                   varchar("id", len(100)).primaryKey(),
//   videoId:              varchar("videoId", len(150)),
//   authorUid:            varchar("authorUid", len(30)),
//   authorChannelId:      varchar("authorChannelId", len(150)),
//   text:                 varchar("text", len(10000)),
//   importedAuthorName:   varchar("importedAuthorName", len(200)),
//   importedAuthorPhoto:  varchar("importedAuthorPhoto", len(300)),
//   votes:                int("votes"),
//   repliesCount:         int("repliesCount"),
//   score:                float("score"),
//   createdAt:            timestamp("createdAt"),
//   extra:                json("extra"),

// }, (table) => ({
//   videoIdIdx:          index('video_id_idx').on(table.videoId),
//   repliesCountIdx:     index('replies_count_idx').on(table.repliesCount),
//   votesIdx:            index('votes_idx').on(table.votes),
// }));

// export const video = mysqlTable("video", {

//   id:            varchar("id", len(100)).primaryKey(),
//   title:         varchar("title", len(1000)),
//   viewCount:     int("viewCount"),
//   likeCount:     int("likeCount"),
//   dislikeCount:  int("dislikeCount"),
//   publishedAt:   timestamp("publishedAt"),

// });
