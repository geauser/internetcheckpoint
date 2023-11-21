import {
  double,
  index,
  int,
  json,
  mysqlTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";

const len = (length: number) => ({ length });


export type CommentTable = typeof comment.$inferSelect;
export const comment = mysqlTable("comment", {

	id:                  varchar("id", len(100)).notNull(),
	authorChannelId:     varchar("authorChannelId", len(150)),
	text:                varchar("text", len(10000)),
	importedAuthorName:  varchar("importedAuthorName", len(200)),
	importedAuthorPhoto: varchar("importedAuthorPhoto", len(300)),
	votes:               int("votes").default(0),
	repliesCount:        int("repliesCount").default(0),
	createdAt:           timestamp("createdAt", { mode: 'string' }).defaultNow(),
	score:               double("score"),
	videoId:             varchar("videoId", len(255)),

},
(table) => {
	return {
		repliesCountIdx: index("comment_repliesCount_idx").on(table.repliesCount),
		scoreIdx:        index("comment_score_idx").on(table.score),
		videoIdIdx:      index("comment_videoId_idx").on(table.videoId),
		votesIdx:        index("comment_votes_idx").on(table.votes),
		commentId:       primaryKey(table.id)
	}
});

export type VideoTable = typeof video.$inferSelect;
export const video = mysqlTable("video", {

	id:           varchar("id", len(255)).notNull(),
	title:        varchar("title", len(1000)),
	viewCount:    int("viewCount"),
	likeCount:    int("likeCount"),
	dislikeCount: int("dislikeCount"),
	publishedAt:  timestamp("publishedAt", { mode: 'string' }),

},
(table) => {
	return {
		videoId: primaryKey(table.id)
	}
});

export type OwnerTable = typeof owners.$inferSelect;
export const owners = mysqlTable("owners", {
  uid:       varchar("uid", len(255)).primaryKey(),
  channelId: varchar("channelId", len(255)),
}, (table) => ({
  uniqueIdx: uniqueIndex("uid_channelId_unique_idx").on(table.uid, table.channelId),
}));


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
