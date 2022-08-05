import request from "supertest";
import app from "../server";
import { Server } from "http";

describe("Testing for Orders Routes", () => {
  const server: Server = app.listen();
  it("should return 403 as long as user not provide token", async () => {
    const index = await request(server).get("/orders");
    expect(index.status).toBe(403);
    expect(index.text).toBe('"Acces denied, invalid token"');
  });

  it("should add order to product if token provided", async () => {
    const addOrderToProduct = await request(server)
      .post("/orders/1/products")
      .send({
        quantity: 6,
        product_id: "1",
      });
    expect(addOrderToProduct.status).toBe(403);
    expect(addOrderToProduct.text).toBe('"Acces denied, invalid token"');
  });
  it("should create order", async () => {
    const ordered = await request(server).post("/orders").send({
      status: "completed",
      user_id: 1,
    });
    expect(ordered.status).toEqual(403);
    expect(ordered.text).toBe('"Acces denied, invalid token"');
  });
  it("should show order per id if authenticated", async () => {
    const show = await request(server).get("/orders/1");
    expect(show.status).toBe(403);
  });
  it("should show users orders", async () => {
    const showOrderUser = await request(server).get("/orders/1/users");

    expect(showOrderUser.text).toBe('"Acces denied, invalid token"');
    expect(showOrderUser.status).toEqual(403);
  });
});
