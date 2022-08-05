import { UsersStore } from "../models/users";

const store = new UsersStore();

describe("Users methods testing", () => {
  it("should exist as method Create", () => {
    expect(store.create).toBeDefined();
  });
  it("should create new user", async () => {
    const newUser = await store.create({
      first_name: "john",
      last_name: "doe",

      password_digest: "password123",
    });

    expect(newUser.first_name).toEqual("john");
    expect(newUser.last_name).toEqual("doe");
    expect(newUser.password_digest.length).toBeGreaterThan(30);
    expect(newUser.password_digest).not.toEqual("bhnbhssjh");
  });

  it("should be defined the Show Method", () => {
    expect(store.show).toBeDefined();
  });
  it("should show a user when the right user_id passed", async () => {
    const show = await store.show(1);
    const [{ user_id, first_name, last_name, password_digest }] = show;
    expect(user_id).toEqual(1);
    expect(first_name).toEqual("john");
    expect(last_name).toEqual("doe");
    expect(password_digest).not.toEqual("password123");
  });
  it("should return the show method undefined if passed wrong user_id", async () => {
    const result = await store.show(0);
    expect(result).toEqual([]);
  });
  it("should return array of users Index", async () => {
    const index = await store.index();
    expect(index.length).toBeGreaterThanOrEqual(0);
  });

  it("should return authenticate method is defined", () => {
    expect(store.authenticate).toBeDefined();
  });
  it("autheticate method should return token if email and password is right", async () => {
    const authenticate = await store.authenticate("1", "password123");
    expect(authenticate?.password_digest.length).toBeGreaterThan(40);
    expect(authenticate?.user_id).toBeUndefined();
    expect(authenticate?.password_digest).not.toEqual("password123");
  });
});
