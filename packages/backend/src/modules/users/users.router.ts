import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./users.controller";

const usersRouter = Router();

usersRouter
  .get("/users", getAllUsers)
  .post("/users", createUser)
  .patch("/users/:userId", updateUser)
  .delete("/users", deleteUser);

export default usersRouter;
