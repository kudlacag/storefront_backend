CREATE DATABASE IF NOT EXISTS storefront_user;
CREATE DATABASE IF NOT EXISTS storefront_test_user;

CREATE USER IF NOT EXISTS store_admine WITH PASSWORD 'password123';

GRANT ALL PRIVILEGES ON DATABASE storefront_user TO store_admine;
GRANT ALL PRIVILEGES ON DATABASE storefront_test_user TO store_admine;
