import { SessionOptions } from "express-session";
import parseDuration from "parse-duration";

export const expressPort = () => {
  const value = parseInt(process.env.EXPRESS_PORT || "8080");
  if (isNaN(value)) throw new Error("EXPRESS_PORT is not a valid number");
  return value;
};

const sessionSecret = () => {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return value;
};

const sessionMaxAge = () => {
  const value = parseDuration(process.env.SESSION_MAXAGE || "31d");
  if (value === null) throw new Error("SESSION_MAXAGE is invalid");
  return value;
};

export const sessionConfig: SessionOptions = {
  secret: sessionSecret(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: sessionMaxAge(),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
};
