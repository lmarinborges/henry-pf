import { Router } from "express";
import { UserAuthenticated, isAuthenticated } from "./users.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { z } from "zod";
import prisma from "../../db";
import { encryptPassword } from "./encrypt";

const googleRouter = Router();

const googleSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const idSchema = z.object({
  id: z.string().min(1),
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "197744883747-1ojne05mp2a2m56kp9mg0bd5mm38p96k.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const { email, name } = await googleSchema.parseAsync(profile._json);
      const { id } = await idSchema.parseAsync(profile);
      const useremail = email;
      const hashedPassword: string = await encryptPassword(id);

      const user_created = await prisma.user.upsert({
        where: { email: useremail },
        create: {
          email: useremail,
          name: name,
          password: hashedPassword,
          role: "USER",
          state: "Active",
        },
        update: {},
      });
      return cb(null, user_created);
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

googleRouter.get("/failed", (req, res) => {
  res.json({ state: "failed", message: "la autenticacion fallo" });
});

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.send(JSON.stringify(req.user));
  }
);

googleRouter.get("/prUsers", isAuthenticated, UserAuthenticated);

googleRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("deslogueado correctamente");
  });
});

export default googleRouter;
