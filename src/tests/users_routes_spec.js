"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("User Routes", () => {
    const server = server_1.default.listen();
    it("should return 403 status index Route", async () => {
        const index = await (0, supertest_1.default)(server).get("/users");
        // because it needs a token
        expect(index.status).toEqual(403);
    });
    //   second test the email will be already in database, here will fail unless
    // you change the email
    it("should create user a new user second test will fail", async () => {
        const creatUser = await (0, supertest_1.default)(server).post("/users").send({
            first_name: "smith",
            last_name: "jacson",
            email: "smith@hotmail.com",
            password_digest: "password123",
        });
        expect(creatUser.status).toEqual(200);
    });
    it("should return status 403", async () => {
        const showUser = await (0, supertest_1.default)(server).get("/users/1");
        // here it has to have token in the header
        expect(showUser.status).toBe(403);
    });
    it("should", async () => {
        const res = await (0, supertest_1.default)(server)
            .get("/users/auth")
            .send({ email: "smith@hotmail.com", password_digest: "password123" });
        expect(res.status).toBe(403);
    });
});
