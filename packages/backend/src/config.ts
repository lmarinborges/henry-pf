import parseDuration from "parse-duration";

export const expressPort = () => {
  const value = parseInt(process.env.EXPRESS_PORT || "8080");
  if (isNaN(value)) throw new Error("EXPRESS_PORT is not a valid number");
  return value;
};

export const sessionSecret = () => {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return value;
};

export const sessionMaxAge = () => {
  const value = parseDuration(process.env.SESSION_MAXAGE || "31d");
  if (value === null) throw new Error("SESSION_MAXAGE is invalid");
  return value;
};
