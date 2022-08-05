import express, { Application, Response, Request } from "express";
import { Orders, Product, OrdersStore } from "../models/orders";
import provideToken from "../service/authenticate";

const store = new OrdersStore();

const create = async (req: Request, res: Response): Promise<void> => {
  const order: Orders = {
    status: req.body.status,
    user_id: req.body.user_id,
  };

  try {
    const addedOrder = await store.create(order);
    res.status(200);
    res.json(addedOrder);
  } catch (error) {
    res.status(401);
    res.send(`user_id doas not exist`);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const selectOrders = await store.index();
    res.status(200);
    res.json(selectOrders);
  } catch (error) {
    res.status(404);
    res.send(error);
  }
};
const showUsersOrder = async (req: Request, res: Response) => {
  const user_id = Number(req.params.id);
  try {
    const showUsersOrder = await store.showUsersOrder(user_id);
    res.status(200);
    res.json(showUsersOrder);
  } catch (err) {
    res.status(404);
    res.send(`could not found ${user_id} : ${err}`);
  }
};

const productToOrder = async (req: Request, res: Response) => {
  const quantity: string = req.body.quantity;
  const order_id: string = req.params.id;
  const product_id: string = req.body.product_id;

  const prod: Product = {
    quantity,
    order_id,
    product_id,
  };

  try {
    const createProduct = await store.productToOrder(prod);

    res.status(200);
    res.json(createProduct);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
};
const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const showOrder = await store.show(id);
    res.status(200);
    res.json(showOrder);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(`something went wrong could not found ${id} : ${err}`);
  }
};

const orders_route = (app: Application) => {
  app.get("/orders", provideToken, index);
  app.get("/orders/:id", provideToken, show);
  app.get("/orders/:id/users", provideToken, showUsersOrder);
  app.post("/orders", provideToken, create);
  app.post("/orders/:id/products", provideToken, productToOrder);
};
export default orders_route;
