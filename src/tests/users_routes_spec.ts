import request from "supertest";
import { Server } from "http";
import { UsersStore } from "../models/users";
import app from "../server";

describe("User Routes", () => {
  const server: Server = app.listen();
  it("should return 403 status index Route", async () => {
    const index = await request(server).get("/users");
    // because it needs a token
    expect(index.status).toEqual(403);
  });

  //   second test the email will be already in database, here will fail unless
  // you change the email
  it("should create user a new user second test will fail", async () => {
    const creatUser = await request(server).post("/users").send({
      first_name: "smith",
      last_name: "jacson",
      email: "smith@hotmail.com",
      password_digest: "password123",
    });

    expect(creatUser.status).toEqual(200);
  });

  it("should return status 403", async () => {
    const showUser = await request(server).get("/users/1");
    // here it has to have token in the header
    expect(showUser.status).toBe(403);
  });
  it("should", async () => {
    const res = await request(server)
      .get("/users/auth")
      .send({ email: "smith@hotmail.com", password_digest: "password123" });
    expect(res.status).toBe(403);
  });
});
