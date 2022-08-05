DATABASE Design (SCHEMA)

# users schema

user_id: SERIAL PRIMARY KEY
first_name: VARCHAR(30)
last_name: VARCHAR(30)
password_digest: VARCHAR(150)

## products schema public

product_id: SERIAL PRIMARY KEY
name: VARCHAR(30)
price: integer

### orders schema public has fkey

order_id: SERIAL PRIMARY KEY
status: VARCHAR(20) = 'incomplete' | 'completed'
user_id: bigint REFERENCES users(user_id) is foreign key (users)

#### Order_Products has fkey is Join Table

id: SERIAL PRIMARY KEY
quantity: integer
order_id: bigint REFERENCES orders(order_id) is fk (orders)
product_id: bigint REFERENCES products(product_id) is fkey (product)

# USERS API ENDPOINTS

GET/ app.get("/users", provideToken, index); provide token is INDEX returns all users
POST/ app.post("/users", create); create user returns token
GET/ app.get("/users/:id", provideToken, show); provide token and i show specific users returns user data
GET/ app.get("/user/auth/:id", authenticate); signing in returns token
DELETE/ app.delete("/users/:id", provideToken, deleteUser); provide token deletes user

## ORDERS API ENDPOINTS

GET/ app.get("/orders", provideToken, index); provide token is INDEX returns all orders
GET/ app.get("/orders/:id", provideToken, show); provide token and id show specific order return order data  
GET/ app.get("/orders/:id/users", provideToken, showUsersOrder); provide token userID return all orders of the userID entered
POST/ app.post("/orders", provideToken, create); provide token creates order
POST/ app.post("/orders/:id/products", provideToken, productToOrder); provide token adds product to order

### PRODUCT API ENDPOINTS

GET/ app.get('/products', index); return all products
GET/ app.get('/products/:id', show); return a product
POST/ app.post('/products', provideToken, createProduct); provide token creates a product
