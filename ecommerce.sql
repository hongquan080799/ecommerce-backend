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
)