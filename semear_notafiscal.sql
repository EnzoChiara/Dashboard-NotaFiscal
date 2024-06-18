-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: semear
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `notafiscal`
--

DROP TABLE IF EXISTS `notafiscal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notafiscal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomePagador` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numeroIdentificacao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataEmissao` datetime(3) NOT NULL,
  `dataCobranca` datetime(3) DEFAULT NULL,
  `dataPagamento` datetime(3) DEFAULT NULL,
  `valor` double NOT NULL,
  `documentoNota` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentoBoleto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('EMITIDA','COBRANCA_REALIZADA','PAGAMENTO_EM_ATRASO','PAGAMENTO_REALIZADO') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NotaFiscal_numeroIdentificacao_key` (`numeroIdentificacao`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notafiscal`
--

LOCK TABLES `notafiscal` WRITE;
/*!40000 ALTER TABLE `notafiscal` DISABLE KEYS */;
INSERT INTO `notafiscal` VALUES (1,'Empresa A','202306010001','2023-06-01 00:00:00.000','2023-06-15 00:00:00.000','2023-06-20 00:00:00.000',1000,'uploads/doc_nota_202306010001.pdf','uploads/doc_boleto_202306010001.pdf','PAGAMENTO_REALIZADO'),(3,'Empresa A','NF20230001','2023-01-10 00:00:00.000','2023-01-20 00:00:00.000','2023-01-25 00:00:00.000',1000,'path/to/documentoNota1.pdf','path/to/documentoBoleto1.pdf','PAGAMENTO_REALIZADO'),(4,'Empresa B','NF20230002','2023-02-15 00:00:00.000','2023-02-25 00:00:00.000',NULL,2000,'path/to/documentoNota2.pdf','path/to/documentoBoleto2.pdf','EMITIDA'),(6,'Empresa C','NF20230007','2024-06-17 00:00:00.000','2024-06-23 00:00:00.000','2024-06-30 00:00:00.000',5000,'1718686326739-Enzo Chiara CV.pdf','1718686326740-Enzo Chiara CV.pdf','EMITIDA'),(7,'Empresa C','NF20230003','2023-03-20 00:00:00.000','2023-03-28 00:00:00.000','2023-04-05 00:00:00.000',1500,'path/to/documentoNota3.pdf','path/to/documentoBoleto3.pdf','PAGAMENTO_EM_ATRASO'),(8,'Empresa D','NF20230004','2023-04-10 00:00:00.000',NULL,NULL,1800,'path/to/documentoNota4.pdf','path/to/documentoBoleto4.pdf','EMITIDA'),(11,'Empresa F','NF202345231','2024-07-02 00:00:00.000','2024-07-04 00:00:00.000','2024-07-06 00:00:00.000',1200,'1718689332180-Enzo Chiara CV.pdf','1718689332180-Enzo Chiara CV.pdf','EMITIDA'),(12,'Empresa E','NF202337333','2024-07-10 00:00:00.000','2024-07-02 00:00:00.000','2024-06-26 00:00:00.000',2000,'1718690223407-Enzo Chiara CV.pdf','1718690223408-Enzo Chiara CV.pdf','COBRANCA_REALIZADA');
/*!40000 ALTER TABLE `notafiscal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-18 12:58:42
