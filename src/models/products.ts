import client from '../dababase';
import { Product } from './orders';

export type Prod = {
  product_id?: number;
  name: string;
  price: string;
};
export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`the orders_products could not found ${error}`);
    }
  }
  async show(product_id: number) {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * From products WHERE product_id=$1';
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`product_id Nr. ${product_id} do not exist : ${err}`);
    }
  }
  async createProduct(pro: Prod): Promise<Prod[]> {
    const { name, price } = pro;
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products(product_id, name, price) VALUES(default, $1, $2) RETURNING *';
      const result = await conn.query(sql, [name, price]);
      conn.release();
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`could not add ${name}: ${err}`);
    }
  }
}
