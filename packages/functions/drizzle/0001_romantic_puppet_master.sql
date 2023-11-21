CREATE TABLE `owners` (
	`uid` varchar(255) NOT NULL,
	`channelId` varchar(255),
	CONSTRAINT `owners_uid` PRIMARY KEY(`uid`),
	CONSTRAINT `uid_channelId_unique_idx` UNIQUE(`uid`,`channelId`)
);
--> statement-breakpoint
ALTER TABLE `comment` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `comment` DROP COLUMN `authorUid`;