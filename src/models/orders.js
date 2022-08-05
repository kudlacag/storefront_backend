"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersStore = void 0;
const dababase_1 = __importDefault(require("../dababase"));
class OrdersStore {
    async index() {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`something went wront on retrieving all orders: ${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'INSERT INTO orders (order_id, status, user_id) VALUES (default, $1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`could not add order: ${err}`);
        }
    }
    async showUsersOrder(user_id) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * From orders WHERE user_id=$1';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`user_id ${user_id} do not exist : ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE order_id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`the order id ${id} could not found in database: ${error}`);
        }
    }
    async productToOrder(product) {
        const { order_id, product_id } = product;
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE order_id =($1)';
            const result = await conn.query(sql, [order_id]);
            conn.release();
            const orders = result.rows[0];
            if (orders.status !== 'incomplete') {
                throw new Error(`this order number ${product_id} is on the way, because the status is ${orders.status}`);
            }
        }
        catch (error) {
            throw new Error(`something went wrong in the createProduct: ${error}`);
        }
        try {
            const { quantity, order_id, product_id } = product;
            const conn = await dababase_1.default.connect();
            const sql = 'INSERT INTO orders_product(id, quantity, order_id, product_id) VALUES(default, $1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`could not add orders_product table ${error}`);
        }
    }
}
exports.OrdersStore = OrdersStore;
