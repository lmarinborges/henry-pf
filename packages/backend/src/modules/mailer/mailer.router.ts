import { Router } from "express";
import { sendWelcomeMail } from "./mailer.controller";

const mailerRouter = Router();

mailerRouter.post("/mail", sendWelcomeMail);

export default mailerRouter;
