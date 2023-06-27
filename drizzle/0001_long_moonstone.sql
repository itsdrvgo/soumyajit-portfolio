CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` json,
	`published` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`authorId` varchar(255) NOT NULL);
--> statement-breakpoint
DROP INDEX `username_Idx` ON `users`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(255);