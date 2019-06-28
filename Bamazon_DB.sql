DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name  VARCHAR(40) NULL,
    department_name VARCHAR(40) NULL,
    customer_price INT(30) NULL,
    stock_quantity INT(50) NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("Landmines", "home&garden", 225, 380);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("kitchen shears", "kitchen", 25, 120);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("popsicles", "grocery", 5, 500);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("lettuce", "grocery", 2, 80);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("machine guns", "exercise&fitness", 22205, 20);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("bible", "books", 15, 200);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("lock picking set", "home&garden", 80, 150);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("applesauce", "grocery", 7, 500);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("condoms", "pharmacy", 12, 1000);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("disgruntled employees", "home&garden", 17500, 20);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("eggs", "grocery", 8, 1200);
-- mock items cont'd --
INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES("exercise bands", "exercise&fitness", 225, 380);


SELECT * FROM products