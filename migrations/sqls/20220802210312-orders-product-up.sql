/* Replace with your SQL commands */
CREATE TABLE orders_product(id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(order_id), product_id bigint REFERENCES products(product_id))
