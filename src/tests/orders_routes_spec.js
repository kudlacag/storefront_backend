"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("Testing for Orders Routes", () => {
    const server = server_1.default.listen();
    it("should return 403 as long as user not provide token", async () => {
        const index = await (0, supertest_1.default)(server).get("/orders");
        expect(index.status).toBe(403);
        expect(index.text).toBe('"Acces denied, invalid token"');
    });
    it("should add order to product if token provided", async () => {
        const addOrderToProduct = await (0, supertest_1.default)(server)
            .post("/orders/1/products")
            .send({
            quantity: 6,
            product_id: "1",
        });
        expect(addOrderToProduct.status).toBe(403);
        expect(addOrderToProduct.text).toBe('"Acces denied, invalid token"');
    });
    it("should create order", async () => {
        const ordered = await (0, supertest_1.default)(server).post("/orders").send({
            status: "completed",
            user_id: 1,
        });
        expect(ordered.status).toEqual(403);
        expect(ordered.text).toBe('"Acces denied, invalid token"');
    });
    it("should show order per id if authenticated", async () => {
        const show = await (0, supertest_1.default)(server).get("/orders/1");
        expect(show.status).toBe(403);
    });
    it("should show users orders", async () => {
        const showOrderUser = await (0, supertest_1.default)(server).get("/orders/1/users");
        expect(showOrderUser.text).toBe('"Acces denied, invalid token"');
        expect(showOrderUser.status).toEqual(403);
    });
});
