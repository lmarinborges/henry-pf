import { Router } from "express";
import { sendMail } from "./mailer.controller";

const mailerRouter = Router();

mailerRouter.post("/mail", sendMail);

export default mailerRouter;
