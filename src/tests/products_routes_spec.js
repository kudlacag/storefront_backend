"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("Test for Products routes", () => {
    const server = server_1.default.listen();
    it("should return product per product_id", async () => { });
    it("should show products per id number ", async () => {
        const show = await (0, supertest_1.default)(server).get("/products/1");
        expect(show.status).toEqual(200);
    });
    it("should send status 403 with out the a token, it will not allow to post the product", async () => {
        // again it needs a token in the authorization
        const addProducts = await (0, supertest_1.default)(server).post("/products").send({
            name: "product one",
            price: 5,
        });
        expect(addProducts.text).toBe('"Acces denied, invalid token"');
        expect(addProducts.status).toEqual(403);
    });
    it("should show all products ", async () => {
        const index = await (0, supertest_1.default)(server).get("/products");
        expect(index.status).toEqual(200);
    });
});
