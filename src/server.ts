import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import users_routes from './handler/users';
import orders_route from './handler/orders';
import add_product_orders_route from './handler/products';

dotenv.config();
const app: express.Application = express();
const address: string = '0.0.0.0:3000';
const port: number = 3000;
app.use(bodyParser.json());
app.use(cors());
// users route
users_routes(app);
// orders route
orders_route(app);
// add product
add_product_orders_route(app);

app.get('/', function (req: Request, res: Response) {
  res.send('server is working normal');
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
