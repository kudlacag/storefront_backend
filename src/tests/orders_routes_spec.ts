import request from "supertest";
import app from "../server";
import { Server } from "http";

const getToken = async () => {
  const token = await request(app)
    .get("/user/auth/1")
    .send({ password_digest: "password123" });
  return token.body;
};

describe("Testing for Orders Routes", () => {
  let token = "";

  beforeAll(async () => {
    token = await getToken();
  });
  const server: Server = app.listen();
  it("should return 200 status code", async () => {
    const index = await request(server)
      .get("/orders")
      .set("authorization", `Bearer ${token}`);
    expect(index.status).toBe(200);
  });

  it("should add order to product if token provided", async () => {
    const addOrderToProduct = await request(server)
      .post("/orders/1/products")
      .send({
        quantity: 6,
        product_id: "1",
      })
      .set("authorization", `Bearer ${token}`);
    expect(addOrderToProduct.status).toBe(200);
  });
  it("should create order", async () => {
    const ordered = await request(server).post("/orders").send({
      status: "completed",
      user_id: 1,
    });
    expect(ordered.status).toEqual(403);
  });
  it("should show order per id if authenticated", async () => {
    const show = await request(server)
      .get("/orders/1")
      .set("authorization", `Bearer ${token}`);
    expect(show.status).toBe(200);
  });
  it("should show users orders", async () => {
    const showOrderUser = await request(server)
      .get("/orders/1/users")
      .set("authorization", `Bearer ${token}`);
    expect(showOrderUser.status).toEqual(200);
  });
});
