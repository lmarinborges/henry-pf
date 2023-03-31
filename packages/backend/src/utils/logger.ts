import { transports, format, createLogger, addColors } from "winston";

addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});

const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "info";
};

const logger = createLogger({
  level: level(),
  transports: [new transports.Console()],
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
    )
  ),
});

export default logger;
