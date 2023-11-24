CREATE INDEX `comment_authorChannelId_idx` ON `comment` (`authorChannelId`);--> statement-breakpoint
ALTER TABLE `comment` DROP COLUMN `extra`;