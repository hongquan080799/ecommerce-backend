create database ecommerce;

use ecommerce;

create table category (
    id bigint primary key auto_increment, name varchar(500), image_url text, parent_id bigint
);