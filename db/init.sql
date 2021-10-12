CREATE TABLE `accounts` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`timestamp` TIMESTAMP NOT NULL
);

CREATE TABLE `accounts_info` (
	`id` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`birthdate` DATE NOT NULL,
	`gender` BOOLEAN NOT NULL,
	`city` VARCHAR(255) NOT NULL
);

CREATE TABLE `interests` (
	`id` VARCHAR(255) NOT NULL,
	`tag` VARCHAR(255) NOT NULL
);

CREATE TABLE `friends` (
	`source_account_id` VARCHAR(255) NOT NULL,
	`target_account_id` VARCHAR(255) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL
);

ALTER TABLE `accounts_info` ADD CONSTRAINT `accounts_info_fk0` FOREIGN KEY (`id`) REFERENCES `accounts`(`id`);

ALTER TABLE `interests` ADD CONSTRAINT `interests_fk0` FOREIGN KEY (`id`) REFERENCES `accounts`(`id`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk0` FOREIGN KEY (`source_account_id`) REFERENCES `accounts`(`id`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk1` FOREIGN KEY (`target_account_id`) REFERENCES `accounts`(`id`);




