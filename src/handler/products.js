"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const authenticate_1 = __importDefault(require("../service/authenticate"));
const store = new products_1.ProductsStore();
const index = async (req, res) => {
    try {
        const index = await store.index();
        res.status(200);
        res.json(index);
    }
    catch (error) {
        res.status(404);
        res.send(error);
    }
};
const show = async (req, res) => {
    const product_id = req.params.id;
    try {
        const index = await store.show(product_id);
        res.status(200);
        res.json(index);
    }
    catch (error) {
        res.status(404);
        res.send(`could not found ${product_id}: ${error}`);
    }
};
const createProduct = async (req, res) => {
    const prod = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const product = await store.createProduct(prod);
        res.status(200);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
const add_product_orders_route = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authenticate_1.default, createProduct);
};
exports.default = add_product_orders_route;
