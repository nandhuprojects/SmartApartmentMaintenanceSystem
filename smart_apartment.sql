-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2025 at 04:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_apartment`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` int(11) NOT NULL,
  `flat_id` int(4) DEFAULT NULL,
  `water` int(11) DEFAULT NULL,
  `gas` int(11) DEFAULT NULL,
  `electricity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_id`, `flat_id`, `water`, `gas`, `electricity`) VALUES
(5001, 2001, 0, 0, 0),
(5002, 2002, 42, 2, 720),
(5003, 2003, 40, 1, 700),
(5004, 2004, 46, 2, 740),
(5005, 2005, 48, 1, 750),
(5006, 2006, 45, 1, 730),
(5007, 2007, 0, 0, 0),
(5008, 2001, 10, 2, 300),
(5009, 2001, 50, 3, 1000),
(5010, 2006, 100, 2, 500),
(5011, 2006, 100, 2, 400),
(5012, 2001, 20, 3, 1000),
(5013, 2006, 100, 2, 1000),
(5014, 2001, 20, 2, 300);

-- --------------------------------------------------------

--
-- Table structure for table `clubhouse_facilities`
--

CREATE TABLE `clubhouse_facilities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaintdb`
--

CREATE TABLE `complaintdb` (
  `complaintid` int(4) NOT NULL,
  `complaint` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `userid` int(4) DEFAULT NULL,
  `flatno` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaintdb`
--

INSERT INTO `complaintdb` (`complaintid`, `complaint`, `action`, `userid`, `flatno`) VALUES
(4001, 'Termite infestation in bathroom', 'Will resolve soon', 1001, 5505),
(4002, 'Kitchen sink leakage', 'Done.', 1003, 2201),
(4003, 'Tubelight not working', 'Electrician sent', 1004, 3303),
(4004, 'House not cleaned', 'Will clean soon.', 1003, 2201),
(4005, 'Pest Invasion', 'Will inform pest controller.', 1003, 4002),
(4006, 'House not cleaned', 'Will be cleaned soon.', 1001, 4001),
(4007, 'saaaaaaaaaaa', 'done', 1005, 123),
(4008, 'as', NULL, 1003, 11),
(4009, 'Balcony not cleaned', NULL, 1001, 4001),
(4010, 'Water not coming in tap', 'Electrician sent', 1001, 1101);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(4) DEFAULT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `event_venue` varchar(255) DEFAULT NULL,
  `user` int(4) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_date`, `event_time`, `event_venue`, `user`, `status`) VALUES
