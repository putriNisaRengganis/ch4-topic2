create database customer;
CREATE DATABASE
create table customers(
    id bigserial primary key,
    nama varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    is_active boolean not null
);