import { OrdersStore, Product } from "../models/orders";

const store = new OrdersStore();
describe("orders Testing", () => {
  it("should have an index method defined", () => {
    expect(store.index).toBeDefined();
  });

  it("should exist the create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should exist the showUsersOrder method", () => {
    expect(store.showUsersOrder).toBeDefined();
  });
  it("should exist the show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should exist the productToOder method", () => {
    expect(store.productToOrder).toBeDefined();
  });

  it("should create new order", async () => {
    const order = { status: "incomplete", user_id: 1 };
    const newOrder = await store.create(order);

    const [{ order_id, status, user_id }] = newOrder;
    expect(typeof order_id).toBe("number");
    expect(status).toEqual("incomplete");
    expect(user_id).toBeCloseTo(1);
  });

  it("should show the users order ", async () => {
    const usersOrders = await store.showUsersOrder(1);
    expect(usersOrders[1].order_id).toBeGreaterThanOrEqual(1);
    expect(usersOrders[1].status).toBe("incomplete");
    expect(usersOrders[1].user_id).toEqual("1");
  });

  it("should add products to join table orders_product", async () => {
    const addProductToOrder = {
      quantity: "10",
      order_id: "1",
      product_id: "1",
    };

    const addedPruduct = await store.productToOrder(addProductToOrder);
    const [{ quantity, order_id, product_id }] = addedPruduct;
    expect(typeof addedPruduct).toEqual("object");
    expect(quantity).toEqual(10 as unknown as string);
    expect(order_id).toEqual("1");
    expect(product_id).toEqual("1");
  });

  it("should return a list of orders", async () => {
    const result = await store.index();
    expect(result[0]).toEqual({
      order_id: 1,
      status: "incomplete",
      user_id: "1" as unknown as number,
    });
  });
});
