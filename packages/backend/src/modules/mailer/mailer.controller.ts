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

export async function sendWelcomeMail(req: Request, res: Response) {
  const name = req.body.name;

  const result = await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Bienvenido a nuestra pagina",
    html: `<div> <p> Gracias ${name} haberte registrado en nuestra pagina
    web. Aqui
    encontraras
    lo mejores productos de gimnasio al mejor precio! </p></div>`,
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

export async function sendEmailUpdate(req: Request, res: Response) {
  const subjectValue = "Tus datos de usuario fueron actualizados";
  const bodyValue = `<div> <h1> Xsportsclub </h1>
                       <h2> Tus datos de usuario fueron actualizados con éxito </h2>
                       Nombre: ${req.body.name} <br>
                       Estado: ${req.body.state} <br>
                       Rol: ${req.body.role} <br>
                       </div>`;

  const result = await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: subjectValue,
    html: bodyValue,
    attachments: [],
  });
  return res.status(200).send("The mail was sent");
}
