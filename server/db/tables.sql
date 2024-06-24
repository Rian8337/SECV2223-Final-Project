CREATE DATABASE IF NOT EXISTS `todo_app` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `todo_app`;

-- Create family table
CREATE TABLE IF NOT EXISTS `family` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Create user table
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `session_id` VARCHAR(64) DEFAULT NULL,
    `family_id` INT DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON DELETE SET NULL,
    UNIQUE INDEX `email_UNIQUE_idx` (`email` ASC),
    UNIQUE INDEX `session_id_UNIQUE_idx` (`session_id` ASC)
) ENGINE = InnoDB;

-- Create family_member table
CREATE TABLE IF NOT EXISTS `family_member` (
    `user_id` INT NOT NULL,
    `family_id` INT NOT NULL,
    `role` ENUM('owner', 'admin', 'member') DEFAULT 'member',
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON DELETE CASCADE,
    UNIQUE INDEX `user_id_UNIQUE_idx` (`user_id` ASC),
    INDEX `family_id_idx` (`family_id` ASC)
) ENGINE = InnoDB;

-- Create todo table
CREATE TABLE IF NOT EXISTS `todo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `completed` BOOLEAN DEFAULT FALSE,
    `user_id` INT DEFAULT NULL,
    `family_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON DELETE CASCADE,
    INDEX `title_idx` (`title` ASC),
    INDEX `family_id_idx` (`family_id` ASC),
    INDEX `created_at_idx` (`created_at` DESC),
    INDEX `completed_family_id_idx` (`completed` ASC, `family_id` ASC)
) ENGINE = InnoDB;
