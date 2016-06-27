CREATE TABLE IF NOT EXISTS `cmds` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `switch` int(10) unsigned NOT NULL,   `matcon` int(10) unsigned NOT NULL,   `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0=fixed;1=before;2=after',   `zman` int(10) unsigned NOT NULL,   `action` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0=disable;1=on;2=off',   `time` time NOT NULL COMMENT 'for fixed=time frac;for other=minutes aft bef',   `days` tinyint(1) unsigned NOT NULL DEFAULT '255',   `disable` tinyint(1) NOT NULL,   `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   `last` tinyint(4) NOT NULL,   `share` int(11) NOT NULL,   PRIMARY KEY (`id`),   KEY `share` (`share`),   KEY `switch` (`switch`),   KEY `matcon` (`matcon`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cmds_tmp` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `switch` int(10) unsigned NOT NULL,   `matcon` int(10) unsigned NOT NULL,   `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0=fixed;1=before;2=after',   `zman` int(10) unsigned NOT NULL,   `action` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0=disable;1=on;2=off',   `time` time NOT NULL COMMENT 'for fixed=time frac;for other=minutes aft bef',   `days` tinyint(1) unsigned NOT NULL DEFAULT '255',   `disable` tinyint(1) NOT NULL,   `last` tinyint(4) NOT NULL,   `share` int(11) NOT NULL,   PRIMARY KEY (`id`),   KEY `share` (`share`),   KEY `switch` (`switch`),   KEY `matcon` (`matcon`) ) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `days` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `date` datetime NOT NULL,   `matcon` int(10) unsigned NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   `grp` int(10) unsigned NOT NULL DEFAULT '0',   `hands` text,   PRIMARY KEY (`id`),   UNIQUE KEY `index_2` (`date`,`grp`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `global` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `name` varchar(55) NOT NULL,   `val` varchar(200) NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   `notes` text NOT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `Index_2` (`name`) ) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `grps` (   `id` int(10) NOT NULL AUTO_INCREMENT,   `name` varchar(50) NOT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `name` (`name`) ) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `log` (   `i` int(10) NOT NULL AUTO_INCREMENT,   `type` tinyint(1) NOT NULL COMMENT '1=start service,2=end service,3=card send,4=card not response,5=com ok,6=com err',   `cardID` tinyint(1) NOT NULL,   `data` int(8) unsigned NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`i`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `matcons` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `name` varchar(100) NOT NULL,   `grp` int(10) unsigned NOT NULL DEFAULT '0',   `color` varchar(7) NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   `disable` tinyint(1) unsigned NOT NULL,   `ord` int(10) unsigned NOT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `index_2` (`name`,`grp`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `rules` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `grp` int(10) unsigned NOT NULL DEFAULT '0',   `desc` text NOT NULL,   `cal_type` tinyint(1) unsigned NOT NULL COMMENT '0=greg;1=heb',   `begin_m` tinyint(1) unsigned NOT NULL,   `begin_d` tinyint(1) unsigned NOT NULL,   `len` int(10) unsigned NOT NULL,   `end_m` tinyint(1) unsigned NOT NULL,   `end_d` tinyint(1) unsigned NOT NULL,   `action` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0=matcon;1=tkufa',   `params` int(10) unsigned NOT NULL,   `days` tinyint(1) unsigned NOT NULL DEFAULT '255',   `ord` int(10) unsigned NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `summer` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `year` int(10) unsigned NOT NULL,   `begin` datetime NOT NULL,   `end` datetime NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`),   UNIQUE KEY `Index_2` (`year`) ) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `switchs` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `grp` int(10) unsigned NOT NULL DEFAULT '0',   `out` int(10) unsigned NOT NULL,   `name` varchar(100) NOT NULL,   `disable` tinyint(1) unsigned NOT NULL,   `locked` tinyint(1) unsigned NOT NULL,   `lock_status` tinyint(1) unsigned NOT NULL,   `ord` int(10) unsigned NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `temp` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `date` datetime NOT NULL,   `switch` int(10) unsigned NOT NULL,   `action` tinyint(1) unsigned NOT NULL,   PRIMARY KEY (`id`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `zmanim` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `name` varchar(100) NOT NULL,   `base` int(10) unsigned NOT NULL,   `igul` tinyint(1) unsigned NOT NULL COMMENT '0=round;1=floor;2=ceil',   `add` int(10) NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   `ord` int(11) NOT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `index_2` (`name`),   KEY `ord` (`ord`) ) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `zmanim_base` (   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,   `en` varchar(100) NOT NULL,   `he` varchar(200) NOT NULL,   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;




INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (1,'עיר','מודיעין עילית','2011-10-25 22:45:44.000','עיר');
INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (2,'קו_אורך','35.0431694444444','2011-10-25 22:45:44.000','קו אורך');
INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (3,'קו_רוחב','31.9330583333333','2011-10-25 22:45:44.000','קו רוחב');
INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (4,'גובה','10','2011-10-25 22:45:44.000','גובה במטרים');
INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (9,'user1_pass','1234','2011-12-15 13:00:14.000','סיסמה למנהל');
INSERT INTO `global` (`id`,`name`,`val`,`time`,`notes`) VALUES (10,'user1','admin','2016-06-01 20:56:16.000','שם מנהל');


INSERT INTO `grps` (`id`,`name`) VALUES (3,'ישיבה');
INSERT INTO `grps` (`id`,`name`) VALUES (1,'אולם');
INSERT INTO `grps` (`id`,`name`) VALUES (2,'בית כנסת');







INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (2,2022,'2012-03-25 00:00:00.000','2022-10-29 00:00:00.000','2011-11-14 10:25:42.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (3,2024,'2024-03-29 00:00:00.000','2024-10-26 00:00:00.000','2012-04-06 23:20:17.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (4,2014,'2014-03-28 00:00:00.000','2014-10-25 00:00:00.000','2012-04-07 10:01:47.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (6,2015,'2015-03-27 00:00:00.000','2015-10-24 00:00:00.000','2012-04-07 10:25:16.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (10,2017,'2017-03-24 00:00:00.000','2017-10-28 00:00:00.000','2014-11-23 01:52:32.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (9,2016,'2016-03-25 00:00:00.000','2016-10-29 01:50:50.000','2014-11-23 01:51:31.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (8,2018,'2018-03-23 01:18:23.000','2028-10-27 01:18:42.000','2028-11-23 01:19:17.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (5,2021,'2013-03-26 00:00:00.000','2021-10-30 00:00:00.000','2012-04-07 10:24:36.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (7,2025,'2025-03-28 00:00:00.000','2025-10-25 00:00:00.000','2012-04-07 12:57:13.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (1,2023,'2023-03-24 00:00:00.000','2023-10-28 00:00:00.000','2011-11-14 10:25:42.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (11,2019,'2019-03-29 00:00:00.000','2019-10-26 00:00:00.000','2014-11-23 02:05:58.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (12,2020,'2020-03-27 00:00:00.000','2020-10-24 00:00:00.000','2014-11-23 02:07:47.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (13,2026,'2026-03-27 00:00:00.000','2026-10-24 00:00:00.000','2014-11-23 02:34:19.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (14,2027,'2027-03-26 00:00:00.000','2027-10-30 00:00:00.000','2014-11-23 02:35:18.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (15,2028,'2028-03-24 00:00:00.000','2028-10-28 00:00:00.000','2014-11-23 02:36:13.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (16,2029,'2029-03-23 00:00:00.000','2029-10-27 00:00:00.000','2014-11-23 02:37:06.000');
INSERT INTO `summer` (`id`,`year`,`begin`,`end`,`time`) VALUES (17,2030,'2030-03-29 00:00:00.000','2030-10-26 02:37:34.000','2014-11-23 02:38:10.000');





INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (1,'עלות השחר',13,0,0,'2011-10-11 13:27:17.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (2,'נץ החמה',107,2,1,'2011-10-11 13:30:29.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (3,'נץ הנראה',109,0,1,'2011-10-11 15:11:10.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (4,'סוזק\"ש מג\"א',18,0,0,'2011-10-11 15:15:21.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (5,'סוזק\"ש גר\"א',101,0,0,'2011-10-11 15:27:23.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (6,'סוז\"ת מג\"א',31,0,0,'2011-10-11 15:27:40.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (7,'סוז\"ת גר\"א',104,0,0,'2011-10-11 15:28:01.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (8,'חצות',94,0,0,'2011-10-11 15:28:08.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (9,'מנחה גדולה',44,0,0,'2011-10-11 15:28:15.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (10,'מנחה קטנה',105,0,0,'2011-10-11 15:28:33.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (11,'פלג המנחה',106,0,0,'2011-10-11 15:28:48.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (12,'שקיעה במישור',108,0,0,'2011-10-11 15:29:04.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (13,'שקיעה נראית',111,0,0,'2011-10-11 15:29:17.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (14,'צאת הכוכבים',71,0,0,'2011-10-11 15:29:29.000',0);
INSERT INTO `zmanim` (`id`,`name`,`base`,`igul`,`add`,`time`,`ord`) VALUES (15,'ר\"ת',79,0,-8,'2011-10-11 15:29:34.000',0);

INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (1,'PlagHamincha120MinutesZmanis','PlagHamincha120MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (2,'PlagHamincha120Minutes','PlagHamincha120Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (3,'Alos60','Alos60','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (4,'Alos72Zmanis','Alos72Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (5,'Alos96','Alos96','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (6,'Alos90Zmanis','Alos90Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (7,'Alos96Zmanis','Alos96Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (8,'Alos90','Alos90','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (9,'Alos120','Alos120','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (10,'Alos120Zmanis','Alos120Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (11,'Alos26Degrees','Alos26Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (12,'Alos18Degrees','עלות 18 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (13,'Alos19Point8Degrees','עלות 19.8 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (14,'Alos16Point1Degrees','עלות 16.1 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (15,'Misheyakir11Point5Degrees','Misheyakir11Point5Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (16,'Misheyakir11Degrees','Misheyakir11Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (17,'Misheyakir10Point2Degrees','Misheyakir10Point2Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (18,'SofZmanShmaMGA19Point8Degrees','סוזק\"ש מג\"א 19.8 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (19,'SofZmanShmaMGA16Point1Degrees','סוזק\"ש מג\"א 16.1 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (20,'SofZmanShmaMGA72Minutes','SofZmanShmaMGA72Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (21,'SofZmanShmaMGA72MinutesZmanis','SofZmanShmaMGA72MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (22,'SofZmanShmaMGA90Minutes','SofZmanShmaMGA90Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (23,'SofZmanShmaMGA90MinutesZmanis','SofZmanShmaMGA90MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (24,'SofZmanShmaMGA96Minutes','SofZmanShmaMGA96Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (25,'SofZmanShmaMGA96MinutesZmanis','SofZmanShmaMGA96MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (26,'SofZmanShma3HoursBeforeChatzos','SofZmanShma3HoursBeforeChatzos','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (27,'SofZmanShmaMGA120Minutes','SofZmanShmaMGA120Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (28,'SofZmanShmaAlos16Point1ToSunset','SofZmanShmaAlos16Point1ToSunset','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (29,'SofZmanShmaAlos16Point1ToTzaisGeonim7Point083Degrees','SofZmanShmaAlos16Point1ToTzaisGeonim7Point083Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (30,'SofZmanShmaKolEliyahu','SofZmanShmaKolEliyahu','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (31,'SofZmanTfilaMGA19Point8Degrees','סו\"ז תפילה מג\"א 19.8 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (32,'SofZmanTfilaMGA16Point1Degrees','SofZmanTfilaMGA16Point1Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (33,'SofZmanTfilaMGA72Minutes','SofZmanTfilaMGA72Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (34,'SofZmanTfilaMGA72MinutesZmanis','SofZmanTfilaMGA72MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (35,'SofZmanTfilaMGA90Minutes','SofZmanTfilaMGA90Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (36,'SofZmanTfilaMGA90MinutesZmanis','SofZmanTfilaMGA90MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (37,'SofZmanTfilaMGA96Minutes','SofZmanTfilaMGA96Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (38,'SofZmanTfilaMGA96MinutesZmanis','SofZmanTfilaMGA96MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (39,'SofZmanTfilaMGA120Minutes','SofZmanTfilaMGA120Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (40,'SofZmanTfila2HoursBeforeChatzos','SofZmanTfila2HoursBeforeChatzos','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (41,'MinchaGedola30Minutes','MinchaGedola30Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (42,'MinchaGedola72Minutes','MinchaGedola72Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (43,'MinchaGedola16Point1Degrees','MinchaGedola16Point1Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (44,'MinchaGedolaGreaterThan30','מנחה גדולה לחומרה 30 דקות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (45,'MinchaKetana16Point1Degrees','MinchaKetana16Point1Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (46,'MinchaKetana72Minutes','MinchaKetana72Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (47,'PlagHamincha60Minutes','PlagHamincha60Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (48,'PlagHamincha72Minutes','PlagHamincha72Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (49,'PlagHamincha90Minutes','PlagHamincha90Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (50,'PlagHamincha96Minutes','PlagHamincha96Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (51,'PlagHamincha96MinutesZmanis','PlagHamincha96MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (52,'PlagHamincha90MinutesZmanis','PlagHamincha90MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (53,'PlagHamincha72MinutesZmanis','PlagHamincha72MinutesZmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (54,'PlagHamincha16Point1Degrees','PlagHamincha16Point1Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (55,'PlagHamincha19Point8Degrees','PlagHamincha19Point8Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (56,'PlagHamincha26Degrees','PlagHamincha26Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (57,'PlagHamincha18Degrees','PlagHamincha18Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (58,'PlagAlosToSunset','PlagAlosToSunset','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (59,'PlagAlos16Point1ToTzaisGeonim7Point083Degrees','PlagAlos16Point1ToTzaisGeonim7Point083Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (60,'BainHasmashosRT13Degrees','BainHasmashosRT13Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (61,'BainHasmashosRT58Point5Minutes','BainHasmashosRT58Point5Minutes','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (62,'BainHasmashosRT13Point5MinutesBefore7Point083Degrees','BainHasmashosRT13Point5MinutesBefore7Point083Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (63,'BainHasmashosRT2Stars','BainHasmashosRT2Stars','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (64,'TzaisGeonim5Point95Degrees','TzaisGeonim5Point95Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (65,'TzaisGeonim3Point65Degrees','TzaisGeonim3Point65Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (66,'TzaisGeonim4Point61Degrees','TzaisGeonim4Point61Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (67,'TzaisGeonim4Point37Degrees','TzaisGeonim4Point37Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (68,'TzaisGeonim5Point88Degrees','TzaisGeonim5Point88Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (69,'TzaisGeonim4Point8Degrees','TzaisGeonim4Point8Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (70,'TzaisGeonim7Point083Degrees','TzaisGeonim7Point083Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (71,'TzaisGeonim8Point5Degrees','צאה\"כ גאונים 8.5 מעלות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (72,'Tzais60','Tzais60','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (73,'TzaisAteretTorah','TzaisAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (74,'SofZmanShmaAteretTorah','SofZmanShmaAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (75,'SofZmanTfilahAteretTorah','SofZmanTfilahAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (76,'MinchaGedolaAteretTorah','MinchaGedolaAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (77,'MinchaKetanaAteretTorah','MinchaKetanaAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (78,'PlagHaminchaAteretTorah','PlagHaminchaAteretTorah','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (79,'Tzais72Zmanis','Tzais72Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (80,'Tzais90Zmanis','Tzais90Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (81,'Tzais96Zmanis','Tzais96Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (82,'Tzais90','Tzais90','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (83,'Tzais120','Tzais120','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (84,'Tzais120Zmanis','Tzais120Zmanis','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (85,'Tzais16Point1Degrees','Tzais16Point1Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (86,'Tzais26Degrees','Tzais26Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (87,'Tzais18Degrees','Tzais18Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (88,'Tzais19Point8Degrees','Tzais19Point8Degrees','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (89,'Tzais96','Tzais96','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (90,'FixedLocalChatzos','FixedLocalChatzos','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (91,'SofZmanShmaFixedLocal','SofZmanShmaFixedLocal','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (92,'SofZmanTfilaFixedLocal','SofZmanTfilaFixedLocal','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (93,'SofZmanShmaMGA','SofZmanShmaMGA','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (94,'Chatzos','חצות','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (95,'SofZmanTfilaMGA','SofZmanTfilaMGA','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (96,'Alos72','Alos72','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (97,'MinchaGedola','MinchaGedola','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (98,'Tzais','Tzais','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (99,'AlosHashachar','AlosHashachar','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (100,'SolarMidnight','SolarMidnight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (101,'SofZmanShmaGRA','סוזק\"ש גר\"א','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (102,'Tzais72','Tzais72','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (103,'CandelLighting','CandelLighting','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (104,'SofZmanTfilaGRA','סו\"ז תפילה גר\"א','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (105,'MinchaKetana','מנחה קטנה','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (106,'PlagHamincha','פלג המנחה','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (107,'SeaLevelSunrise','נץ גובה פני הים','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (108,'SeaLevelSunset','שקיעה גובה פני הים','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (109,'Sunrise','נץ הנראה','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (110,'SunTransit','SunTransit','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (111,'Sunset','שקיעה הנראית','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (112,'BeginCivilTwilight','BeginCivilTwilight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (113,'BeginNauticalTwilight','BeginNauticalTwilight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (114,'BeginAstronomicalTwilight','BeginAstronomicalTwilight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (115,'EndCivilTwilight','EndCivilTwilight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (116,'EndNauticalTwilight','EndNauticalTwilight','2011-10-11 00:53:08.000');
INSERT INTO `zmanim_base` (`id`,`en`,`he`,`time`) VALUES (117,'EndAstronomicalTwilight','EndAstronomicalTwilight','2011-10-11 00:53:08.000');