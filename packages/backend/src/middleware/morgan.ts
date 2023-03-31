import morganLib from "morgan";
import logger from "../utils/logger";

const morgan = () =>
  morganLib("dev", {
    stream: { write: (message) => logger.http(message) },
    skip: () => (process.env.NODE_ENV || "development") !== "development",
  });

export default morgan;
