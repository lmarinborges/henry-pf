import { SessionOptions } from "express-session";
import parseDuration from "parse-duration";
import { StrategyOption as FacebookStrategyOptions } from "passport-facebook";

export const expressPort = () => {
  const value = parseInt(process.env.EXPRESS_PORT || "8080");
  if (isNaN(value)) throw new Error("EXPRESS_PORT is not a valid number");
  return value;
};

export const sessionConfig = (): SessionOptions => {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) throw new Error("SESSION_SECRET is not set");

  const sessionMaxAge = parseDuration(process.env.SESSION_MAXAGE || "31d");
  if (sessionMaxAge === null) throw new Error("SESSION_MAXAGE is invalid");

  return {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: sessionMaxAge,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
  };
};

export const facebookConfig = (): FacebookStrategyOptions => {
  const appOrigin = process.env.APP_ORIGIN || "http://localhost:8080";

  const facebookId = process.env.FACEBOOK_ID;
  if (!facebookId) throw new Error("FACEBOOK_ID is unset");

  const facebookSecret = process.env.FACEBOOK_SECRET;
  if (!facebookSecret) throw new Error("FACEBOOK_SECRET is unset");

  return {
    callbackURL: new URL("/api/auth/facebook/callback", appOrigin).toString(),
    clientID: facebookId,
    clientSecret: facebookSecret,
  };
};
