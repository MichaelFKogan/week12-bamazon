

USE bamazon_db;

CREATE TABLE products(
Item_ID INTEGER(11) AUTO_INCREMENT NOT NULL,
Product_Name VARCHAR(30),
Department_Name VARCHAR(30),
Price DECIMAL(10,2),
Stock_Quantity INTEGER(10),
PRIMARY KEY (Item_ID)
);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Dish Soap","Soap", 5, 4);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Old Spice Deoderant", "Deoderant", 7.50, 600);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Basketball","Sports", 12.50, 500);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Baseball Bat","Sports", 30, 100);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Air Jordan Sneakers","Shoes", 150, 4);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Winter Jacket","Clothes", 175, 400);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Banana","Food", 0.50, 1000);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Red Apple","Food", 1, 700);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Green Apple","Food", 1,700);

INSERT INTO products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES("Snickers","Candy", 1, 4);

SELECT * FROM products;