CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255), 
department_name VARCHAR(255),
price DECIMAL(10,2),
stock_quantity INT,
PRIMARY KEY (item_id)
);