create database ecommerce;

use ecommerce;

create table category (
    id bigint primary key auto_increment, name varchar(500), image_url text, parent_id bigint
);

ALTER TABLE category
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD COLUMN created_by VARCHAR(255) DEFAULT NULL,
ADD COLUMN updated_by VARCHAR(255) DEFAULT NULL;

select * from category;

create table brand (
    id bigint primary key auto_increment, name varchar(500), image_url text, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL
);

create table rating (
    id BIGINT primary key auto_increment, user_id BIGINT, product_id BIGINT, rating int, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL
);

create table user (
    id bigint primary key auto_increment, username varchar(500), first_name varchar(500), last_name varchar(500), email varchar(500), password varchar(500), address varchar(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL
);

create table product (
    id BIGINT primary key auto_increment, name varchar(500), description varchar(500), technical_info text, product_info text, price bigint, category_id bigint, brand_id bigint, images text, status varchar(100), quantity int, discount FLOAT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL
);

SELECT
    c.id AS categoryId,
    c.name AS categoryName,
    c.image_url AS categoryImageUrl,
    s.id AS subCategoryId,
    s.name AS subCategoryName,
    s.image_url AS subCategoryImageUrl, -- Add subcategory image URL
    p.id AS productId,
    p.name AS productName,
    p.images AS productImages,
    p.price AS productPrice,
    p.discount AS productDiscount,
    b.id AS brandId,
    b.name AS brandName
FROM
    category c
    LEFT JOIN category s ON c.id = s.parent_id
    LEFT JOIN product p ON s.id = p.category_id
    LEFT JOIN brand b ON p.brand_id = b.id;

CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), address VARCHAR(500), avatar TEXT, role_id BIGINT, active BOOLEAN, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

alter table user add column avatar text;

alter table user add column active BOOLEAN;

alter table user add column phone_number VARCHAR(20);

create table role (
    id BIGINT PRIMARY KEY auto_increment, name varchar(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

insert into role (name) values ("ADMIN");

insert into role (name) values ("EMPLOYEE");

insert into role (name) values ("USER");

insert into
    user (username, password, role_id)
values ("ADMIN2", "123", 1);

select * from user;