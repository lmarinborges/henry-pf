import { Router } from "express";
import {
  sendEmailUpdate,
  sendLoginMail,
  sendWelcomeMail,
} from "./mailer.controller";

const mailerRouter = Router();

mailerRouter.post("/mail", sendWelcomeMail);
mailerRouter.post("/loginMail", sendLoginMail);
mailerRouter.post("/sendEmailUpdate", sendEmailUpdate);

export default mailerRouter;
