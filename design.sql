/*
Navicat MySQL Data Transfer

Source Server         : mldn
Source Server Version : 50022
Source Host           : localhost:3306
Source Database       : design

Target Server Type    : MYSQL
Target Server Version : 50022
File Encoding         : 65001

Date: 2019-04-02 23:24:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for 专辑列表
-- ----------------------------
DROP TABLE IF EXISTS `专辑列表`;
CREATE TABLE `专辑列表` (
  `CDId` int(5) NOT NULL auto_increment COMMENT '专辑ID',
  `singerId` int(5) default NULL,
  `CDName` varchar(10) default NULL COMMENT '专辑名称',
  `CDImg` varchar(20) default NULL,
  PRIMARY KEY  (`CDId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 专辑列表
-- ----------------------------
INSERT INTO `专辑列表` VALUES ('1', '4', '绅士', '绅士.jpg');
INSERT INTO `专辑列表` VALUES ('2', '2', '小梦大半', '小梦大半.jpg');
INSERT INTO `专辑列表` VALUES ('3', '2', '如也', '如也.jpg');
INSERT INTO `专辑列表` VALUES ('4', '3', '光年之外', '光年之外.jpg');
INSERT INTO `专辑列表` VALUES ('5', '3', '另一个童话', '另一个童话.jpg');
INSERT INTO `专辑列表` VALUES ('6', '3', 'A.I.N.Y.爱你', 'A.I.N.Y. 爱你.jpg');
INSERT INTO `专辑列表` VALUES ('7', '3', '新的心跳', '新的心跳.jpg');
INSERT INTO `专辑列表` VALUES ('8', '3', 'The Best of G.E.M', 'The Best of G.E.M.jpg');
INSERT INTO `专辑列表` VALUES ('9', '5', '云烟成雨', '云烟成雨.jpg');
INSERT INTO `专辑列表` VALUES ('10', '5', '美好事物', '美好事物.jpg');
INSERT INTO `专辑列表` VALUES ('11', '6', '粥请客', '粥请客.jpg');
INSERT INTO `专辑列表` VALUES ('12', '7', '渺小', '渺小.jpg');
INSERT INTO `专辑列表` VALUES ('13', '7', 'My Love', 'My Love.jpg');
INSERT INTO `专辑列表` VALUES ('14', '8', '自定义', '自定义.jpg');
INSERT INTO `专辑列表` VALUES ('15', '8', '青年晚报', '青年晚报.jpg');
INSERT INTO `专辑列表` VALUES ('16', '8', '不如吃茶去', '不如吃茶去.jpg');
INSERT INTO `专辑列表` VALUES ('21', '4', '123', '123.jpg');
INSERT INTO `专辑列表` VALUES ('22', '8', '1234', '123.jpg');

-- ----------------------------
-- Table structure for 播放列表
-- ----------------------------
DROP TABLE IF EXISTS `播放列表`;
CREATE TABLE `播放列表` (
  `id` int(5) NOT NULL auto_increment COMMENT '序号',
  `songId` int(5) NOT NULL COMMENT '播放音乐的id(歌曲id）',
  `userId` int(5) NOT NULL COMMENT '用户id',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `qq` (`songId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 播放列表
-- ----------------------------
INSERT INTO `播放列表` VALUES ('68', '1', '32');
INSERT INTO `播放列表` VALUES ('2', '2', '6');
INSERT INTO `播放列表` VALUES ('46', '3', '6');
INSERT INTO `播放列表` VALUES ('66', '4', '6');
INSERT INTO `播放列表` VALUES ('58', '5', '6');
INSERT INTO `播放列表` VALUES ('54', '6', '6');
INSERT INTO `播放列表` VALUES ('65', '7', '1');
INSERT INTO `播放列表` VALUES ('53', '7', '6');
INSERT INTO `播放列表` VALUES ('52', '8', '6');
INSERT INTO `播放列表` VALUES ('51', '9', '6');
INSERT INTO `播放列表` VALUES ('49', '9', '30');
INSERT INTO `播放列表` VALUES ('55', '10', '6');
INSERT INTO `播放列表` VALUES ('62', '11', '6');
INSERT INTO `播放列表` VALUES ('50', '11', '30');
INSERT INTO `播放列表` VALUES ('67', '14', '6');
INSERT INTO `播放列表` VALUES ('61', '15', '6');
INSERT INTO `播放列表` VALUES ('64', '16', '6');
INSERT INTO `播放列表` VALUES ('59', '19', '6');
INSERT INTO `播放列表` VALUES ('63', '20', '6');
INSERT INTO `播放列表` VALUES ('56', '21', '6');
INSERT INTO `播放列表` VALUES ('57', '22', '6');
INSERT INTO `播放列表` VALUES ('69', '26', '6');
INSERT INTO `播放列表` VALUES ('70', '31', '6');

-- ----------------------------
-- Table structure for 收藏列表
-- ----------------------------
DROP TABLE IF EXISTS `收藏列表`;
CREATE TABLE `收藏列表` (
  `id` int(5) NOT NULL auto_increment COMMENT '收藏ID',
  `userId` int(5) NOT NULL COMMENT '用户ID',
  `songId` int(5) NOT NULL COMMENT '歌曲ID',
  `songSheet` int(5) NOT NULL COMMENT '歌单id',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `q4` (`id`),
  UNIQUE KEY `q5` USING BTREE (`userId`,`songId`,`songSheet`),
  KEY `q2` (`songId`),
  KEY `q3` (`songSheet`),
  CONSTRAINT `q1` FOREIGN KEY (`userId`) REFERENCES `用户列表` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `q2` FOREIGN KEY (`songId`) REFERENCES `歌曲列表` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `q3` FOREIGN KEY (`songSheet`) REFERENCES `歌单列表` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 收藏列表
-- ----------------------------
INSERT INTO `收藏列表` VALUES ('44', '6', '1', '5');
INSERT INTO `收藏列表` VALUES ('52', '6', '2', '3');
INSERT INTO `收藏列表` VALUES ('36', '6', '2', '4');
INSERT INTO `收藏列表` VALUES ('43', '6', '2', '5');
INSERT INTO `收藏列表` VALUES ('42', '6', '2', '10');
INSERT INTO `收藏列表` VALUES ('34', '6', '3', '3');
INSERT INTO `收藏列表` VALUES ('37', '6', '3', '4');
INSERT INTO `收藏列表` VALUES ('39', '6', '3', '7');
INSERT INTO `收藏列表` VALUES ('41', '6', '3', '10');
INSERT INTO `收藏列表` VALUES ('48', '6', '9', '5');
INSERT INTO `收藏列表` VALUES ('51', '6', '20', '3');

-- ----------------------------
-- Table structure for 歌单列表
-- ----------------------------
DROP TABLE IF EXISTS `歌单列表`;
CREATE TABLE `歌单列表` (
  `id` int(5) NOT NULL auto_increment,
  `userId` int(5) NOT NULL COMMENT '用户id',
  `songSheet` varchar(20) default NULL COMMENT '歌单',
  `songImg` varchar(20) default NULL COMMENT '歌单图片',
  `addTime` date default NULL COMMENT '添加时间',
  `introduce` varchar(255) default NULL COMMENT '歌单介绍',
  PRIMARY KEY  (`id`,`userId`),
  UNIQUE KEY `adw` USING BTREE (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `用户列表` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 歌单列表
-- ----------------------------
INSERT INTO `歌单列表` VALUES ('2', '6', '我喜欢的音乐', 'introSong.jpg', '2019-01-21', null);
INSERT INTO `歌单列表` VALUES ('3', '6', '音乐', 'introSong.jpg', '2019-01-20', 'ceshi');
INSERT INTO `歌单列表` VALUES ('4', '6', '喜欢听的', 'introSong.jpg', '2019-01-21', '1232231333');
INSERT INTO `歌单列表` VALUES ('5', '6', '我阿达大大多无', 'introSong.jpg', '2019-02-11', '122');
INSERT INTO `歌单列表` VALUES ('7', '6', 'wdajfj ', 'introSong.jpg', '2019-02-17', '123231232331');
INSERT INTO `歌单列表` VALUES ('10', '6', 'faiighw', 'introSong.jpg', '2019-02-27', '测试');
INSERT INTO `歌单列表` VALUES ('31', '6', '123456', 'introSong.jpg', '2019-03-02', '1');
INSERT INTO `歌单列表` VALUES ('32', '30', '1123', 'introSong.jpg', '2019-03-09', null);

-- ----------------------------
-- Table structure for 歌手信息
-- ----------------------------
DROP TABLE IF EXISTS `歌手信息`;
CREATE TABLE `歌手信息` (
  `singerID` int(5) NOT NULL auto_increment COMMENT '歌手id',
  `singerName` varchar(10) NOT NULL COMMENT '歌手名字',
  `singerImg` varchar(30) default NULL,
  `Description` varchar(255) default NULL COMMENT '歌手描述',
  PRIMARY KEY  (`singerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 歌手信息
-- ----------------------------
INSERT INTO `歌手信息` VALUES ('2', '陈粒', '陈粒.jpg', '陈粒，又名粒粒，1990年7月26日出生于贵州省贵阳市，中国内地民谣女歌手、独立音乐人、唱作人，前空想家乐队主唱，毕业于上海对外经贸大学。');
INSERT INTO `歌手信息` VALUES ('3', '邓紫棋', '邓紫棋.jpg', '邓紫棋成长于一个音乐世家，其母亲为上海音乐学院声乐系毕业生，外婆教唱歌，舅父拉小提琴，外公在乐团吹色士风。在家人的熏陶下，自小便热爱音乐，喜爱唱歌，与音乐结下不解之缘。');
INSERT INTO `歌手信息` VALUES ('4', '薛之谦', '薛之谦.jpg', '薛之谦（Joker Xue），1983年7月17日出生于上海，华语流行乐男歌手、影视演员、音乐制作人，毕业于格里昂酒店管理学院。 2005年，参加选秀节目《我型我秀》正式出道 。2006年，发行首张同名专辑《薛之谦》，随后凭借歌曲《认真的雪》获得广泛关注。');
INSERT INTO `歌手信息` VALUES ('5', '房东的猫', '房东的猫.jpg', '快乐的民谣小组合 ：） 2018快结束了，新的一年又要开始了。这一年去了很多城市，是时候带着新的作品回到武汉。2018年12月31日，房东的猫武汉跨年演唱会——「白」，我们一起度过2018最后一个夜晚。');
INSERT INTO `歌手信息` VALUES ('6', '花粥', '花粥.jpg', '花粥是一名优秀的少先队员，英雄联盟召唤师，完全贯彻社会主义核心价值观的先进音乐工作者。');
INSERT INTO `歌手信息` VALUES ('7', '田馥甄', '田馥甄.jpg', '田馥甄，艺名Hebe，台湾知名女艺人，女子演唱团体S.H.E组合成员，出生于台湾新竹县新丰乡，于2000年参加“宇宙2000实力美少女争霸战”选秀活动，并于同年与宇宙唱片（华研唱片前身）签约培训，接着在隔年与Selina、Ella组成S.H.E，并于2001年9月11日发行S.H.E首张专辑《女生宿舍》正式出道。');
INSERT INTO `歌手信息` VALUES ('8', '许嵩', '许嵩.jpg', '著名作词人、作曲人、唱片制作人、歌手。内地独立音乐之标杆人物，有音乐鬼才之称。2009年独立出版首张词曲全创作专辑《自定义》，2010年独立出版第二张词曲全创作专辑《寻雾启示》，两度掀起讨论热潮，一跃成为内地互联网讨论度最高的独立音乐人。');

-- ----------------------------
-- Table structure for 歌曲列表
-- ----------------------------
DROP TABLE IF EXISTS `歌曲列表`;
CREATE TABLE `歌曲列表` (
  `Id` int(5) NOT NULL auto_increment COMMENT '歌曲编号',
  `MusicName` varchar(15) default NULL COMMENT '歌曲名称',
  `SingerId` int(5) default NULL COMMENT '歌手ID',
  `MusicUrl` varchar(20) default NULL COMMENT '歌曲来源（地址）',
  `Lyric` varchar(20) default NULL COMMENT '歌词地址',
  `clicks` int(4) default NULL COMMENT '点击次数',
  `classify` varchar(20) default NULL,
  `CDId` int(5) default NULL COMMENT '所属专辑',
  `songTime` int(4) default NULL COMMENT '歌曲时长',
  `addTime` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY  (`Id`),
  KEY `fafw` (`SingerId`),
  KEY `fwaf` (`CDId`),
  CONSTRAINT `fafw` FOREIGN KEY (`SingerId`) REFERENCES `歌手信息` (`singerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fwaf` FOREIGN KEY (`CDId`) REFERENCES `专辑列表` (`CDId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 歌曲列表
-- ----------------------------
INSERT INTO `歌曲列表` VALUES ('1', '演员', '4', '演员.mp3', '演员.lrc', '5', '华语', '1', '300', '2019-03-28 00:09:31');
INSERT INTO `歌曲列表` VALUES ('2', '绅士', '4', '绅士.mp3', '绅士.lrc', '3', '华语、流行', '1', '291', '2019-03-10 23:38:57');
INSERT INTO `歌曲列表` VALUES ('3', '小半', '2', '小半.mp3', '小半.lrc', '29', '华语', '2', '297', '2019-03-31 22:38:48');
INSERT INTO `歌曲列表` VALUES ('4', '易燃易爆炸', '2', '易燃易爆炸.mp3', '易燃易爆炸.lrc', '9', '华语、电子、摇滚', '3', '200', '2019-03-27 18:28:56');
INSERT INTO `歌曲列表` VALUES ('5', '走马', '2', '走马.mp3', '走马.lrc', '11', '华语、流行、', '3', '235', '2019-03-27 18:28:51');
INSERT INTO `歌曲列表` VALUES ('6', '虚拟', '2', '虚拟.mp3', '虚拟.lrc', '3', '华语、电子', '3', '240', '2019-03-27 18:29:01');
INSERT INTO `歌曲列表` VALUES ('7', '光', '2', '光.mp3', '光.lrc', '3', '华语、电子', '3', '141', '2019-03-27 18:29:09');
INSERT INTO `歌曲列表` VALUES ('8', '奇妙能力歌', '2', '奇妙能力歌.mp3', '奇妙能力歌.lrc', '1', '华语、流行', '3', '253', '2019-03-08 21:27:24');
INSERT INTO `歌曲列表` VALUES ('9', '光年之外', '3', '光年之外.mp3', '光年之外.lrc', '4', '华语、民谣', '4', '235', '2019-03-27 18:29:17');
INSERT INTO `歌曲列表` VALUES ('10', '倒数', '3', '倒数.mp3', '倒数.lrc', '3', '华语', '5', '229', '2019-03-28 15:26:18');
INSERT INTO `歌曲列表` VALUES ('11', '我的秘密', '3', '我的秘密.mp3', '我的秘密.lrc', '1', '华语、流行', '6', '250', '2019-03-08 21:27:22');
INSERT INTO `歌曲列表` VALUES ('12', '再见', '3', '再见.mp3', '再见.lrc', '1', '华语', '7', '206', '2019-03-08 21:26:24');
INSERT INTO `歌曲列表` VALUES ('13', '泡沫', '3', '泡沫.mp3', '泡沫.lrc', '1', '华语', '8', '258', '2019-03-08 21:26:25');
INSERT INTO `歌曲列表` VALUES ('14', '云烟成雨', '5', '云烟成雨.mp3', '云烟成雨.lrc', '3', '华语、摇滚', '9', '240', '2019-03-27 18:29:22');
INSERT INTO `歌曲列表` VALUES ('15', '美好事物', '5', '美好事物.mp3', '美好事物.lrc', '2', '华语、摇滚', '10', '198', '2019-03-28 15:24:48');
INSERT INTO `歌曲列表` VALUES ('16', '盗将行', '6', '盗将行.mp3', '盗将行.lrc', '1', '华语、流行、民谣', '11', '198', '2019-03-27 18:28:34');
INSERT INTO `歌曲列表` VALUES ('17', '出山', '6', '出山.mp3', '出山.lrc', '1', '华语、民谣、电子', '11', '200', '2019-03-27 18:29:31');
INSERT INTO `歌曲列表` VALUES ('19', '魔鬼中的天使', '7', '魔鬼中的天使.mp3', '魔鬼中的天使.lrc', '1', '华语、流行', '13', '238', '2019-03-08 21:27:19');
INSERT INTO `歌曲列表` VALUES ('20', '有何不可', '8', '有何不可.mp3', '有何不可.lrc', '1', '华语、流行', '14', '241', '2019-03-08 21:27:17');
INSERT INTO `歌曲列表` VALUES ('21', '雅俗共赏', '8', '雅俗共赏.mp3', '雅俗共赏.lrc', '1', '华语', '15', '249', '2019-03-08 21:26:30');
INSERT INTO `歌曲列表` VALUES ('22', '惊鸿一面', '8', '惊鸿一面.mp3', '惊鸿一面.lrc', '1', '华语', '16', '256', '2019-03-08 21:26:33');
INSERT INTO `歌曲列表` VALUES ('23', '丑八怪', '4', '丑八怪.mp3', '丑八怪.lrc', '1', '华语', '1', '253', '2019-03-25 01:18:58');
INSERT INTO `歌曲列表` VALUES ('26', '你就不要想起我', '7', '你就不要想起我.mp3', '你就不要想起我.lrc', '4', '华语', '12', '280', '2019-03-28 11:58:41');
INSERT INTO `歌曲列表` VALUES ('28', 'fwfw', '8', '1.mp3', '1.lrc', null, null, '15', '200', '2019-03-25 23:02:20');
INSERT INTO `歌曲列表` VALUES ('29', 'fhiawiwg', '2', '1.mp3', '1.lrc', null, null, '1', '200', '2019-03-28 00:00:00');
INSERT INTO `歌曲列表` VALUES ('30', '31313', '2', '1.mp3', '1.lrc', null, null, '1', '200', '2019-03-28 00:00:00');
INSERT INTO `歌曲列表` VALUES ('31', '31313', '4', '演员.mp3', '演员.lrc', null, null, '1', '200', '2019-03-28 00:00:00');

-- ----------------------------
-- Table structure for 用户列表
-- ----------------------------
DROP TABLE IF EXISTS `用户列表`;
CREATE TABLE `用户列表` (
  `userId` int(5) NOT NULL auto_increment COMMENT '用户ID',
  `accounts` varchar(10) default NULL COMMENT '帐号',
  `password` varchar(10) default NULL COMMENT '密码',
  `nickname` varchar(12) default NULL,
  `Introduce` varchar(255) default NULL,
  `gender` int(1) default NULL,
  `birthday` date default NULL,
  `photo` varchar(20) default NULL,
  PRIMARY KEY  (`userId`),
  UNIQUE KEY `uniqueAccount` (`accounts`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 用户列表
-- ----------------------------
INSERT INTO `用户列表` VALUES ('1', '123456', 'a12345', 'gwg', null, '1', '2000-03-07', 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('6', '844058576', 'q12345', 'ceshi', null, '0', null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('7', 'wqqrwqr', 'qqe2133', '12345', null, '2', null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('8', 'fawfsg', 'gagagaw', 'avsaga', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('13', 'nfgnfnf', 'nfggnhthn', 'geb', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('14', 'fafabfbb', 'bdbdfgg', 'gegege', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('15', 'fagvdf', 'bsfbsfbs', 'fefeg', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('16', 'fasfafvz', 'afsasafaf', 'vdae', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('20', '124143141', '121241241', '1412412', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('21', 'adwqeqe', 'qeqweq', 'eqeqew', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('22', 'wgwage', 'wgwagawg', 'wagawg', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('26', 'gagewgwegg', 'wegewgweg', 'gwegwgwe', 'gwegwg', '1', '2019-03-09', 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('27', 'fewqrq', 'qwr1e1e', 'r12rrq', 'qr21ra', '0', '2019-03-01', 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('28', 'gegwhnxn', 'nxnx', 'nfnfn', 'nfnf', '2', '2019-02-13', 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('29', 'nfhhdfhdh', 'dhdfhd', 'hdfhfd', 'hdfhdh', '2', '2019-03-06', 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('30', 'afsafasfas', 'vzxvzvz', '7467446', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('31', 'bbdfddj', 'vdsvsd', '用户275704134', null, null, null, 'touxiang.jpg');
INSERT INTO `用户列表` VALUES ('32', '1312vavaa', 'fwefw12314', '用户602105265', null, null, null, 'touxiang.jpg');

-- ----------------------------
-- Table structure for 管理员表
-- ----------------------------
DROP TABLE IF EXISTS `管理员表`;
CREATE TABLE `管理员表` (
  `id` int(5) NOT NULL auto_increment,
  `account` varchar(10) default NULL,
  `password` varchar(10) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 管理员表
-- ----------------------------
INSERT INTO `管理员表` VALUES ('1', '123456', '123456');
INSERT INTO `管理员表` VALUES ('2', '844058576', 'q12345');

-- ----------------------------
-- Table structure for 评论列表
-- ----------------------------
DROP TABLE IF EXISTS `评论列表`;
CREATE TABLE `评论列表` (
  `id` int(5) NOT NULL auto_increment COMMENT '评论id',
  `userId` int(5) default NULL COMMENT '用户id',
  `content` varchar(140) default NULL COMMENT '评论内容',
  `p_nick` varchar(5) default NULL COMMENT '回复id',
  `p_content` varchar(140) default NULL COMMENT '回复内容',
  `songId` int(5) default NULL COMMENT '歌曲id',
  `c_time` date default NULL COMMENT '评论时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 评论列表
-- ----------------------------
INSERT INTO `评论列表` VALUES ('1', '6', '测试', null, null, '1', '2019-03-01');
INSERT INTO `评论列表` VALUES ('2', '7', '12345', 'ceshi', '测试', '1', '2019-03-02');
INSERT INTO `评论列表` VALUES ('3', '6', 'faawgagag', null, null, '1', '2019-03-03');
INSERT INTO `评论列表` VALUES ('4', '8', 'worw giwajgi ojwai j', null, null, '1', '2019-03-03');
INSERT INTO `评论列表` VALUES ('5', '6', 'niwogwngwughwaqoitqtwq', null, null, '1', '2019-03-03');
INSERT INTO `评论列表` VALUES ('6', '8', '你好', null, null, '1', '2019-03-03');
INSERT INTO `评论列表` VALUES ('7', '8', '测试', null, null, '1', '2019-03-03');
INSERT INTO `评论列表` VALUES ('12', '6', '1', null, null, '22', '2019-03-03');
INSERT INTO `评论列表` VALUES ('13', '6', '123123', null, null, '22', '2019-03-03');
INSERT INTO `评论列表` VALUES ('18', '6', '12345', 'avsaga', '测试', '1', '2019-03-04');
INSERT INTO `评论列表` VALUES ('19', '6', '测试123456', 'ceshi', '12345', '1', '2019-03-04');
INSERT INTO `评论列表` VALUES ('21', '6', '测试', null, null, '18', '2019-03-04');
INSERT INTO `评论列表` VALUES ('23', '6', '1231214', null, null, '10', '2019-03-04');
INSERT INTO `评论列表` VALUES ('24', '6', '1234', 'ceshi', '简单！', '1', '2019-03-04');
INSERT INTO `评论列表` VALUES ('25', '6', '123', null, null, '7', '2019-03-06');
INSERT INTO `评论列表` VALUES ('30', '6', '1', null, null, '1', '2019-03-07');
INSERT INTO `评论列表` VALUES ('31', '6', '2', null, null, '1', '2019-03-07');
INSERT INTO `评论列表` VALUES ('32', '6', '3', 'ceshi', '2', '1', '2019-03-07');
INSERT INTO `评论列表` VALUES ('33', '6', '绅士', null, null, '2', '2019-03-09');
INSERT INTO `评论列表` VALUES ('34', '6', '小半', null, null, '3', '2019-03-09');
INSERT INTO `评论列表` VALUES ('35', '6', '123', 'ceshi', '小半', '3', '2019-03-09');
INSERT INTO `评论列表` VALUES ('36', '6', '易燃易爆炸', null, null, '4', '2019-03-09');
INSERT INTO `评论列表` VALUES ('37', '6', '123', null, null, '4', '2019-03-09');
INSERT INTO `评论列表` VALUES ('38', '6', '1', null, null, '1', '2019-03-09');
INSERT INTO `评论列表` VALUES ('40', '6', '测试', null, null, '7', '2019-03-21');
INSERT INTO `评论列表` VALUES ('41', '6', '测试', null, null, '7', '2019-03-21');
INSERT INTO `评论列表` VALUES ('42', '1', '回复123', 'ceshi', '测试', '7', '2019-03-21');
INSERT INTO `评论列表` VALUES ('43', '6', '123', null, null, '1', '2019-03-26');
INSERT INTO `评论列表` VALUES ('44', '31', '1', 'ceshi', '123', '1', '2019-03-27');
INSERT INTO `评论列表` VALUES ('45', '32', 'fwfwagewagwgwagwgwgwgaw', null, null, '1', '2019-03-28');
INSERT INTO `评论列表` VALUES ('46', '6', '1', null, null, '2', '2019-03-28');
