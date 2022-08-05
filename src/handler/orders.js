"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authenticate_1 = __importDefault(require("../service/authenticate"));
const store = new orders_1.OrdersStore();
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const addedOrder = await store.create(order);
        res.status(200);
        res.json(addedOrder);
    }
    catch (error) {
        res.status(401);
        res.send(`user_id doas not exist`);
    }
};
const index = async (req, res) => {
    try {
        const selectOrders = await store.index();
        res.status(200);
        res.json(selectOrders);
    }
    catch (error) {
        res.status(404);
        res.send(error);
    }
};
const showUsersOrder = async (req, res) => {
    const user_id = Number(req.params.id);
    try {
        const showUsersOrder = await store.showUsersOrder(user_id);
        res.status(200);
        res.json(showUsersOrder);
    }
    catch (err) {
        res.status(404);
        res.send(`could not found ${user_id} : ${err}`);
    }
};
const productToOrder = async (req, res) => {
    const quantity = req.body.quantity;
    const order_id = req.params.id;
    const product_id = req.body.product_id;
    const prod = {
        quantity,
        order_id,
        product_id,
    };
    try {
        const createProduct = await store.productToOrder(prod);
        res.status(200);
        res.json(createProduct);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    }
};
const show = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const showOrder = await store.show(id);
        res.status(200);
        res.json(showOrder);
    }
    catch (err) {
        console.log(err);
        res.status(404);
        res.send(`something went wrong could not found ${id} : ${err}`);
    }
};
const orders_route = (app) => {
    app.get("/orders", authenticate_1.default, index);
    app.get("/orders/:id", authenticate_1.default, show);
    app.get("/orders/:id/users", authenticate_1.default, showUsersOrder);
    app.post("/orders", authenticate_1.default, create);
    app.post("/orders/:id/products", authenticate_1.default, productToOrder);
};
exports.default = orders_route;
