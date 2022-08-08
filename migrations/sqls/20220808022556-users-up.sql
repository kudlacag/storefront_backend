/* Replace with your SQL commands */
CREATE TABLE users(user_id SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), password_digest VARCHAR(100));

INSERT INTO users(user_id, first_name, last_name, password_digest) VALUES (default, 'smith', 'jacson', 'password123')