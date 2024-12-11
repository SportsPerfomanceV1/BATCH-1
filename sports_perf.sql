-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sport_perf
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
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'vishwaksai524@gmail.com','Sai','Vishwak','$2a$10$QpAXfw6/Ycs6FodC.2/6D.lhCSdVhW7bTzFIDDzwy/E1sY4VTKVNK','saivishwak05'),(2,'bookiboo@gmail.com','Broski','Brooo','$2a$10$W1Mjsj1aCsXVMzUN42xnouZXBljki4G2oyxjg2GaDQmaKmdkxn75q','bookiboo'),(3,'admin@gmail.com','admin','main','$2a$10$qM/SkXg0xwIkjg3flSUvXOmxyq.uQeJz20ePXlkLBcPXvsHdaoCW2','admin_acc');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athlete`
--

DROP TABLE IF EXISTS `athlete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete`
--

LOCK TABLES `athlete` WRITE;
/*!40000 ALTER TABLE `athlete` DISABLE KEYS */;
INSERT INTO `athlete` VALUES (1,'shreya@gmail.com','Shreya','Gundoju','$2a$10$tfWsS5fZWdxMeSHcTEcdUeUcZeLZY3RMGflVPO0oPd1WCgz1h7sIS','shreya05'),(2,'karansingh@gmail.com','Karan','Singh','$2a$10$MU7GjKUnErE1c6IwB/ktIOpjvjCiHMeUeX3GNZ0ommqgbvWU1fZ/C','karansingh03'),(3,'tanuj@gmail.com','Tanuj','Kasula','$2a$10$1OqZDCZqKueDUded2UHjXOtYbYsyBFRovSJ9u7ypqU4YUoxiAXce.','tanuj03'),(4,'athlete@gmail.com','athlete','main','$2a$10$KepRHtO5Z/GvG9GfMG4p.uC7GmIwmivYtzJJcc8TEG6BKTs67zoYO','athlete'),(5,'raghavi@gmail.com','Raghavi','Raghu','$2a$10$oCSVQUs4nYXPvZtLbdVIheyOZznAd/KBStZJDT3s2L.Jgq33OEoHy','raghu03'),(6,'sampada@gmail.com','Sampada','Sai','$2a$10$T2iq4iUEbSWbSxTMFxbD4eiNklnEjnzTLgAc3lti//VmDcFGYKjKO','sampada02'),(7,'rucha@gmail.com','Rucha','Goje','$2a$10$rvVCCqqgutW6jVql87mKEO5xthSOV8FCzc68NsZq/8tWT0pSlXJxO','rucha04'),(8,'vaishnavi@gmail.com','Vaishnavi','Vaishu','$2a$10$S082cWD7/lPUt0t4jHi31uQuhorU0zwDiyNTp9Jz5ZWOlX4oT46Da','vaishu03'),(9,'rahulkumar@gmail.com','Rahul','Kumar','$2a$10$OxSXqstSaURDhCBfb3VhcuDmrkYoJ3ybn38Khu087NEAsSfDbzLH6','rahulkumar'),(10,'ravishankar@gmail.com','Ravi','Shankar','$2a$10$24.ZN4Mb2AHpXf.UaaUq6eEaViGkq0WP4D3oaZbKXWTkkGmAzqc5y','ravishankar'),(11,'naveen@gmail.com','Naveen','Kumar','$2a$10$85EGV98AGIs1gtEOU9DROOZm83nyiVb/njIMNdMMAHfacBUPi/oHS','naveenkumar'),(12,'harikrishna@gmail.com','Hari','Krishna','$2a$10$5UnpfU78HqZw3UJg6SWAFupZFZhpAJDDcE1wri5tO2fp3ms.tsoVy','harikrishna'),(13,'vishalkumar@gmail.com','Vishal','Kumar','$2a$10$ziINxIQs9oZPJCubQ5fFHe1lbu7p.u5DRCVm2ev9JTFEgjLWRlpVO','vishalkumar'),(14,'vaishali@gmail.com','Vaishali','Sharma','$2a$10$Vcz0u7BOs6hDfasKVB1PK.eW40BlYIF0mFH3UBIIE0SkUOy9lhbKC','vaishalisharma'),(15,'ruchika@gmail.com','Ruchika','Shetty','$2a$10$hBCIqTNLB9VYHfjxd8Fum.OhuyyCdOVl8TB9oeOFcLhZOXa8oddEK','ruchikashetty');
/*!40000 ALTER TABLE `athlete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` VALUES (1,'dharaneesh@gmail.com','Dharaneesh','Ponuvvel','$2a$10$qTp4P9ngNJclyAWhdT8g.uxn3ln/cH9W.wDpPzCLT9js5zRvXsnli','dharaneesh09'),(2,'purnachandra@gmail.com','Purna','Chandra','$2a$10$JLHCk5qb1UsJvzMiAG6hzOwu2ePxwuwRK/l.U2HfcA8p0ehZhsqLW','purnachandra'),(3,'shobharani@gmail.com','Shobha','Rani','$2a$10$srcjfVDfvj1.RjEzwFHUFOFhI5K5JLDqfeJxuC6ebA1WDaL7naDwa','rani73'),(4,'shreshta@gmail.com','Shreshta','Gundoju','$2a$10$knKbc4PT1mTpuRS5hTvDr.72q69y2EGDFCZEny.ijJv/YzlzB1UEG','shreshta99'),(5,'vigneshbalaji@gmail.com','Vignesh','Balaji','$2a$10$TFnpIo8uis13mhCU4P1r9.pzvlKSwKgDfUQv7PtLXQoTnQ4iKHyq6','vigneshbalaji'),(6,'coach@gmail.com','coach','main','$2a$10$TXvoBTb6nrBXmLd3fl00rOo6RaLQotYMMfhh2ejjpDTIWsCMCQp/y','coachmain');
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `fee` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `organizer` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'2024-12-01',500,'/public/event_pics/1.webp','Uppal Cricket Stadium','Hyd Cricket Association','07:30','Cricket Test Match'),(2,'2024-12-04',200,'/public/event_pics/2.webp','Pune Sports Stadium','Pune Sports Club','10:00','Basketball Qualifications'),(3,'2024-12-07',750,'/public/event_pics/3.webp','Mumbai Sports Ground','Mumbai Athlete Club','14:30','Soccer Match'),(4,'2024-12-10',100,'/public/event_pics/4.webp','Bangalore Cubbon Park','Bangalore Sports Community','08:00','Marathon Run:15km'),(5,'2024-12-12',250,'/public/event_pics/5.webp','Gachibowli Indoor Stadium','Hyd Sports Club','10:00','Tennis Rounds'),(6,'2024-12-14',200,'/public/event_pics/6.webp','Chennai Football Stadium','Chennai Football Club','13:00','Football Qualification'),(7,'2024-12-20',400,'/public/event_pics/7.webp','Gachibowli Indoor Stadium','Hyderabad Chess Minds','18:00','Chess Competition'),(8,'2024-12-18',100,'/public/event_pics/8.webp','Durgam Cheruvu Road','Hyd Cyclist Association','06:00','Cycling Run: 50 kms'),(9,'2024-12-31',1000,'/public/event_pics/9.webp','Uppal Cricket Stadium','Hyd Cricket Association','23:59','Cricket Finale');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_result`
--

