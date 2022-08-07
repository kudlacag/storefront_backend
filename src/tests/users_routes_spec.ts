import request from "supertest";
import app from "../server";
import { UsersStore } from "../models/users";

const store = new UsersStore();
const getToken = async () => {
  const token = await request(app)
    .get("/user/auth/1")
    .send({ password_digest: "password123" });
  return token.body;
};

describe("User Routes", () => {
  let token = "";
  beforeAll(async () => {
    token = await getToken();
  });
  it("should send back status of 200 authentication", async () => {
    const res = await request(app)
      .get("/user/auth/1")
      .send({ password_digest: "password123" });
    expect(res.status).toBe(200);
  });
  it("should create user a new user second test will fail", async () => {
    const creatUser = await request(app).post("/users").send({
      first_name: "smith",
      last_name: "jacson",
      password_digest: "password123",
    });

    expect(creatUser.status).toEqual(200);
  });

  it("should return 200 status index Route", async () => {
    const index = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${token}`);

    expect(index.status).toEqual(200);
  });
});
