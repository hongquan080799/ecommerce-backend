create database ecommerce;

use ecommerce;

DROP TABLE IF EXISTS `brand`;

CREATE TABLE `brand` (
    `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(500) DEFAULT NULL, `image_url` text, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_by` varchar(255) DEFAULT NULL, `updated_by` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `category` (
    `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(500) DEFAULT NULL, `image_url` text, `parent_id` bigint DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_by` varchar(255) DEFAULT NULL, `updated_by` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`)
)

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
    `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(500) DEFAULT NULL, `description` varchar(500) DEFAULT NULL, `technical_info` text, `product_info` text, `price` bigint DEFAULT NULL, `category_id` bigint DEFAULT NULL, `brand_id` bigint DEFAULT NULL, `images` text, `status` varchar(100) DEFAULT NULL, `quantity` int DEFAULT NULL, `discount` float DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_by` varchar(255) DEFAULT NULL, `updated_by` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
    `id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint DEFAULT NULL, `product_id` bigint DEFAULT NULL, `rating` int DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_by` varchar(255) DEFAULT NULL, `updated_by` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`)
);

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
    `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(100) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)
);

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` bigint NOT NULL AUTO_INCREMENT, `username` varchar(500) DEFAULT NULL, `first_name` varchar(500) DEFAULT NULL, `last_name` varchar(500) DEFAULT NULL, `email` varchar(500) DEFAULT NULL, `password` varchar(500) DEFAULT NULL, `address` varchar(500) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_by` varchar(255) DEFAULT NULL, `updated_by` varchar(255) DEFAULT NULL, `phone_number` varchar(20) DEFAULT NULL, `role_id` bigint DEFAULT NULL, `avatar` text, `active` tinyint(1) DEFAULT NULL, PRIMARY KEY (`id`)
);

create TABLE banner (
    `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT, `name` varchar(500) DEFAULT NULL, `image_url` text, redirect_url text, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into role (name) values ("ADMIN");

insert into role (name) values ("EMPLOYEE");

insert into role (name) values ("USER");

insert into
    user (username, password, role_id)
values ("ADMIN", "123", 1);

select * from user;