DROP TABLE IF EXISTS `event_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `athlete_id` int NOT NULL,
  `event_id` int NOT NULL,
  `published` bit(1) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_result`
--

LOCK TABLES `event_result` WRITE;
/*!40000 ALTER TABLE `event_result` DISABLE KEYS */;
INSERT INTO `event_result` VALUES (1,2,1,_binary '','2'),(2,3,1,_binary '','4'),(3,10,1,_binary '','5'),(4,13,1,_binary '','1'),(5,9,1,_binary '','3'),(6,8,2,_binary '','2'),(7,14,2,_binary '','4'),(8,2,2,_binary '','3'),(9,10,2,_binary '','6'),(10,11,2,_binary '','5'),(11,12,2,_binary '','7'),(12,13,2,_binary '','3'),(13,6,2,_binary '','8'),(14,7,2,_binary '','9'),(15,1,2,_binary '','1'),(16,1,3,_binary '\0','5'),(17,5,3,_binary '\0','3'),(18,6,3,_binary '\0','4'),(19,7,3,_binary '\0','10'),(20,8,3,_binary '\0','2'),(21,15,3,_binary '\0','6'),(22,3,3,_binary '\0','1'),(23,9,3,_binary '\0','7'),(24,11,3,_binary '\0','8'),(25,12,3,_binary '\0','9'),(26,1,4,_binary '','1'),(27,5,4,_binary '','2'),(28,6,4,_binary '','3'),(29,7,4,_binary '','4'),(30,14,4,_binary '','5'),(31,15,4,_binary '','6'),(32,2,4,_binary '','8'),(33,9,4,_binary '','7'),(34,10,4,_binary '','9'),(35,13,4,_binary '','10');
/*!40000 ALTER TABLE `event_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `registration_id` int NOT NULL AUTO_INCREMENT,
  `athlete_id` int NOT NULL,
  `event_id` int NOT NULL,
  `registration_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (1,1,3,'2024-12-11','Accepted'),(2,1,4,'2024-12-11','Accepted'),(3,1,7,'2024-12-11','Accepted'),(4,5,3,'2024-12-11','Accepted'),(5,5,4,'2024-12-11','Accepted'),(6,5,5,'2024-12-11','Accepted'),(7,6,3,'2024-12-11','Accepted'),(8,6,4,'2024-12-11','Accepted'),(9,6,7,'2024-12-11','Accepted'),(10,7,3,'2024-12-11','Accepted'),(11,7,4,'2024-12-11','Accepted'),(12,7,6,'2024-12-11','Rejected'),(13,7,7,'2024-12-11','Accepted'),(14,8,2,'2024-12-11','Accepted'),(15,8,3,'2024-12-11','Accepted'),(16,8,5,'2024-12-11','Accepted'),(17,8,7,'2024-12-11','Accepted'),(18,14,2,'2024-12-11','Accepted'),(19,14,4,'2024-12-11','Accepted'),(20,14,6,'2024-12-11','Accepted'),(21,14,8,'2024-12-11','Pending'),(22,15,3,'2024-12-11','Accepted'),(23,15,4,'2024-12-11','Accepted'),(24,15,5,'2024-12-11','Accepted'),(25,15,8,'2024-12-11','Pending'),(26,15,7,'2024-12-11','Rejected'),(27,2,1,'2024-12-11','Accepted'),(28,2,2,'2024-12-11','Rejected'),(29,2,4,'2024-12-11','Accepted'),(30,2,6,'2024-12-11','Accepted'),(31,2,8,'2024-12-11','Pending'),(32,3,1,'2024-12-11','Accepted'),(33,3,3,'2024-12-11','Rejected'),(34,3,6,'2024-12-11','Accepted'),(35,3,7,'2024-12-11','Accepted'),(36,9,3,'2024-12-11','Rejected'),(37,9,4,'2024-12-11','Accepted'),(38,9,7,'2024-12-11','Accepted'),(39,9,8,'2024-12-11','Pending'),(40,10,1,'2024-12-11','Accepted'),(41,10,2,'2024-12-11','Rejected'),(42,10,4,'2024-12-11','Accepted'),(43,10,5,'2024-12-11','Accepted'),(44,10,8,'2024-12-11','Pending'),(45,11,2,'2024-12-11','Rejected'),(46,11,3,'2024-12-11','Rejected'),(47,11,5,'2024-12-11','Accepted'),(48,11,7,'2024-12-11','Accepted'),(49,12,2,'2024-12-11','Rejected'),(50,12,3,'2024-12-11','Rejected'),(51,12,5,'2024-12-11','Rejected'),(52,12,8,'2024-12-11','Pending'),(53,13,2,'2024-12-11','Rejected'),(54,13,1,'2024-12-11','Accepted'),(55,13,4,'2024-12-11','Accepted'),(56,13,5,'2024-12-11','Accepted'),(57,13,6,'2024-12-11','Accepted'),(58,13,8,'2024-12-11','Pending'),(59,9,1,'2024-12-11','Accepted'),(60,6,8,'2024-12-11','Pending'),(61,6,2,'2024-12-11','Accepted'),(62,7,2,'2024-12-11','Accepted'),(63,1,2,'2024-12-11','Accepted');
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

-- Dump completed on 2024-12-11 19:58:32
