CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`imageUrl` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`role` enum('user','admin','owner') DEFAULT 'user');
--> statement-breakpoint
CREATE UNIQUE INDEX `userId_Idx` ON `users` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_Idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `username_Idx` ON `users` (`username`);