DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee_data (
    `id` INT auto_increment,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT NOT NULL,
    `manager_id` INT,
    primary key(id)
);

CREATE TABLE role_data (
    `id` INT NOT NULL,
    `title` VARCHAR(30),
    `salary` DECIMAL(30),
    `department_id` INT
);

CREATE TABLE department_data (
    `id` INT NOT NULL,
    `name` VARCHAR(30)
);

SELECT * from employee_data;

SELECT * from role_data;

SELECT * from department_data;