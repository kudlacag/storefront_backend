import request from "supertest";
import app from "../server";

const getToken = async () => {
  const token = await request(app)
    .get("/user/auth/1")
    .send({ password_digest: "password123" });
  return token.body;
};
describe("Test for Products routes", () => {
  let token = "";

  beforeAll(async () => {
    token = await getToken();
  });

  it("should show products per id number ", async () => {
    const show = await request(app).get("/products/1");
    expect(show.status).toEqual(200);
  });
  it("should send status 200  it will allow to post the product", async () => {
    const addProducts = await request(app)
      .post("/products")
      .send({
        name: "product one",
        price: 5,
      })
      .set("authorization", `Bearer ${token}`);
    expect(addProducts.status).toEqual(200);
  });

  it("should show all products ", async () => {
    const index = await request(app).get("/products");
    expect(index.status).toEqual(200);
  });
});
