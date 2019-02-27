/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 27/02/2019 15:27:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL,
  `topic_no` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `11`(`nickname`) USING BTREE,
  INDEX `12`(`topic_no`) USING BTREE,
  CONSTRAINT `11` FOREIGN KEY (`nickname`) REFERENCES `user` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `12` FOREIGN KEY (`topic_no`) REFERENCES `topic` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (5, '55', '1111', '2019-01-25 20:07:46', 6);
INSERT INTO `comment` VALUES (7, '55', '3333333333', '2019-01-27 21:23:00', 6);
INSERT INTO `comment` VALUES (8, '55', '444444', '2019-01-27 21:26:00', 6);
INSERT INTO `comment` VALUES (9, '55', '66666666666', '2019-01-27 21:27:00', 6);
INSERT INTO `comment` VALUES (10, 'jack', '22222222', '2019-01-27 21:28:00', 6);
INSERT INTO `comment` VALUES (11, '55', '2222222', '2019-02-24 16:11:00', 22);
INSERT INTO `comment` VALUES (13, '55', '123456789', '2019-02-24 16:25:00', 13);
INSERT INTO `comment` VALUES (14, '55', '2222', '2019-02-24 16:39:00', 22);
INSERT INTO `comment` VALUES (15, '55', '222222222', '2019-02-24 16:39:00', 21);
INSERT INTO `comment` VALUES (16, '55', '345678', '2019-02-24 16:40:00', 20);

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic`  (
  `topic_id` int(10) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topic_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `posted_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `posted_time` datetime(0) NOT NULL,
  PRIMARY KEY (`topic_id`) USING BTREE,
  INDEX `post_name`(`posted_name`) USING BTREE,
  CONSTRAINT `111` FOREIGN KEY (`posted_name`) REFERENCES `user` (`nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES (6, 'node', 'node啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 'nancy', '2019-01-02 15:48:34');
INSERT INTO `topic` VALUES (13, '666666', '66666666', '44', '2019-01-05 15:03:43');
INSERT INTO `topic` VALUES (20, 'qqq', 'qqqqqqqqq', 'jack', '2019-01-27 14:17:41');
INSERT INTO `topic` VALUES (21, '222222', '3333333333', 'jack', '2019-01-27 14:32:31');
INSERT INTO `topic` VALUES (22, '3333', '5555555555', '55', '2019-01-27 16:18:36');
INSERT INTO `topic` VALUES (23, '55555555555', '55555555555', '55', '2019-02-24 16:47:38');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_time` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(255) NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT NULL,
  `bio` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `nickname`(`nickname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (14, '11@126.com', 'jack', 'ec6a6536ca304edf844d1d248a4f08dc', '2018-12-06 16:26:12', NULL, 1, '2019-01-02', NULL, NULL);
INSERT INTO `user` VALUES (21, '22@126.com', 'nancy', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (26, '23@126.com', '23', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (27, '44@123.com', '44', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (28, '112@126.com', '11', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, 1, '2019-01-02', NULL, NULL);
INSERT INTO `user` VALUES (29, '113@126.com', '11', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (30, '33@126.com', '11', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (32, '12@123.com', '12', 'ec6a6536ca304edf844d1d248a4f08dc', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (33, '55@123.com', '55', 'ec6a6536ca304edf844d1d248a4f08dc', '2019-01-27 14:44:42', NULL, 1, '1996-11-18', NULL, NULL);
INSERT INTO `user` VALUES (34, '66@123.com', '66', 'ec6a6536ca304edf844d1d248a4f08dc', '2019-01-27 15:23:14', NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
