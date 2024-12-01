CREATE DATABASE  IF NOT EXISTS `sports_perf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sports_perf`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sports_perf
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'vishwaksai524@gmail.com','Sai','Vishwak',NULL,'password123','saivishwak05'),(2,'bookiboo@gmail.com','Broski','Brooo',NULL,'treats143','bookiboo');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athlete`
--

DROP TABLE IF EXISTS `athlete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete`
--

LOCK TABLES `athlete` WRITE;
/*!40000 ALTER TABLE `athlete` DISABLE KEYS */;
INSERT INTO `athlete` VALUES (1,'vigneshbalaji@gmail.com','Vignesh','Balaji',NULL,'password135','vigneshbalaji'),(2,'shreya@gmail.com','Shreya','Gundoju',NULL,'password246','shreya05'),(3,'karansingh@gmail.com','Karan','Singh',NULL,'password086','karansingh03'),(4,'tanuj@gmail.com','Tanuj','Kasula',NULL,'password975','tanuj03'),(5,'raghavi@gmail.com','Raghavi','Raghu',NULL,'password357','raghu03'),(6,'sampada@gmail.com','Sampada','Sai',NULL,'password468','sampada02'),(7,'rucha@gmail.com','Rucha','Goje',NULL,'password150','rucha04'),(8,'vaishnavi@gmail.com','Vaishnavi','Vaishu',NULL,'password262','vaishu03');
/*!40000 ALTER TABLE `athlete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` VALUES (1,'dharaneesh@gmail.com','Dharaneesh','Ponuvvel',NULL,'password987','dharaneesh09'),(2,'purnachandra@gmail.com','Chandra','Purna',NULL,'password567','purnachandra'),(3,'shobharani@gmail.com','Shobha','Rani',NULL,'password131','rani73'),(4,'shreshta@gmail.com','Shreshta','Gundoju',NULL,'password121','shreshta99');
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `event_id` bigint DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `organizer` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'2024-10-10',1,150,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\baseball.jpg','Hyderabad','Hyderabad Cricket Association','10:00:00','One-day Test Match'),(2,'2024-10-25',2,170,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\basketball.jpg','Pune','Pune Sports Club','9:00:00','Basketball qualifications'),(3,'2024-11-1',3,100,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\cricket.jpg','Mumbai','Mumbai Athletes','11:00:00','Cricket Trophy'),(4,'2024-11-15',4,200,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\cricket-ball.jpg','Bangalore','Bangalore Cricket Club','8:00:00','Full day Test Match'),(5,'2024-11-23',5,300,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\football.jpg','Mysore','Mysore Football Club','10:00:00','Football Match'),(6,'2024-12-10',6,100,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\marathon.jpg','Chennai','Chennai Marathon Club','6:00:00','Marathon Sprint'),(7,'2024-12-20',7,150,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\tennis.jpg','Hyderabad','Hyderabad Tennis Association','9:00:00','Tennis Selection Match'),(8,'2024-12-22',8,100,'C:\\Users\\vishw\\Documents\\Infosys Internship Project\\BATCH-1\\BATCH-1_main2 - Copy\\Frontend\\public\\images\\chess.jpg','Pune','Pune Chess Minds','10:00:00','Chess Rounds Match');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_result`
--

DROP TABLE IF EXISTS `event_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `athlete_id` bigint DEFAULT NULL,
  `event_id` bigint DEFAULT NULL,
  `published` bit(1) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_result`
--

LOCK TABLES `event_result` WRITE;
/*!40000 ALTER TABLE `event_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `registration_id` bigint NOT NULL AUTO_INCREMENT,
  `athlete_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `registration_date` date DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (1,1,1,'2024-09-20','pending'),(2,3,1,'2024-09-22','pending'),(3,4,1,'2024-10-05','pending'),(4,1,2,'2024-10-03','pending'),(5,4,2,'2024-10-05','pending'),(6,7,3,'2024-10-10','pending'),(7,8,3,'2024-10-15','pending'),(8,5,3,'2024-10-23','pending'),(9,3,3,'2024-11-04','pending'),(10,5,4,'2024-11-06','pending'),(11,6,4,'2024-11-08','pending'),(12,1,4,'2024-11-02','pending'),(13,1,5,'2024-11-13','pending'),(14,5,6,'2024-11-11','pending'),(15,4,6,'2024-11-20','pending'),(16,3,6,'2024-11-10','pending'),(17,8,7,'2024-11-21','pending'),(18,7,7,'2024-11-20','pending'),(19,6,7,'2024-11-11','pending'),(20,5,7,'2024-11-22','pending'),(21,4,8,'2024-11-15','pending'),(22,1,8,'2024-11-20','pending');
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 19:17:49
