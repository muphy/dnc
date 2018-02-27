/* GRANT ALL PRIVILEGES ON mydb.* TO 'test'@'%' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON mydb.* TO 'test'@'localhost' IDENTIFIED BY 'test'; */

USE mydb;

CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE client (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY Idx_client_userId (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE driver (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY Idx_driver_userId (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE vehicle_dispatch (
  id int(11) NOT NULL AUTO_INCREMENT,
  address varchar(250) NOT NULL,
  requested_at date NOT NULL,
  driver_id int(11) DEFAULT NULL,
  accepted_at date DEFAULT NULL,
  customer_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_vehicle_dispatches_driver_id (driver_id),
  KEY idx_vehicle_dispatches_customer_id (customer_id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;


