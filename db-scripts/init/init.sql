/* GRANT ALL PRIVILEGES ON mydb.* TO 'test'@'%' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON mydb.* TO 'test'@'localhost' IDENTIFIED BY 'test'; */

USE mydb;

CREATE TABLE user (
	id int auto_increment not null primary key,
    name varchar(100) not null,
    email varchar(100) not null,
    password VARCHAR(100) not null,
    role varchar(10) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE vehicle_dispatch (
	id int auto_increment not null primary key,
    customerId int not null,
    address varchar(250) not null,
    requestedAt date not null,
    driverId int,
    acceptedAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (name, email, password, role) values ('customer_tester1', 'tester1@gmail.com', "1234","CUSTOMER");
INSERT INTO user (name, email, password, role) values ('customer_tester2', 'tester2@gmail.com', "1234","CUSTOMER");
INSERT INTO user (name, email, password, role) values ('driver_tester1', 'tester2@gmail.com', "1234","DRIVER");
INSERT INTO user (name, email, password, role) values ('driver_tester2', 'tester2@gmail.com', "1234","DRIVER");

INSERT INTO vehicle_dispatch(customerId, address, requestedAt) values (1, "pangyo 35", now());
INSERT INTO vehicle_dispatch(customerId, address, requestedAt) values (1, "pangyo 10", now());
INSERT INTO vehicle_dispatch(customerId, address, requestedAt) values (3, "pangyo 40", now());
