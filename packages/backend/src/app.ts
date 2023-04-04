import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ZodError } from "zod";
import morgan from "./middleware/morgan";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";
import logger from "./utils/logger";
import fileUpload from "express-fileupload";
import * as cors from 'cors';

const app = express();

// Middleware
app.use(cors.default())
app.use(morgan());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


// Routes
app.use(productsRouter);
app.use(brandsRouter);
app.use(categoriesRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: "Requested resource does not exist.",
    });
});

// Error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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
});

export default app;
