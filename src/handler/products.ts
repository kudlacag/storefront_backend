import express, { Application, Request, Response } from 'express';

import { ProductsStore, Prod } from '../models/products';
import provideToken from '../service/authenticate';

const store = new ProductsStore();

const index = async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.status(200);
    res.json(index);
  } catch (error) {
    res.status(404);
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  const product_id = req.params.id as unknown as number;
  try {
    const index = await store.show(product_id);

    res.status(200);
    res.json(index);
  } catch (error) {
    res.status(404);
    res.send(`could not found ${product_id}: ${error}`);
  }
};
const createProduct = async (req: Request, res: Response) => {
  const prod: Prod = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const product = await store.createProduct(prod);
    res.status(200);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const add_product_orders_route = (app: Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', provideToken, createProduct);
};

export default add_product_orders_route;
