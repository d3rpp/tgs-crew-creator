-- RUN THESE ONE AT A TIME
-- Create Crew Members Table
CREATE TABLE `crew_members`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `age_group` ENUM('U15', 'U16', 'U17', 'U18') NOT NULL,
  `gender` ENUM('M', 'F') NOT NULL
);
-- Create Crew Table
CREATE TABLE `crews`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `crewName` VARCHAR(255) NULL,
  `boatName` VARCHAR(255) NULL,
  `oars` VARCHAR(255) NULL,
  `coach` INT UNSIGNED NULL,
  `size` ENUM('1', '2', '4', '8') NOT NULL
);
-- add the crewName as an Index because why not
ALTER TABLE
  `crews`
ADD
  INDEX `crews_crewname_index`(`crewName`);
-- tell the DB that boatname will always be unique
ALTER TABLE
  `crews`
ADD
  UNIQUE `crews_boatname_unique`(`boatName`);
-- tell the DB that the coach can be used as an index
ALTER TABLE
  `crews`
ADD
  INDEX `crews_coach_index`(`coach`);
-- tell the DB that the boat size can be used as an index
ALTER TABLE
  `crews`
ADD
  INDEX `crews_size_index`(`size`);
-- create the seats table
  CREATE TABLE `seats`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `crew_id` INT UNSIGNED NOT NULL,
    `member_id` INT UNSIGNED NOT NULL,
    `position` INT NOT NULL
  );
-- allow the crew_id to be an index
ALTER TABLE
  `seats`
ADD
  INDEX `seats_crew_id_index`(`crew_id`);
-- allow the member_id to be an index
ALTER TABLE
  `seats`
ADD
  UNIQUE `seats_member_id_unique`(`member_id`);
-- create the coaches table
  CREATE TABLE `coaches`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
  );
-- make the coach name column unique
ALTER TABLE
  `coaches`
ADD
  UNIQUE `coaches_name_unique`(`name`);
-- Reference the crew_id of seats to the crew's id via a one-to-many relationship
ALTER TABLE
  `seats`
ADD
  CONSTRAINT `seats_crew_id_foreign` FOREIGN KEY(`crew_id`) REFERENCES `crews`(`id`);
-- Reference the member_id of seats to a member's id via a one-to-one relationship
ALTER TABLE
  `seats`
ADD
  CONSTRAINT `seats_member_id_foreign` FOREIGN KEY(`member_id`) REFERENCES `crew_members`(`id`);
-- Reference the coach in crews as the ID of coach.id via a one-to-one relationship
ALTER TABLE
  `crews`
ADD
  CONSTRAINT `crews_coach_foreign` FOREIGN KEY(`coach`) REFERENCES `coaches`(`id`);