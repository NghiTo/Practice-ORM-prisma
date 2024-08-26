import { isCelebrateError } from "celebrate";
import errorLogger from "../logger/errorLogger.js";
import { logError, logWarning } from "../schema/logSchema.js";

class AppError extends Error {
  constructor({ message, statusCode, errorCode, details }) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
/**
 *
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {*} next
 * @returns
 */
const globalErrorHandler = (err, req, res, next) => {
  if (!req.user) {
    req.user = { username: "Unknown user" };
  }

  if (isCelebrateError(err)) {
    const errorDetails = [];
    err.details.forEach((value, key) => {
      value.details.forEach((detail) => {
        errorDetails.push({
          field: detail.context.key,
          message: detail.message,
        });
      });
    });

    logWarning(req.user.username, errorDetails[0].message);
    return res.status(400).json({
      status: "fail",
      errorCode: "VALIDATION_FAILED",
      message: err.message,
      details: errorDetails,
    });
  }

  errorLogger.error(err.stack);
  if (!req.url.includes("logs")) {
    logError(req.user.username, err.message);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode,
    message: err.message,
    details: err.details || null,
  });
};

export { AppError, globalErrorHandler };
