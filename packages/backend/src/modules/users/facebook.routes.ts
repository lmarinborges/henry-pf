import { Router } from "express";
import { facebookAuth } from "./users.controller";

const facebookRouter = Router();

facebookRouter.post("/users", facebookAuth);

export default facebookRouter;
