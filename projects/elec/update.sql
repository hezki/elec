ALTER TABLE `cmds`
	ADD COLUMN `last` TINYINT NOT NULL AFTER `timestamp`,
	ADD COLUMN `share` INT NOT NULL AFTER `last`,
	ADD INDEX `share` (`share`),
	ADD INDEX `switch` (`switch`),
	ADD INDEX `matcon` (`matcon`);
ALTER TABLE `cmds_tmp`
	add column id not null auto inrcement,
	ADD COLUMN `last` TINYINT NOT NULL AFTER `disable`,
	ADD COLUMN `share` INT NOT NULL AFTER `last`,
	primary(id),
	ADD INDEX `share` (`share`),
	ADD INDEX `switch` (`switch`),
	ADD INDEX `matcon` (`matcon`);
ALTER TABLE `zmanim`
	ADD COLUMN `ord` INT NOT NULL AFTER `time`,
	ADD INDEX `ord` (`ord`);
INSERT INTO `electric`.`global` (`name`, `val`, `time`, `notes`) VALUES ('user1', 'admin', '2016-06-01 20:56:16', 'שם מנהל');
