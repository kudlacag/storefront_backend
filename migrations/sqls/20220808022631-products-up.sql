/* Replace with your SQL commands */
CREATE TABLE products(product_id SERIAL PRIMARY KEY , name VARCHAR(50), price integer);

INSERT INTO products (product_id, name, price) VALUES (default, 'product one', 150)