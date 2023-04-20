import { Router } from "express";
import {
  sendEmailUpdate,
  sendLoginMail,
  sendSuscriptionMail,
  sendWelcomeMail,
} from "./mailer.controller";

const mailerRouter = Router();

mailerRouter.post("/mail", sendWelcomeMail);
mailerRouter.post("/loginMail", sendLoginMail);
mailerRouter.post("/sendEmailUpdate", sendEmailUpdate);
mailerRouter.post("/sendSuscription", sendSuscriptionMail);

export default mailerRouter;
