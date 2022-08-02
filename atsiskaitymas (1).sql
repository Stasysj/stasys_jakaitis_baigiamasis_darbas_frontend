-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 09:59 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atsiskaitymas`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id_a` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_q` int(11) NOT NULL,
  `body_a` text NOT NULL,
  `add_time_a` varchar(255) NOT NULL,
  `add_time_mili_a` varchar(255) NOT NULL,
  `add_tst_a` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_tst_a` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `edited_a` tinyint(4) NOT NULL DEFAULT 0,
  `like_a` int(11) NOT NULL DEFAULT 0,
  `dislike_a` int(11) NOT NULL DEFAULT 0,
  `archived_a` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_q` int(11) NOT NULL,
  `like_q` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes2`
--

CREATE TABLE `likes2` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_a` int(11) NOT NULL,
  `like_a` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id_q` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title_q` varchar(255) NOT NULL,
  `body_q` text NOT NULL,
  `number_a` int(11) NOT NULL DEFAULT 0,
  `add_time_q` varchar(255) NOT NULL,
  `add_time_mili_q` varchar(255) NOT NULL,
  `add_tst_q` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_tst_q` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `edited_q` tinyint(4) NOT NULL DEFAULT 0,
  `like_q` int(11) NOT NULL DEFAULT 0,
  `likes_counter_q` text NOT NULL DEFAULT 'z',
  `archived_q` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(2, 'marius1', 'marius1@xxx.lt', '$2a$10$.nF63v82wSnnvsBkN2LFHuGPQYjJ2ziYzcV4luv2fAC3ouq5f20.G', '2022-07-26 13:32:04'),
(22, 'marius2', 'marius2@xxx.lt', '$2a$10$UeN.jomhotTafYCfXXApfOhyW.U.R9vFQEdVVYgONdG3FnPJjrj96', '2022-07-30 06:03:15'),
(23, 'marius3', 'marius3@xxx.lt', '$2a$10$i/HFbi2oJQE.a1hZl1ycUewv9KRH.LwHMbN5jbcZzg/VnMml765nK', '2022-08-01 06:35:15'),
(27, 'marius25', 'marius25@xxx.lt', '$2a$10$RYyFkTc/7X7MLZfJQ5fdM./ax.Y2rBZ/7EDX8eR8mor4/yxjL8eOe', '2022-08-01 14:21:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id_a`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `likes2`
--
ALTER TABLE `likes2`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_q`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id_a` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `likes2`
--
ALTER TABLE `likes2`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id_q` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
