"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const provideToken = (req, res, next) => {
    const start = process.env.ENV !== 'test';
    if (start) {
        try {
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch (err) {
            res.status(403).json(`Acces denied, invalid token`);
        }
    }
};
exports.default = provideToken;
