import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(req: Request, res: Response) {
  const result = await transport.sendMail({
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html,
    attachments: [
      /*  {
        filename: req.body.filename, // 'images.jpg',
        path: __dirname + "/images/images.jpg", //req.body.path, // __dirname + '/images/images.jpg',
        cid: req.body.cid,
      }, */
    ],
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}
