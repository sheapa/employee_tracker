
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee_data
(
    id INT
    auto_increment,
    first_name VARCHAR
    (30) not null,
    last_name VARCHAR
    (30) not null,
    role_id INT not null,
    manager_id INT, 
    primary key
    (id)
);

    SELECT *
    from employee_data;