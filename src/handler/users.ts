import express, { Application, Response, Request, NextFunction } from "express";
import { User, UsersStore } from "../models/users";
import jwt from "jsonwebtoken";
import provideToken from "../service/authenticate";

const store = new UsersStore();

type UserSignIn = {
  user_id: string;
  password: string;
};

const index = async (_req: Request, res: Response) => {
  try {
    const allUsers = await store.index();
    res.status(200);
    res.json(allUsers);
  } catch (err) {
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

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    // email: req.body.email,
    password_digest: req.body.password_digest,
  };

  try {
    const createdUser = await store.create(user);
    const token = jwt.sign(
      { user: createdUser },
      process.env.JWT_SECRET as unknown as string
    );
    res.json(token);
  } catch (err) {
    res.status(400).send(`could not create ${user.first_name}: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const show = await store.show(id);
    res.status(200);
    res.json(show);
  } catch (error) {
    res.status(404);
    res.send(`could not found the user ${error}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: UserSignIn = {
    user_id: req.params.user_id,
    password: req.body.password_digest,
  };

  try {
    const u = await store.authenticate(user.user_id, user.password);
    const token = jwt.sign({ user: u }, process.env.JWT_SECRET as string);

    res.status(200).json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deleted = await store.deleted(id);
    res.status(200);
    res.json(`the user id number ${id} was deleted from the databse`);
  } catch (error) {
    res.status(404);
    res.send(`the ${id} could not delete or may be it doas not exist ${error}`);
  }
};

const users_routes = (app: Application) => {
  app.get("/users", provideToken, index);
  app.post("/users", create);
  app.get("/users/:id", provideToken, show);
  app.get("/user/auth/:id", authenticate);
  app.delete("/users/:id", provideToken, deleteUser);
};
export default users_routes;