(4001, 'Mikes Birthday', '2021-02-23', '08:05:33', 'Party hall', 1001, 'completed'),
(4002, 'New year celebs', '2021-03-22', '07:09:33', 'Party hall', 1002, 'completed'),
(4003, 'Rosss wedding aniv', '2021-01-23', '08:05:33', 'Party hall', 1003, 'completed'),
(4004, 'Deepavali Celeb', '2021-04-24', '08:30:00', 'Terrace', 1002, 'completed'),
(4005, 'Christmas Party', '2021-04-29', '08:30:00', 'Terrace', 1002, 'completed'),
(4006, 'Anniversary', '2021-04-30', '08:30:00', 'Party hall', 1001, 'completed'),
(4007, 'Christmas Party', '2021-04-23', '08:30:00', 'Terrace', 1002, 'completed'),
(4008, 'Birthday', '2021-04-29', '18:11:00', 'Party hall', 1002, 'completed'),
(4009, 'Wedding Anniversary celebration', '2025-03-01', '18:00:00', 'Flat No: 1101', 1005, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `flatdb`
--

CREATE TABLE `flatdb` (
  `flatid` int(4) NOT NULL,
  `blockno` int(2) DEFAULT NULL,
  `flatno` int(4) DEFAULT NULL,
  `ownerid` int(4) DEFAULT NULL,
  `tenantid` int(4) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `bhk` int(2) DEFAULT NULL,
  `sqft` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flatdb`
--

INSERT INTO `flatdb` (`flatid`, `blockno`, `flatno`, `ownerid`, `tenantid`, `status`, `bhk`, `sqft`) VALUES
(2001, 1, 101, 1001, NULL, 'rent', 3, 1800),
(2002, 1, 102, 1002, 1003, 'sale', 2, 1400),
(2003, 1, 103, 1001, 1004, NULL, 3, 1600),
(2004, 1, 104, 1002, 1002, NULL, 2, 1300),
(2005, 1, 105, 1001, 1001, NULL, 3, 1900),
(2006, 1, 106, 1005, 1005, 'sale', 2, 1750),
(2007, 1, 107, 1006, NULL, NULL, 3, 1950),
(2008, 1, 108, 1005, 1005, '', 3, 1800),
(2009, 2, 201, 1005, NULL, 'sale', 3, 1800),
(2010, 2, 202, 1009, 1009, 'occupied', 3, 1950);

-- --------------------------------------------------------

--
-- Table structure for table `housekeeping`
--

CREATE TABLE `housekeeping` (
  `servantid` int(4) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `work` varchar(255) DEFAULT NULL,
  `request` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `housekeeping`
--

INSERT INTO `housekeeping` (`servantid`, `first_name`, `last_name`, `status`, `work`, `request`) VALUES
(6001, 'Rose', 'Stager', 'available', 'Cleaning', 'Kanimozhi'),
(6002, 'Dabby', 'Fletcher', 'available', 'Miscellaneous', 'no'),
(6003, 'Cyrus', 'Smores', 'available', 'Washing', 'Harini'),
(6004, 'Cadence', 'Mathewss', 'busy', 'Laundary', 'no'),
(6005, 'Arwen', 'Jose', 'available', 'Dusting', 'Ross');

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `role` varchar(20) NOT NULL,
  `service_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relation`
--

INSERT INTO `relation` (`role`, `service_id`) VALUES
('association', 3001),
('association', 3002),
('association', 3003),
('association', 3004),
('association', 3005),
('association', 3006),
('association', 3007),
('housekeeping', 3006),
('owner', 3001),
('owner', 3002),
('owner', 3003),
('owner', 3004),
('owner', 3005),
('owner', 3006),
('security', 3007),
('tenant', 3001),
('tenant', 3002),
('tenant', 3003),
('tenant', 3004),
('tenant', 3005),
('tenant', 3006);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(4) NOT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_desc`) VALUES
(3001, 'Property Management', 'We manage your property details'),
(3002, 'Complaint forum', 'We manage your complaints'),
(3003, 'Bill Management', 'We manage your bill payment statuses'),
(3004, 'Clubhouse Facilities', 'We help in booking clubhouse facilities'),
(3005, 'Events', 'We help manage events'),
(3006, 'Housekeeping', 'We help in getting housekeeping staff for you'),
(3007, 'Security Ledger', 'Get details of the visitors who visited yur apartment'),
(3008, 'Flat Management', 'We Manage Flats, Owners, and Tenants');

-- --------------------------------------------------------

--
-- Table structure for table `userdb`
--

CREATE TABLE `userdb` (
  `userid` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdb`
--

INSERT INTO `userdb` (`userid`, `first_name`, `last_name`, `username`, `password`, `mobile`, `role`) VALUES
(1001, 'Nagendran', 's', 'nagendran', 'nagendran', '1234567890', 'tenant'),
(1002, 'Ross', 'Geller', 'ross', 'ross', '1122334455', 'owner'),
(1003, 'Monisha', 'M', 'monisha', 'monisha', '1231231234', 'tenant'),
(1004, 'Balaji', 'Sivakumar', 'balaji', 'balaji', '3344556677', 'tenant'),
(1005, 'Harini', 'T', 'harini', 'harini', '4545454545', 'association'),
(1006, 'Chandler', 'Bing', 'chandler', 'chandler', '1212121212', 'association'),
(1007, 'Manikandan', 'H', 'mani', 'mani', '7766554433', 'security'),
(1008, 'Jill', 'Green', 'jill', 'jill', '0987654321', 'security'),
(1009, 'SUDARMUGI', 'B', 'sudar', 'sudar', '9345440117', 'tenant'),
(1010, 'Jagadha', 'A', 'jagadhi', 'jagadhi', '0987654333', 'housekeeping'),
(1011, 'Arwen', 'Jose', 'arwen', 'arwen', '0987144333', 'housekeeping'),
(1012, 'nandakumar', 'v m', 'nandhu', 'nandhu', '6379163589', 'tenant'),
(1013, 'kavi', 'venkat', 'kavi', 'kavi', '8923748312', 'tenant'),
(1014, 'sanmathi', 'M K', 'san', 'san', '9873492123', 'association'),
(1016, 'Babu', 'K S', 'babu', 'babu', '8723947203', 'tenant'),
(1017, 'Kanimozhi', 'S', 'kani', 'kani', '9834957923', 'tenant'),
(1018, 'Kayal', 'D', 'kayal', 'kaya;', '7972921232', 'tenant'),
(1019, 'Vikram', 'J', 'vikram', 'vikram', '9056129831', 'tenant');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicleid` int(4) NOT NULL,
  `vehicleno` varchar(255) DEFAULT NULL,
  `drivername` varchar(255) DEFAULT NULL,
  `driverno` varchar(10) DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `visit_time` time DEFAULT NULL,
  `herefor` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicleid`, `vehicleno`, `drivername`, `driverno`, `visit_date`, `visit_time`, `herefor`) VALUES
(6001, 'TN 01 U 0099', 'Ashwin ', '6789009876', '2025-02-23', '08:05:33', 1003),
(6002, 'MH 02 BY 3123', 'Jagadha', '9876098765', '2025-03-20', '17:30:00', 1004),
(6003, 'TN 20 KA 9696', 'Arumugam', '9988676688', '2025-02-27', '13:10:00', 1002),
(6004, 'TN 72 BF 3366', 'Bala', '9080707678', '2025-03-02', '16:05:33', 1001),
(6005, 'TN 01 A 4295', 'Baskar', '8796056789', '2025-02-23', '08:05:33', 1005),
(6006, 'TN 45 AK 6591', 'Venkatesh', '6789009876', '2025-03-01', '10:30:00', 1006),
(6007, 'TN 42 AK 7524', 'Elahkiya', '8002342100', '2025-02-13', '22:59:00', 1003);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `visitorid` int(4) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `visit_time` time DEFAULT NULL,
  `herefor` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`visitorid`, `first_name`, `last_name`, `mobile`, `temperature`, `visit_date`, `visit_time`, `herefor`) VALUES
(2001, 'Kaviya', 'S', '6789009876', 96.7, '2025-02-12', '08:05:33', 1003),
(2002, 'Dharani', 'P', '9876098765', 97.9, '2025-02-15', '17:30:00', 1004),
(2003, 'Ragini', 'H', '9988676688', 98.8, '2025-02-20', '13:10:00', 1002),
(2004, 'Mirudhubasini', 'R', '9080707678', 95.7, '2025-02-11', '16:05:33', 1001),
(2005, 'Janani', 'P', '8796056789', 97, '2025-02-23', '08:05:33', 1003),
(2006, 'Lavanya', 'M K', '6789009876', 96.7, '2025-02-11', '10:30:00', 1005),
(2007, 'Sanjai', 'B', '9879682511', 96, '2025-02-13', '22:58:00', 1003),
(2008, 'Saniya', 'James', '8976420908', 90, '2025-02-24', '15:30:00', 1001),
(2009, 'Subasri', 'S', '8903909585', 96, '2025-02-27', '16:35:00', 1012);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bills_ibfk_1` (`flat_id`);

--
-- Indexes for table `clubhouse_facilities`
--
ALTER TABLE `clubhouse_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaintdb`
--
ALTER TABLE `complaintdb`
  ADD PRIMARY KEY (`complaintid`),
  ADD KEY `complaintdb_ibfk_1` (`userid`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD KEY `events_ibfk_1` (`user`);

--
-- Indexes for table `flatdb`
--
ALTER TABLE `flatdb`
  ADD PRIMARY KEY (`flatid`),
  ADD KEY `flatdb_ibfk_1` (`ownerid`),
  ADD KEY `flatdb_ibfk_2` (`tenantid`);

--
-- Indexes for table `housekeeping`
--
ALTER TABLE `housekeeping`
  ADD PRIMARY KEY (`servantid`);

--
-- Indexes for table `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`role`,`service_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `userdb`
--
ALTER TABLE `userdb`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicleid`),
  ADD KEY `vehicles_ibfk_1` (`herefor`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`visitorid`),
  ADD KEY `visitors_ibfk_1` (`herefor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5015;

--
-- AUTO_INCREMENT for table `clubhouse_facilities`
--
ALTER TABLE `clubhouse_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flatdb`
--
ALTER TABLE `flatdb`
  MODIFY `flatid` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2011;

--
-- AUTO_INCREMENT for table `userdb`
--
ALTER TABLE `userdb`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1020;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`flat_id`) REFERENCES `flatdb` (`flatid`) ON DELETE CASCADE;

--
-- Constraints for table `complaintdb`
--
ALTER TABLE `complaintdb`
  ADD CONSTRAINT `complaintdb_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `flatdb`
--
ALTER TABLE `flatdb`
  ADD CONSTRAINT `flatdb_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE,
  ADD CONSTRAINT `flatdb_ibfk_2` FOREIGN KEY (`tenantid`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`herefor`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `visitors`
--
ALTER TABLE `visitors`
  ADD CONSTRAINT `visitors_ibfk_1` FOREIGN KEY (`herefor`) REFERENCES `userdb` (`userid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
