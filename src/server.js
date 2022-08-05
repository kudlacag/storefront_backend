"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./handler/users"));
const orders_1 = __importDefault(require("./handler/orders"));
const products_1 = __importDefault(require("./handler/products"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// users route
(0, users_1.default)(app);
// orders route
(0, orders_1.default)(app);
// add product
(0, products_1.default)(app);
app.get('/', function (req, res) {
    res.send('server is working normal');
});
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
