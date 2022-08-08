/* Replace with your SQL commands */
CREATE TABLE orders(order_id SERIAL PRIMARY KEY, status VARCHAR(20), user_id bigint REFERENCES users(user_id));

INSERT INTO orders (order_id, status, user_id) VALUES (default, 'incomplete', 1)