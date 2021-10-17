CREATE TABLE `accounts` (
	`account_id` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`birthdate` DATE NOT NULL,
	`gender` BOOLEAN NOT NULL,
	`city` VARCHAR(255) NOT NULL,
	`interests` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`account_id`)
);

CREATE TABLE `friends` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`source_account_id` VARCHAR(255) NOT NULL,
	`target_account_id` VARCHAR(255) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL
);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk0` FOREIGN KEY (`source_account_id`) REFERENCES `accounts`(`account_id`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk1` FOREIGN KEY (`target_account_id`) REFERENCES `accounts`(`account_id`);


