import { Router } from "express";
import { sendEmailUpdate, sendWelcomeMail } from "./mailer.controller";

const mailerRouter = Router();

mailerRouter.post("/mail", sendWelcomeMail);
mailerRouter.post("/sendEmailUpdate", sendEmailUpdate);

export default mailerRouter;
