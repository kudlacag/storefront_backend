import { ProductsStore, Prod } from "../models/products";

const store = new ProductsStore();
describe("orders index testing", () => {
  it("should have an index method defined", () => {
    expect(store.index).toBeDefined();
  });

  it("should exist the showUsersOrder method", () => {
    expect(store.createProduct).toBeDefined();
  });
  it("should exist the show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should create a new product", async () => {
    const newProduct = {
      name: "product one",
      price: "150",
    };
    const createdProduct = await store.createProduct(newProduct);
    const [{ name, price }] = createdProduct;
    expect(typeof createdProduct).toBe("object");
    expect(name).toEqual("product one");
    expect(price).toEqual(150 as unknown as string);
  });

  it("should show product with the product_id", async () => {
    const showProduct = await store.show(1);
    const [{ name, price, product_id }] = showProduct;
    // expect(showProduct.length).toEqual(1);
    expect(product_id).toEqual(1);
    expect(name).toEqual("product one");
    expect(price).toEqual(150);
  });

  it("should show show all products", async () => {
    const index = await store.index();
    expect(index.length).toBeGreaterThanOrEqual(1);
    expect(index[0].product_id).toEqual(1 as unknown as string);
  });
});
