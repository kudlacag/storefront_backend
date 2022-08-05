"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = __importDefault(require("../service/authenticate"));
const store = new users_1.UsersStore();
const index = async (_req, res) => {
    try {
        const allUsers = await store.index();
        res.status(200);
        res.json(allUsers);
    }
    catch (err) {
        res.status(400);
        res.json(`could call users ${err}`);
    }
};
// const userExist = async (req: Request, res: Response, next: NextFunction) => {
//   const email: string = req.body.email;
//   const userExist = await store.userExist(email);
//   if (userExist) {
//     res
//       .status(404)
//       .json(`this email ${email} exist already, please try an ather email `);
//   } else {
//     next();
//   }
//   console.log(userExist);
//   return userExist;
// };
const create = async (req, res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        // email: req.body.email,
        password_digest: req.body.password_digest,
    };
    try {
        const createdUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: createdUser }, process.env.JWT_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400).send(`could not create ${user.first_name}: ${err}`);
    }
};
const show = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const show = await store.show(id);
        res.status(200);
        res.json(show);
    }
    catch (error) {
        res.status(404);
        res.send(`could not found the user ${error}`);
    }
};
const authenticate = async (req, res) => {
    const user = {
        user_id: req.params.user_id,
        password: req.body.password_digest,
    };
    try {
        const u = await store.authenticate(user.user_id, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.JWT_SECRET);
        res.status(200).json(token);
    }
    catch (err) {
        console.log(err);
        res.status(401);
        res.json(err);
        console.log(err);
    }
};
const deleteUser = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deleted = await store.deleted(id);
        res.status(200);
        res.json(`the user id number ${id} was deleted from the databse`);
    }
    catch (error) {
        res.status(404);
        res.send(`the ${id} could not delete or may be it doas not exist ${error}`);
    }
};
const users_routes = (app) => {
    app.get("/users", authenticate_1.default, index);
    app.post("/users", create);
    app.get("/users/:id", authenticate_1.default, show);
    app.get("/user/auth/:id", authenticate);
    app.delete("/users/:id", authenticate_1.default, deleteUser);
};
exports.default = users_routes;
