ALTER TABLE `blogs` MODIFY COLUMN `content` longtext;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','moderator','admin','owner') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `blogs` ADD `thumbnailUrl` varchar(255);