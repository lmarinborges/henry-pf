import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import passport from "passport";
import { ZodError } from "zod";
import { sessionMaxAge, sessionSecret } from "./config";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";
import reviewsRouter from "./modules/reviews";
import facebookRouter from "./modules/users/facebook.routes";
import localRouter from "./modules/users/local.routes";
import usersRouter from "./modules/users/users.router";
import logger from "./utils/logger";

const apiRouter = Router();

// Middleware
apiRouter.use(express.json());
apiRouter.use(
  session({
    secret: sessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: sessionMaxAge(),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// Authentication
apiRouter.use(passport.initialize());
apiRouter.use(passport.session());

// Routes
apiRouter.use(productsRouter);
apiRouter.use(brandsRouter);
apiRouter.use(categoriesRouter);
apiRouter.use(usersRouter);
apiRouter.use(reviewsRouter);
apiRouter.use(facebookRouter);
apiRouter.use(localRouter);

// 404 Handler
apiRouter.use((_req, res) => {
  res.status(404).json({
    status: 404,
    message: "Requested resource does not exist.",
  });
});

// Error handler
apiRouter.use(
  (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    if (err instanceof ZodError) {
      res.status(400).json({ status: 400, errors: err.issues });
    } else if (
      err instanceof PrismaClientKnownRequestError &&
      (err.name === "NotFoundError" || err.code === "P2025")
    ) {
      res
        .status(404)
        .json({ status: 404, message: "Requested resource does not exist." });
    } else if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      res.status(409).json({
        status: 409,
        message: "A field with an invalid ID was provided.",
      });
    } else {
      if (err instanceof Error) {
        logger.error(err.message);
        logger.debug(err.stack);
      } else {
        logger.error(err);
      }
      res.status(500).json({
        status: 500,
        message: "Internal server error.",
      });
    }
  }
);

export default apiRouter;
