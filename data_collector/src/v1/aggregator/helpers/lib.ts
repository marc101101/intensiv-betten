import { default as Pino } from "pino";

const loggerConfig = {
    level: process.env.LOG_LEVEL || "info",
    prettyPrint: true,
};

export const logger = Pino(loggerConfig, process.stderr);
logger.info("LOGLEVEL: " + loggerConfig.level);
