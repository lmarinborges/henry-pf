import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import morgan from "./middleware/morgan";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";
import logger from "./utils/logger";

const app = express();

// Middleware
app.use(morgan());
app.use(express.json());

// Routes
app.use(productsRouter);
app.use(brandsRouter);
app.use(categoriesRouter);

// 404 Handler
app.use((req, res) => {
  res.send(404).json({
    status: 404,
    message: "Requested resource does not exist.",
  });
});

// Error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  if (err instanceof Error) {
    logger.error(err.message);
    logger.debug(err.stack);
  } else {
    logger.error(err);
  }
  res.status(500).send({
    status: 500,
    message: "Internal server error.",
  });
});

export default app;
