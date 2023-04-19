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

  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Bienvenido a nuestra pagina",
    html: `<div> <p> Gracias ${name} haberte registrado en nuestra pagina
    web. Aqui
    encontraras
    lo mejores productos de gimnasio al mejor precio! </p></div>`,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendLoginMail(req: Request, res: Response) {
  const name = req.body.name;
  if (!name) {
    await transport.sendMail({
      from: process.env.EMAIL,
      to: req.body.to,
      subject: "Has iniciado sesión",
      html: `<div> <p> Has iniciado sesion en nuestra pagina web.</p></div>`,
    });
    //console.log(result)
    return res.status(200).send("The mail was sent");
  }
  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Has iniciado sesión",
    html: `<div> <p> ${name} has iniciado sesion en nuestra pagina web.</p></div>`,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendSuscriptionMail(req: Request, res: Response) {
  const name = req.body.name;

  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Bienvenido a nuestra pagina",
    html: `<div> <p>¡Gracias por suscribirte a nuestra página! Nos emociona tenerte como parte de nuestra comunidad y esperamos que disfrutes de los recursos y contenido que ofrecemos.</p>
    <p>En nuestra página encontrarás información valiosa sobre [tema de la página], incluyendo artículos, tutoriales, guías, videos y mucho más. También ofrecemos la oportunidad de conectarte con otros miembros de la comunidad para compartir ideas, hacer preguntas y colaborar en proyectos.</p>
    <p>Para mantenerte actualizado sobre nuestras últimas publicaciones y novedades, asegúrate de seguirnos en nuestras redes sociales [listar aquí las redes sociales de la página].</p>
    <p>Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros. Estamos siempre dispuestos a ayudar y a escuchar tus sugerencias para mejorar nuestra página.</p>
    <p>¡Gracias de nuevo por unirte a nuestra comunidad! Esperamos verte pronto en nuestra página.</p>
    <p>Atentamente,</p>
    <p>[Nombre del remitente]</p></div>`,
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
