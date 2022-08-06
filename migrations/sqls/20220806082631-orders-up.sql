/* Replace with your SQL commands */
CREATE TABLE orders(order_id SERIAL PRIMARY KEY, status VARCHAR(20), user_id bigint REFERENCES users(user_id))