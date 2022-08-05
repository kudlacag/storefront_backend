"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsStore = void 0;
const dababase_1 = __importDefault(require("../dababase"));
class ProductsStore {
    async index() {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`the orders_products could not found ${error}`);
        }
    }
    async show(product_id) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'SELECT * From products WHERE product_id=$1';
            const result = await conn.query(sql, [product_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`product_id Nr. ${product_id} do not exist : ${err}`);
        }
    }
    async createProduct(pro) {
        const { name, price } = pro;
        try {
            const conn = await dababase_1.default.connect();
            const sql = 'INSERT INTO products(product_id, name, price) VALUES(default, $1, $2) RETURNING *';
            const result = await conn.query(sql, [name, price]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`could not add ${name}: ${err}`);
        }
    }
}
exports.ProductsStore = ProductsStore;
