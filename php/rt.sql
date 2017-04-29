-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 27, 2017 at 01:56 AM
-- Server version: 5.6.30
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rt`
--

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE IF NOT EXISTS `analytics` (
  `analyticsId` int(11) NOT NULL,
  `eachDay` varchar(255) NOT NULL,
  `backlogRemainSP` float(10,1) unsigned NOT NULL,
  `backlogRemainBV` float(10,1) unsigned NOT NULL,
  `sprintId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `analytics`
--

INSERT INTO `analytics` (`analyticsId`, `eachDay`, `backlogRemainSP`, `backlogRemainBV`, `sprintId`) VALUES
(1, '2017-03-24', 2.0, 254.0, 1),
(2, '2017-03-18', 2.0, 25.0, 2),
(3, '2017-03-17', 25.0, 23.0, 3),
(5, '2017-03-27', 27.0, 48.0, 3),
(6, '2017-04-27', 29.0, 73.0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `backlog`
--

CREATE TABLE IF NOT EXISTS `backlog` (
  `backlogId` int(11) NOT NULL,
  `backlogType` varchar(255) NOT NULL,
  `backlogTitle` text,
  `backlogPriority` varchar(255) NOT NULL,
  `backlogStoryPoint` float(10,1) DEFAULT NULL,
  `backlogDesc` text,
  `date_created` varchar(255) NOT NULL,
  `date_modified` varchar(255) NOT NULL,
  `backlogCreator` varchar(255) NOT NULL,
  `backlogStatus` varchar(255) NOT NULL,
  `backlogBusinessValue` float(10,1) DEFAULT NULL,
  `sprintId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `backlog`
--

INSERT INTO `backlog` (`backlogId`, `backlogType`, `backlogTitle`, `backlogPriority`, `backlogStoryPoint`, `backlogDesc`, `date_created`, `date_modified`, `backlogCreator`, `backlogStatus`, `backlogBusinessValue`, `sprintId`) VALUES
(1, 'User Story', 'backlog1', 'Highest', 2.0, '2', '2017-03-23 18:43:44', '2017-03-23 18:43:46', 'd@gmail.com', 'Done', 254.0, 1),
(2, 'User Story', 'b', 'Highest', 1.0, '', '2017-03-23 19:35:21', '2017-03-23 19:35:23', 'd@gmail.com', 'Done', 25.0, 2),
(3, 'User Story', 'backlog 3', 'Highest', 25.0, '2', '2017-03-23 21:24:56', '2017-03-27 15:47:02', 'd@gmail.com', 'Assgined to active sprint', 23.0, 3),
(4, 'User Story', 'backlog 2', 'Highest', 2.0, 's', '2017-03-23 22:39:13', '2017-04-27 11:54:57', 'd@gmail.com', 'Assigned to active sprint', 25.0, 3),
(5, 'User Story', 'das', 'Highest', 2.0, 'dsa', '2017-03-23 22:49:28', '2017-03-27 15:55:14', 'd@gmail.com', 'Assigned to active sprint', 25.0, 3),
(6, 'User Story', 'd', 'Highest', 2.0, '2', '2017-03-23 22:56:26', '2017-03-24 13:11:54', 'd@gmail.com', 'Unassigned', 25.0, 0),
(7, 'User Story', 'd', 'Highest', 2.0, '', '2017-03-23 23:01:11', '2017-03-23 23:01:11', 'd@gmail.com', 'Unassigned', 25.0, 0),
(8, 'User Story', 'asd', 'Highest', 2.0, '', '2017-03-23 23:02:33', '2017-03-23 23:02:33', 'd@gmail.com', 'Unassigned', 25.0, 0),
(9, 'User Story', 'from abc', 'Highest', 2.0, 'b', '2017-03-25 13:23:52', '2017-03-25 13:24:01', 'd@gmail.com', 'Unassigned', 25.0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `backlogComment`
--

CREATE TABLE IF NOT EXISTS `backlogComment` (
  `backlogCommentId` int(11) NOT NULL,
  `backlogComment` text,
  `date_comment` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `backlogId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `backlogComment`
--

INSERT INTO `backlogComment` (`backlogCommentId`, `backlogComment`, `date_comment`, `email`, `backlogId`) VALUES
(1, 'asd', '2017-03-23 21:25:00', 'd@gmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `epic`
--

CREATE TABLE IF NOT EXISTS `epic` (
  `epicId` int(11) NOT NULL,
  `epicDescription` text NOT NULL,
  `projectKey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `projectKey` varchar(255) NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `projectDescription` text,
  `date_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`projectKey`, `projectName`, `projectDescription`, `date_created`) VALUES
('ABC123', 'abc', 'abc', '2017-03-25 11:07:13'),
('TP123', 'test proejct', 'desc', '2017-03-23 18:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `releaseBacklog`
--

CREATE TABLE IF NOT EXISTS `releaseBacklog` (
  `releaseId` int(11) NOT NULL,
  `backlogId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `releaseBacklog`
--

INSERT INTO `releaseBacklog` (`releaseId`, `backlogId`) VALUES
(1, 3),
(1, 4),
(2, 5),
(1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `releases`
--

CREATE TABLE IF NOT EXISTS `releases` (
  `releaseId` int(11) NOT NULL,
  `releaseName` varchar(255) NOT NULL,
  `releaseStartDate` varchar(255) DEFAULT NULL,
  `releaseEndDate` varchar(255) DEFAULT NULL,
  `releaseDesc` text,
  `releaseStatus` varchar(255) DEFAULT NULL,
  `projectKey` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `releases`
--

INSERT INTO `releases` (`releaseId`, `releaseName`, `releaseStartDate`, `releaseEndDate`, `releaseDesc`, `releaseStatus`, `projectKey`) VALUES
(1, 'version 1', '2017-03-24', '2017-05-19', '', 'Unreleased', 'TP123'),
(2, 'version 2', '2017-03-24', '2017-05-19', 'some goals for version over here', 'Unreleased', 'TP123');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `reviewId` int(11) NOT NULL,
  `review` text,
  `sprintId` int(11) NOT NULL,
  `backlogId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--

CREATE TABLE IF NOT EXISTS `sprint` (
  `sprintId` int(11) NOT NULL,
  `sprintStatus` varchar(255) DEFAULT NULL,
  `sprintGoal` text NOT NULL,
  `sprintStartDate` varchar(255) DEFAULT NULL,
  `sprintEndDate` varchar(255) DEFAULT NULL,
  `backlogTotalSP` float(10,1) unsigned NOT NULL,
  `backlogRemainSP` float(10,1) unsigned NOT NULL,
  `backlogTotalBV` float(10,1) unsigned NOT NULL,
  `backlogRemainBV` float(10,1) unsigned NOT NULL,
  `projectKey` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sprint`
--

INSERT INTO `sprint` (`sprintId`, `sprintStatus`, `sprintGoal`, `sprintStartDate`, `sprintEndDate`, `backlogTotalSP`, `backlogRemainSP`, `backlogTotalBV`, `backlogRemainBV`, `projectKey`) VALUES
(1, 'Done', 'asd', '2017-03-24', '2017-03-30', 2.0, 2.0, 254.0, 254.0, 'TP123'),
(2, 'Done', 'asd', '2017-03-18', '2017-03-31', 2.0, 2.0, 25.0, 25.0, 'TP123'),
(3, 'Active', 'asd', '2017-03-17', '2017-03-31', 29.0, 29.0, 73.0, 73.0, 'TP123');

-- --------------------------------------------------------

--
-- Table structure for table `taskComment`
--

CREATE TABLE IF NOT EXISTS `taskComment` (
  `taskCommentId` int(11) NOT NULL,
  `taskComment` text,
  `date_comment` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `tasksId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taskComment`
--

INSERT INTO `taskComment` (`taskCommentId`, `taskComment`, `date_comment`, `email`, `tasksId`) VALUES
(1, 'asd', '2017-03-27 15:57:13', 'd@gmail.com', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `tasksId` int(11) NOT NULL,
  `tasksTitle` text NOT NULL,
  `tasksDescription` text NOT NULL,
  `tasksStatus` varchar(255) NOT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_modified` varchar(255) DEFAULT NULL,
  `assignee` text,
  `backlogId` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`tasksId`, `tasksTitle`, `tasksDescription`, `tasksStatus`, `date_created`, `date_modified`, `assignee`, `backlogId`) VALUES
(2, 'test project. backlog 3. task 2', 'asdasdas', 'In-Progress', '2017-03-25 13:10:38', '2017-03-27 15:47:02', 'd@gmail.com', 3),
(3, 'from abc task', '2', 'To-do', '2017-03-25 13:24:01', '2017-03-25 13:24:01', 'd@gmail.com', 9),
(4, 'test project. backlog 2. task 1', 'No Description when this task was created', 'To-do', '2017-03-25 15:25:43', '2017-03-25 15:50:31', 'd@gmail.com', 4),
(5, 'test', 'sdasdas', 'In-Progress', '2017-03-26 16:04:21', '2017-03-26 16:14:11', 'd@gmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `upb`
--

CREATE TABLE IF NOT EXISTS `upb` (
  `uid` int(11) NOT NULL,
  `projectKey` varchar(255) NOT NULL,
  `backlogId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `upb`
--

INSERT INTO `upb` (`uid`, `projectKey`, `backlogId`) VALUES
(1, 'TP123', 1),
(1, 'TP123', 2),
(1, 'TP123', 3),
(1, 'TP123', 4),
(1, 'TP123', 5),
(1, 'TP123', 6),
(1, 'TP123', 7),
(1, 'TP123', 8),
(1, 'ABC123', 9);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_joined` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `email`, `password`, `date_joined`) VALUES
(1, 'd@gmail.com', '$6$rounds=1000$salted$di.VcOFywOs2qu27c2bUrRsSiIF6e3x83izcmWx4d/GANko2HjCNxWQphdsbpL0x3X4QIEHFFPteKQYxSZ5GY.', '2017-03-23 18:43:15');

-- --------------------------------------------------------

--
-- Table structure for table `userproject`
--

CREATE TABLE IF NOT EXISTS `userproject` (
  `uid` int(11) NOT NULL,
  `projectKey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userproject`
--

INSERT INTO `userproject` (`uid`, `projectKey`) VALUES
(1, 'ABC123'),
(1, 'TP123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`analyticsId`,`sprintId`),
  ADD KEY `sprintId` (`sprintId`);

--
-- Indexes for table `backlog`
--
ALTER TABLE `backlog`
  ADD PRIMARY KEY (`backlogId`);

--
-- Indexes for table `backlogComment`
--
ALTER TABLE `backlogComment`
  ADD PRIMARY KEY (`backlogCommentId`),
  ADD KEY `backlogId` (`backlogId`);

--
-- Indexes for table `epic`
--
ALTER TABLE `epic`
  ADD PRIMARY KEY (`epicId`,`projectKey`),
  ADD KEY `projectKey` (`projectKey`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectKey`);

--
-- Indexes for table `releaseBacklog`
--
ALTER TABLE `releaseBacklog`
  ADD PRIMARY KEY (`releaseId`,`backlogId`),
  ADD KEY `backlogId` (`backlogId`);

--
-- Indexes for table `releases`
--
ALTER TABLE `releases`
  ADD PRIMARY KEY (`releaseId`,`projectKey`),
  ADD KEY `projectKey` (`projectKey`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`reviewId`,`sprintId`,`backlogId`),
  ADD KEY `sprintId` (`sprintId`),
  ADD KEY `backlogId` (`backlogId`);

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`sprintId`,`projectKey`),
  ADD KEY `projectKey` (`projectKey`);

--
-- Indexes for table `taskComment`
--
ALTER TABLE `taskComment`
  ADD PRIMARY KEY (`taskCommentId`,`tasksId`),
  ADD KEY `tasksId` (`tasksId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`tasksId`,`backlogId`),
  ADD KEY `backlogId` (`backlogId`);

--
-- Indexes for table `upb`
--
ALTER TABLE `upb`
  ADD PRIMARY KEY (`uid`,`projectKey`,`backlogId`),
  ADD KEY `projectKey` (`projectKey`),
  ADD KEY `backlogId` (`backlogId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`,`email`);

--
-- Indexes for table `userproject`
--
ALTER TABLE `userproject`
  ADD PRIMARY KEY (`uid`,`projectKey`),
  ADD KEY `projectKey` (`projectKey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `analyticsId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `backlog`
--
ALTER TABLE `backlog`
  MODIFY `backlogId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `backlogComment`
--
ALTER TABLE `backlogComment`
  MODIFY `backlogCommentId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `epic`
--
ALTER TABLE `epic`
  MODIFY `epicId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `releases`
--
ALTER TABLE `releases`
  MODIFY `releaseId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `reviewId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `sprintId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `taskComment`
--
ALTER TABLE `taskComment`
  MODIFY `taskCommentId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `tasksId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `analytics`
--
ALTER TABLE `analytics`
  ADD CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`sprintId`) REFERENCES `sprint` (`sprintId`);

--
-- Constraints for table `backlogComment`
--
ALTER TABLE `backlogComment`
  ADD CONSTRAINT `backlogcomment_ibfk_1` FOREIGN KEY (`backlogId`) REFERENCES `backlog` (`backlogId`);

--
-- Constraints for table `epic`
--
ALTER TABLE `epic`
  ADD CONSTRAINT `epic_ibfk_1` FOREIGN KEY (`projectKey`) REFERENCES `project` (`projectKey`);

--
-- Constraints for table `releaseBacklog`
--
ALTER TABLE `releaseBacklog`
  ADD CONSTRAINT `releasebacklog_ibfk_1` FOREIGN KEY (`releaseId`) REFERENCES `releases` (`releaseId`),
  ADD CONSTRAINT `releasebacklog_ibfk_2` FOREIGN KEY (`backlogId`) REFERENCES `backlog` (`backlogId`);

--
-- Constraints for table `releases`
--
ALTER TABLE `releases`
  ADD CONSTRAINT `releases_ibfk_1` FOREIGN KEY (`projectKey`) REFERENCES `project` (`projectKey`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`sprintId`) REFERENCES `sprint` (`sprintId`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`backlogId`) REFERENCES `backlog` (`backlogId`);

--
-- Constraints for table `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_ibfk_1` FOREIGN KEY (`projectKey`) REFERENCES `project` (`projectKey`);

--
-- Constraints for table `taskComment`
--
ALTER TABLE `taskComment`
  ADD CONSTRAINT `taskcomment_ibfk_1` FOREIGN KEY (`tasksId`) REFERENCES `tasks` (`tasksId`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`backlogId`) REFERENCES `backlog` (`backlogId`);

--
-- Constraints for table `upb`
--
ALTER TABLE `upb`
  ADD CONSTRAINT `upb_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `upb_ibfk_2` FOREIGN KEY (`projectKey`) REFERENCES `project` (`projectKey`),
  ADD CONSTRAINT `upb_ibfk_3` FOREIGN KEY (`backlogId`) REFERENCES `backlog` (`backlogId`);

--
-- Constraints for table `userproject`
--
ALTER TABLE `userproject`
  ADD CONSTRAINT `userproject_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `userproject_ibfk_2` FOREIGN KEY (`projectKey`) REFERENCES `project` (`projectKey`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
