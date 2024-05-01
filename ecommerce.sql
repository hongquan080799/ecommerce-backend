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

alter table rating add UNIQUE (`user_id`, `product_id`);

alter table rating add column message text;

create table comment (
    id bigint PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id BIGINT, product_id BIGINT, message text, created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP, updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from product;

select * from rating;

select
    r.id,
    u.username as user,
    u.avatar as userAvatar,
    p.id as id,
    r.rating as rating,
    r.message as message
from rating r
    join product p on r.product_id = p.id
    join user u on r.user_id = u.id;

SELECT
    COUNT(*) AS total_ratings,
    ROUND(AVG(rating), 1) AS average_rating,
    SUM(
        CASEWHEN rating = 1 THEN 1ELSE 0END
    ) AS one_star_count,
    SUM(
        CASEWHEN rating = 2 THEN 1 ELSE 0 END
    ) AS two_star_count,
    SUM(
        CASE
            WHEN rating = 3 THEN 1
            ELSE 0
        END
    ) AS three_star_count,
    SUM(
        CASE
            WHEN rating = 4 THEN 1
            ELSE 0
        END
    ) AS four_star_count,
    SUM(
        CASE
            WHEN rating = 5 THEN 1
            ELSE 0
        END
    ) AS five_star_count
FROM rating;

select * from comment;

select
    c.id,
    u.username as user,
    u.avatar as userAvatar,
    p.id as id,
    c.message as message
from
    comment c
    join product p on c.product_id = p.id
    join user u on c.user_id = u.id
where
    p.id = 2
order by c.created_at desc;

select
    r.id,
    u.username as user,
    u.avatar as userAvatar,
    p.id as id,
    r.rating as rating,
    r.message as message,
    r.created_at as time
from rating r
    join product p on r.product_id = p.id
    join user u on r.user_id = u.id
where
    p.id = 2
order by r.created_at desc;