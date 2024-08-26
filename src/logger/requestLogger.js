import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [new transports.File({ filename: "logs/info.log", level: "info" })],
});

const requestLogger = (req, res, next) => {
  const { method, url, body } = req;
  const startTime = new Date();

  logger.info(
    `Incoming Request: ${method} ${url} - Body: ${JSON.stringify(body)}`
  );

  const oldSend = res.send;
  res.send = function (data) {
    const responseTime = new Date() - startTime;
    logger.info(
      `Outgoing Response: ${method} ${url} - Status: ${res.statusCode} - Response Time: ${responseTime}ms - Body: ${data}`
    );

    res.send = oldSend;
    return res.send(data);
  };

  next();
};

export default requestLogger;
