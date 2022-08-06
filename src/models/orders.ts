import client from "../dababase";

export type Orders = {
  order_id?: number;
  status: string;
  user_id: number;
};
export type Product = {
  id?: number;
  quantity: string;
  order_id: string;
  product_id: string;
};

export class OrdersStore {
  async index(): Promise<Orders[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`something went wront on retrieving all orders: ${err}`);
    }
  }

  async create(o: Orders): Promise<Orders[]> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (order_id, status, user_id) VALUES (default, $1, $2) RETURNING *";
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not add order: ${err}`);
    }
  }
  async showUsersOrder(user_id: number) {
    try {
      const conn = await client.connect();
      const sql = "SELECT * From orders WHERE user_id=$1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`user_id ${user_id} do not exist : ${err}`);
    }
  }

  async show(id: number): Promise<Orders[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE order_id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `the order id ${id} could not found in database: ${error}`
      );
    }
  }

  async productToOrder(product: Product): Promise<Product[]> {
    const { order_id, product_id } = product;
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE order_id =$1";
      const result = await conn.query(sql, [order_id]);
      conn.release();
      const orders = result.rows[0];
      console.log(orders.status);
      if (orders.status !== "incomplete") {
        throw new Error(
          `this order number ${product_id} is on the way, because the status is ${orders.status}`
        );
      }
    } catch (error) {
      throw new Error(`something went wrong in the createProduct: ${error}`);
    }

    try {
      const { quantity, order_id, product_id } = product;
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders_product(id, quantity, order_id, product_id) VALUES(default, $1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      console.log(result);
      return result.rows;
    } catch (error) {
      throw new Error(`could not add orders_product table ${error}`);
    }
  }
}
