CREATE TABLE IF NOT EXISTS `comment` (
	`id` varchar(100) NOT NULL,
	`authorUid` varchar(40),
	`authorChannelId` varchar(150),
	`text` varchar(10000),
	`importedAuthorName` varchar(200),
	`importedAuthorPhoto` varchar(300),
	`votes` int DEFAULT 0,
	`repliesCount` int DEFAULT 0,
	`createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	`score` double,
	`videoId` varchar(255),
	`extra` json,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `video` (
	`id` varchar(255) NOT NULL,
	`title` varchar(1000),
	`viewCount` int,
	`likeCount` int,
	`dislikeCount` int,
	`publishedAt` timestamp,
	CONSTRAINT `video_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
-- CREATE INDEX `comment_repliesCount_idx` ON `comment` (`repliesCount`);--> statement-breakpoint
-- CREATE INDEX `comment_score_idx` ON `comment` (`score`);--> statement-breakpoint
-- CREATE INDEX `comment_videoId_idx` ON `comment` (`videoId`);--> statement-breakpoint
-- CREATE INDEX `comment_votes_idx` ON `comment` (`votes`);
