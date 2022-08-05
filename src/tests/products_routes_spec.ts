import request from "supertest";
import app from "../server";
import { Server } from "http";

describe("Test for Products routes", () => {
  const server: Server = app.listen();

  it("should return product per product_id", async () => {});
  it("should show products per id number ", async () => {
    const show = await request(server).get("/products/1");

    expect(show.status).toEqual(200);
  });
  it("should send status 403 with out the a token, it will not allow to post the product", async () => {
    // again it needs a token in the authorization
    const addProducts = await request(server).post("/products").send({
      name: "product one",
      price: 5,
    });
    expect(addProducts.text).toBe('"Acces denied, invalid token"');
    expect(addProducts.status).toEqual(403);
  });

  it("should show all products ", async () => {
    const index = await request(server).get("/products");
    expect(index.status).toEqual(200);
  });
});
