CREATE TABLE IF NOT EXISTS "comments" (
	"id" varchar(100) NOT NULL,
	"authorChannelId" varchar(150),
	"text" varchar(10000),
	"importedAuthorName" varchar(200),
	"importedAuthorPhoto" varchar(300),
	"votes" integer DEFAULT 0,
	"repliesCount" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"score" double precision,
	"videoId" varchar(255),
	CONSTRAINT "comments_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"id" varchar(255) NOT NULL,
	"title" varchar(1000),
	"viewCount" integer,
	"likeCount" integer,
	"dislikeCount" integer,
	"publishedAt" timestamp,
	CONSTRAINT "videos_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "owners" (
	"uid" varchar(255) PRIMARY KEY NOT NULL,
	"channelId" varchar(255)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_repliesCount_idx" ON "comments" USING btree ("repliesCount");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_score_idx" ON "comments" USING btree ("score");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_videoId_idx" ON "comments" USING btree ("videoId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_votes_idx" ON "comments" USING btree ("votes");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_authorChannelId_idx" ON "comments" USING btree ("authorChannelId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uid_channelId_unique_idx" ON "owners" USING btree ("uid","channelId");