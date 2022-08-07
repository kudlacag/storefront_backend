# Storefront Backend Project

## Basic instructions

1. npm install
2. npm run dockerdb

# Create user and database

this backend database has two Databases and one user please
create databses and one user to use it
Database 1 name = onlinestore_user
Database 2 name = onlinestore_test_user
also allow all privileges to not have sideeffects

or just copy this code in your psq CL

CREATE DATABSE onlinestore_user;
CREATE DATABASE onlinestore_test_user;
CREATE USER store_admine WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE onlinestore_user TO store_admine;
GRANT ALL PRIVILEGES ON DATABASE onlinestore_test_user TO store_admine;

This project is ready to start .

## Run commands

to start run start
to test run test
to start docker run dockerdb
to compile to javascript run watch

### .env file variables

POSTGRES_HOST = 127.0.0.1
POSTGRES_PORT = 5432
POSTGRES_DB_TEST = onlinestore_test
POSTGRES_DB = onlinestore
POSTGRES_USER = store_admine
POSTGRES_PASSWORD = password123
BCRYP_PASSWORD = password123
SALT_ROUNDS = 10
JWT_SECRET = password123
ENV=dev

database design and endpoints is the REQUIREMENT.md file
