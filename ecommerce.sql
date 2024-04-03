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