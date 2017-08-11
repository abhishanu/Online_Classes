-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2017 at 08:05 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_tutorial`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_details`
--

CREATE TABLE IF NOT EXISTS `login_details` (
  `Id` int(11) NOT NULL,
  `Password` text NOT NULL,
  `Type` enum('admin','student','business') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_details`
--

INSERT INTO `login_details` (`Id`, `Password`, `Type`) VALUES
(108, 'ak', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `signup_details`
--

CREATE TABLE IF NOT EXISTS `signup_details` (
  `Id` int(30) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Pwd` text NOT NULL,
  `Contact` varchar(12) NOT NULL,
  `Type` varchar(15) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup_details`
--

INSERT INTO `signup_details` (`Id`, `Name`, `Email`, `Pwd`, `Contact`, `Type`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 'Shantanu Sharma', '7shantanusharma@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '7566501220', 'student', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE IF NOT EXISTS `student_details` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Contact` varchar(10) NOT NULL,
  `StudentId` bigint(20) NOT NULL,
  `TeacherId` varchar(100) DEFAULT NULL,
  `CourseHistory` varchar(200) DEFAULT NULL,
  `CourseFav` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`Id`, `Name`, `Email`, `Contact`, `StudentId`, `TeacherId`, `CourseHistory`, `CourseFav`) VALUES
(1, 'Shantanu Sharma', '7shantanusharma@gmail.com', '2147483647', 0, '0', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_details`
--
ALTER TABLE `login_details`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `signup_details`
--
ALTER TABLE `signup_details`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Contact` (`Contact`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_details`
--
ALTER TABLE `login_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=109;
--
-- AUTO_INCREMENT for table `signup_details`
--
ALTER TABLE `signup_details`
  MODIFY `Id` int(30) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `student_details`
--
ALTER TABLE `student_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
