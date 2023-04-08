import express, { Router } from "express";
import session from "express-session";
import passport from "passport";

import { sessionConfig } from "./config";
import {
  clientErrorHandler,
  notFoundHandler,
  serverErrorHandler,
} from "./middleware/errorHandling";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";
import reviewsRouter from "./modules/reviews";
import facebookRouter from "./modules/users/facebook.routes";
import localRouter from "./modules/users/local.routes";
import usersRouter from "./modules/users/users.router";

const apiRouter = Router()
  // Middleware
  .use(express.json())
  .use(session(sessionConfig()))
  .use(passport.initialize())
  .use(passport.session())

  // Routes
  .use(productsRouter)
  .use(brandsRouter)
  .use(categoriesRouter)
  .use(usersRouter)
  .use(reviewsRouter)
  .use(facebookRouter)
  .use(localRouter)

  // Error handling
  .use(notFoundHandler)
  .use(clientErrorHandler)
  .use(serverErrorHandler);

export default apiRouter;
