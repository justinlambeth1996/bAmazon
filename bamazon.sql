CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255), 
department_name VARCHAR(255),
price DECIMAL(10,2),
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GPU", "Computers", 299.99, 6), ("CPU", "Computers", 99.89, 25), ("Motherboard", "Computers", 79.99, 12), ("Memory card", "Computers", 50.00, 10), 
("Keyboard", "Computers", 149.99, 15), ("HD Monitor", "Computers", 289.99, 3), ("Headset", "Audio", 19.99, 10), ("Skittles", "Pets", 0.99, 1);

SELECT * FROM products;